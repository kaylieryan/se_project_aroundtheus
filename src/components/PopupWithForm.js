import Popup from "../components/Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._inputList = this._popupForm.querySelectorAll(".modal__input");
    this._submitButton = this._popupForm.querySelector(".modal__button");
  }

  open() {
    this._popupForm.reset();
    super.open();
  }

  close() {
    this._popupForm.reset();
    super.close();
    this._popupElement.removeEventListener("submit", this._submitForm);
  }

  showLoading() {
    this._submitButton.textContent = this._buttonLoadingText;
  }

  hideLoading() {
    this._submitButton.textContent = this._buttonText;
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