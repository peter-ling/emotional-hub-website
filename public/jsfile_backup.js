// import EditableText from "./EditableText.js"
// import PositivityPiece from "./PositivityPiece.js";
// import User from "./User.js"; 
// import apiRequest from "./api.js";



// const QUESTION_BANK = [
//     "What makes you happy?", 
//     "What change do you want to see in your life?", 
//     "Who is someone important to you and why?"
// ]

// const form = (event) => {
//     event.preventDefault(); 
//     console.log("hello form")
// }

// const _onClickSmiley = (event) => {
//     event.preventDefault(); 
//     console.log("SMILEY")
    
//     if (document.querySelector("#c1").childElementCount == 3){
//         console.log(document.querySelector(".PositivityPiece"))
//         document.querySelector(".PositivityPiece").remove()
//         // document.querySelector(".PositivityPiece").remove()
//     } // MAYBE LOOK AT GETTING ONLY WIDE IMAGES 

//     let positive = new PositivityPiece("id"); 
//     positive.addToDOM(document.querySelector("#c1"));

//     // CHECK IF THERE ARE TWO THINGS ALREADY 
//     console.log(document.querySelector("#c1").childElementCount)

//     // need to create instance of photo/quote class 
// }

// const _onChangeFeeling = async(event) => {
//     // console.log(et.value)
//     // check if logged in 
//     let login_input = document.querySelector("#login-input")
//     // console.log(login_input.value)
//     let res_form = document.querySelector("#response-form")
//     if (!res_form){
//         alert("Must login first before changing mood!");
//         et.setValue("");
//         return; 
//     }

//     if (et.value === " " || et.value === ""){
//         alert("Certainly you must be feeling some sort of emotion..."); 
//         et.setValue(""); 
//         return;
//     }

//     console.log(et.value);



//     alert(`Gotcha. You are feeling ${et.value.toLowerCase()}.`)

//     // let cur_user = 
    

//     // api patch 
// }

// const _onSubmitResponse = async(event) => {
//     event.preventDefault();
//     console.log("Response Submit")


//     // let some_users = await User.listUsers();
//     // console.log(some_users); 
//     // let new_user = await User.loadOrCreate('pling1'); 
//     // console.log(new_user); 
//     // console.log(new_user.mood);

// }
// const _onSubmitLogin = async(event) => {
//     event.preventDefault(); 
//     // console.log("LOGIN");
//     // login_form.addEventListener("submit", _onSubmitLogin);
//     // console.log(login_form)
//     let c2 = document.querySelector("#c2");
//     let login_input = document.querySelector("#login-input"); 

//     if (c2.childElementCount != 2){
//         let question_to_delete = document.querySelector("#question"); 
//         let form_to_delete = document.querySelector("#response-form"); 
//         let button_to_delete = document.querySelector("#response-button"); 
//         question_to_delete.remove();
//         form_to_delete.remove(); 
//         button_to_delete.remove();
//     } 
//     // THIS IS WHERE I WANT TO ADD THE ELEMENT 


//     //CHECK IF USER EXISTS
//     // IF NOT MAKE NEW USER
//     let cur_user = await User.loadOrCreate(login_input.value); 
//     console.log(cur_user); 
//     et.setValue(cur_user.mood);






//     let question = document.createElement("h3"); 
//     question.setAttribute("id", "question");
//     let random_question = QUESTION_BANK[Math.floor(Math.random() * QUESTION_BANK.length)];

//     question.innerText = random_question; 

//     let response_form = document.createElement("form"); 
//     let response_area = document.createElement("textarea")
//     let response_button = document.createElement("button");

//     response_form.addEventListener("submit", _onSubmitResponse);  

//     response_form.setAttribute("id", "response-form"); 
//     response_area.setAttribute("id", "response")
//     response_area.setAttribute("cols", "40"); 
//     response_area.setAttribute("rows", "5");
//     response_area.setAttribute("placeholder", "Type response here!")
    
//     response_button.setAttribute("type", "submit");
//     response_button.setAttribute("id", "response-button")
//     response_button.setAttribute("form", "response-form");
//     response_button.setAttribute("value", "submit");
//     response_button.innerText = "Submit";

//     c2.appendChild(question)
//     c2.appendChild(response_form); 
//     c2.appendChild(response_button)
//     let select_response_form = document.querySelector("#response-form")
//     console.log(select_response_form)
//     select_response_form.appendChild(response_area)
//     // console.log(document.querySelector("#login-input").textContent)
// }
// let et = new EditableText(" "); 

// et.addToDOM(document.querySelector("#c3"), _onChangeFeeling); 
// et.setValue(et.id); // PUT MOOD FROM API HERE 
// // et.querySelector("span").innerText = "TEXT HERE"
// let span = document.querySelector("span");
// // span.innerText = "NEW INNER TEXT"


// // let response_form = document.querySelector("#response-form"); 
// // response_form.addEventListener("submit", form); 

// let login_form = document.querySelector("#login-form"); 
// login_form.addEventListener("submit", _onSubmitLogin);

// let smiley_button = document.querySelector("#smiley_button"); 
// smiley_button.addEventListener("click", _onClickSmiley); 

// // document.querySelector()




// // FORMATTING USER OBJECT 

// /* 


// user: {
//     "login": "peter", 
//     "mood": "happy", 

//     "respones": [
//         {"What makes you happy?": "Food"}, 
//         {"What do you care about?": "People"}
//     ]
// }

// */

// // { "id": "peter", "mood": "happy", "respones": [] }
     
     

// //     "respones": [
// //         {"What makes you happy?": "Food"}, 
// //         {"What do you care about?": "People"}
// //     ]
// // }

// // let SampleUser = new User("some_id"); 