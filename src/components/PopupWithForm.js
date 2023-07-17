import Popup from "../components/Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupElement = document.querySelector(popupSelector);
    
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._inputList = this._popupForm.querySelectorAll(".modal__input");
    // this._submitButton = this._popupForm.querySelector(".modal__button");
    this._submitForm = this._submitForm.bind(this);
  
  }

  _getInputValues() {
    const inputsObject = {};
    this._inputList.forEach((input) => {
      inputsObject[input.name] = input.value;
    });
    return inputsObject;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  _submitForm() {
    this._handleFormSubmit(this._getInputValues());
  }

  open() {
    this._popupForm.addEventListener("submit", this._submitForm);
    super.open();
  }

  close() {
    this._popupForm.removeEventListener("submit", this._submitForm);
    this._popupForm.reset();
    super.close();
  }

}
