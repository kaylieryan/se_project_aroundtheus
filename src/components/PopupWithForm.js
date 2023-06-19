import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector(".modal__form");
  }

  close() {
    this._popupForm.reset();
    this._popupElement.removeEventListener("submit", this._handleFormSubmit);
    super.close();
  }

  _getInputValues() {
    const inputsObject = {};
    this._inputList = document.querySelectorAll(".modal__input");
    this._inputList.forEach((input) => {
      if (input.type !== "") {
        inputsObject[input.name] = input.value;
      }
    });
    return inputsObject;
  }

  _submitForm = () => {
    const inputValues = this._getInputValues();
    this._handleFormSubmit(inputValues());
  };

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener("submit", this._submitForm);
  }
}