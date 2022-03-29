import EditableText from "./EditableText.js"
import PositivityPiece from "./PositivityPiece.js";
import User from "./User.js"; 
import apiRequest from "./api.js";

const QUESTION_BANK = [
    "What makes you happy?", 
    "What change do you want to see in your life?", 
    "Who is someone important to you and why?", 
    "What's something that made you smile today?", 
    "What did someone do for you today that you appreciated?", 
    "What are you most thankful for?", 
    "What are you looking forward to this week?", 
    "How did you show someone that you care about them today?", 
    "What made you laugh today?", 
    "Who inspires you?"
]

class App {
    constructor() {
        this._user = null; 
        this._et = null; 
        this._question_text = null; 
        this._question = null; 
        this._response_form = null; 

        this._onClickSmiley = this._onClickSmiley.bind(this);
        this._onChangeFeeling = this._onChangeFeeling.bind(this);
        this._onSubmitResponse = this._onSubmitResponse.bind(this); 
        this._onSubmitLogin = this._onSubmitLogin.bind(this); 
        this._getAndDisplayQuestion = this._getAndDisplayQuestion.bind(this); 
        this._createFinalButtons = this._createFinalButtons.bind(this); 
        this._onClickView = this._onClickView.bind(this);
        this._onClickClear = this._onClickClear.bind(this);  
        this._ensureNoDoubleButtons = this._ensureNoDoubleButtons.bind(this);
        
    }

    setup() {
        this._et = new EditableText(" "); 

        this._et.addToDOM(document.querySelector("#c3"), this._onChangeFeeling); 
        this._et.setValue(this._et.id); // PUT MOOD FROM API HERE 
        let span = document.querySelector("span");
        let login_form = document.querySelector("#login-form"); 
        login_form.addEventListener("submit", this._onSubmitLogin);
        let smiley_button = document.querySelector("#smiley_button"); 
        smiley_button.addEventListener("click", this._onClickSmiley); 

    }


    _onClickSmiley = (event) => {
        event.preventDefault(); 
        
        if (document.querySelector("#c1").childElementCount == 3){
            document.querySelector(".PositivityPiece").remove()
        } 
        let positive = new PositivityPiece("id"); 
        positive.addToDOM(document.querySelector("#c1"));
    }

    _onChangeFeeling = async(event) => {
        let res_form = document.querySelector("#response-form")
        if (!res_form) {
            alert("Must login first before changing mood!");
            this._et.setValue("");
            return; 
        }

        if (this._et.value === " " || this._et.value === ""){
            alert("Certainly you must be feeling some sort of emotion..."); 
            this._et.setValue(""); 
            return;
        }

        alert(`Gotcha. You are feeling ${this._et.value.toLowerCase()}.`);
        this._user.updateMood(this._et.value); 

    }

    _onSubmitResponse = async(event) => {
        event.preventDefault();
        let response_text = document.querySelector("#response").value; 
        if (response_text === ""){
            alert("You can think of more than just that...")
            return;
        }
        this._user.addResponse({[this._question_text]: response_text});
        alert("Thank you for your response. Hopefully you can reflect on your thoughts!"); 
        this._response_form.reset();
        this._getAndDisplayQuestion(); 
    }

    _ensureNoDoubleButtons(){
        let container = document.querySelector("#finalButtonsContainer"); 
        if (container){
            container.remove(); 
        }
    }

    async _onClickClear() {
        this._user.clearResponses(this._user.id); 
        alert("Your account now has 0 responses. You have a clean slate!")
    }

    async _onClickView(){

        let responses = await this._user.getResponses(this._user.id);
        if (responses.length === 0){
            alert("You haven't made any responses yet!");
            return; 
        }

        let response_to_show = responses[Math.floor(Math.random() * responses.length)];
        let question; 
        let answer; 

        for (let i in response_to_show){
            question = i; 
            answer = response_to_show[i]; 
        }

        alert(`Question: ${question}\nAnswer: ${answer}`);
    }

    _createFinalButtons(){
        let containter = document.createElement("div");
        
        let delete_button = document.createElement("button");
        let view_button = document.createElement("button"); 

        containter.setAttribute("id", "finalButtonsContainer");
        delete_button.setAttribute("id", "delete_button");
        view_button.setAttribute("id", "view_button");

        view_button.addEventListener("click", this._onClickView); 
        delete_button.addEventListener("click", this._onClickClear);

        delete_button.type = "button"; 
        delete_button.innerText = "Delete All Past Responses"; 

        view_button.type = "button"; 
        view_button.innerText = "See a Past Response";
        let c2 = document.querySelector("#c2");
        c2.appendChild(containter); 
        containter.appendChild(view_button); 
        containter.appendChild(delete_button); 
    }

    _getAndDisplayQuestion(){

        this._question.setAttribute("id", "question");
        this._question_text = QUESTION_BANK[Math.floor(Math.random() * QUESTION_BANK.length)];
        this._question.innerText = this._question_text
    
    }

    _onSubmitLogin = async(event) => {
        event.preventDefault(); 
        let c2 = document.querySelector("#c2");
        let login_input = document.querySelector("#login-input"); 
    
        if (c2.childElementCount != 2){
            let question_to_delete = document.querySelector("#question"); 
            let form_to_delete = document.querySelector("#response-form"); 
            let button_to_delete = document.querySelector("#response-button"); 
            question_to_delete.remove();
            form_to_delete.remove(); 
            button_to_delete.remove();
        } 
        this._user = await User.loadOrCreate(login_input.value); 
        this._et.setValue(this._user.mood);
        this._ensureNoDoubleButtons();

        this._question = document.createElement("h3"); 
        this._getAndDisplayQuestion(); 

        this._response_form =  document.createElement("form");
        let response_area = document.createElement("textarea")
        let response_button = document.createElement("button");
    
        this._response_form.addEventListener("submit", this._onSubmitResponse);  
    
        this._response_form.setAttribute("id", "response-form"); 
        response_area.setAttribute("id", "response")
        response_area.setAttribute("cols", "40"); 
        response_area.setAttribute("rows", "5");
        response_area.setAttribute("placeholder", "Type response here!")
        
        response_button.setAttribute("type", "submit");
        response_button.setAttribute("id", "response-button")
        response_button.setAttribute("form", "response-form");
        response_button.setAttribute("value", "submit");
        response_button.innerText = "Submit";
    
        c2.appendChild(this._question)
        c2.appendChild(this._response_form); 
        c2.appendChild(response_button)
        let select_response_form = document.querySelector("#response-form")
        select_response_form.appendChild(response_area)
        this._createFinalButtons();
    }

}


let app = new App(); 
app.setup();