import Popup from "./PopupWithForm.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
  }

  setSubmitAction(action) {
    this._handleFormSubmit = action;
  }

  setLoading(isLoading, submitSave) {
    if (isLoading) {
      this._popupElement.querySelector(".modal__button").textContent =
        "Deleting...";
    } else {
      this._popupElement.querySelector(".modal__button").textContent =
        submitSave;
    }
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
