import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    // this._confirmButton = this._popupElement.querySelector("#confirm-button");
    //this._submitForm = this._submitForm.bind(this);
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
    this._popupForm.removeEventListener("submit", this._handleFormSubmit);
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", this._handleFormSubmit);
  }
}
