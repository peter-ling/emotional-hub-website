/* A DOM component that displays text and allows the user to edit it, turning into an input.
   The current text value is exposed through .value, and it can be set directly with .setValue(). */
export default class EditableText {
  /* id is the name and id for the input element, needed to associate a label with it. */
  constructor(id) {
    this.id = id;
    this.value = "";
    this._onChange = null; // private
    this._elem = null; // private 
    this._onFormSubmit = this._onFormSubmit.bind(this);
    this._onClickEdit = this._onClickEdit.bind(this);
  }

  /* Add the component (in display state) to the DOM tree under parent. When the value changes, onChange is called
     with a reference to this object as argument. */
     // Add the onChange function to the class
  addToDOM(parent, onChange) {
    this._elem = this._createDisplay()
    parent.append(this._elem)
    this._onChange = onChange;

  }

  /* Set the value of the component and switch to display state if necessary. Does not call onChange. */
  setValue(value) {
    this.value = value;
    let displayText = this._createDisplay();
    this._elem.replaceWith(displayText)
    this._elem = displayText; 
  }

  /* Create and return a DOM element representing this component in display state. */
  _createDisplay() {
    let container = document.createElement("div");
    container.classList.add("editableText");

    let text = document.createElement("span");
    text.textContent = this.value;
    container.append(text);

    let button = this._createImageButton("edit");
    button.type = "button";
    container.append(button);
    button.addEventListener('click', this._onClickEdit)

    return container;
  }

  _onClickEdit = (event) => {
    event.preventDefault();

    let inputForm = this._createInput();
    this._elem.replaceWith(inputForm)
    this._elem = inputForm
    this._elem.focus()

  }

  /* Create and return a DOM element representing this component in input state. */
  _createInput() {
    let form = document.createElement("form");
    form.classList.add("editableText");

    let input = document.createElement("input");
    input.type = "text";
    input.name = this.id;
    input.id = this.id;
    input.value = this.value;
    form.append(input);

    let button = this._createImageButton("save");
    button.type = "submit";
    form.append(button);
    form.addEventListener('submit', this._onFormSubmit); 

    return form;
  }


  // switch back to display state, call onChange callback, 
  _onFormSubmit = (event) => {
    event.preventDefault(); 

    this.value = document.getElementById(this.id).value;
    let displayText = this._createDisplay()
    this._elem.replaceWith(displayText);
    this._elem = displayText
    this._onChange(this); 
  }

  /* Helper to create a button containing an image. name is the name of the image, without directory or extension. */
  _createImageButton(name) {
    let button = document.createElement("button");
    let img = document.createElement("img");
    img.src = `images/${name}.svg`;
    img.alt = name;
    button.append(img);
    return button;
  }
}
