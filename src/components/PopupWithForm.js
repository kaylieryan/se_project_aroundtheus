import Popup from "../components/Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, buttonText, buttonLoadingText) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._inputList = this._popupForm.querySelectorAll(".modal__input");
    this._buttonText = buttonText;
    this._buttonLoadingText = buttonLoadingText;
    this._submitButton = this._popupForm.querySelector(".modal__button");
  }

  showLoading() {
    this._submitButton.textContent = this._buttonLoadingText;
  }

  hideLoading() {
    this._submitButton.textContent = this._buttonText;
  }

  close() {
    this._popupElement.removeEventListener("submit", this._submitForm);
    this._popupForm.reset();
    super.close();
  }

  _getInputValues() {
    const inputsObject = {};
    this._inputList.forEach((input) => {
      if (input.value !== "") {
        inputsObject[input.name] = input.value;
      }
    });
    return inputsObject;
  }

  _submitForm = () => {
    const inputValues = this._getInputValues();
    this._handleFormSubmit(inputValues);
  };

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener("submit", this._submitForm);
  }
}
