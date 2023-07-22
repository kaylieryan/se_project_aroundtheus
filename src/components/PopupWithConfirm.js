import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._confirmButton = this._popupElement.querySelector(".modal__button");

    this._submitForm = this._submitForm.bind(this);
  }

  setSubmitAction(action) {
    this._handleFormSubmit = action;
  }

  setLoading(isLoading, submitSave) {
    if (isLoading) {
      this._confirmButton.textContent = "Deleting...";
    } else {
      this._confirmButton.textContent = submitSave;
    }
  }

  _submitForm() {
    this._handleFormSubmit();
  }

  close() {
    this._popupForm.removeEventListener("submit", this._submitForm);
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", this._submitForm);
  }
}
