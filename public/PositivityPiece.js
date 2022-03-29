const IMAGE_BANK = [
    "images/positive1.jpg",
    "images/positive2.jpg",
    "images/positive3.png",
    "images/positive4.png",
    "images/positive5.jpg",
    "images/positive6.jpg",
    "images/positive7.jpg",
    "images/positive8.jpg",
    "images/positive9.jpg",
    "images/positive10.jpg",
];

const PHRASE_BANK = [
    "You are loved!", 
    "You are cared for!", 
    "Happiness is found in many places :)",
    "Do what makes you happy!", 
    "Laugh today!", 
    "You are so lucky to be you!", 
    "This world is better because you're in it!", 
    "You are talented!", 
    "People are thankful that they know you!", 
    "You are special!"
];


export default class PositivityPiece {

    constructor(id){
        this.id = id; 
        this.elem = null; 
    }
    addToDOM(parent) {
        this._elem = this._createDisplay()
        parent.append(this._elem)
    }


    _createDisplay() {
        let container = document.createElement("div"); 
        let image = document.createElement("img");
        let phrase = document.createElement("p");
        
        let image_src = IMAGE_BANK[Math.floor(Math.random() * IMAGE_BANK.length)]; 

        image.setAttribute("src", image_src); 
        phrase.innerText = PHRASE_BANK[Math.floor(Math.random() * PHRASE_BANK.length)]; 
        container.classList.add("PositivityPiece");


        container.appendChild(image); 
        container.appendChild(phrase); 
        return container; 
    }

  
    





}