import PopupWithForm from "./PopupWithForm";

export default class PopupWithFormConfirmDelete extends PopupWithForm {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
  }

  setSubmitAction(action) {
    this._handleFormSubmit = action;
  }

  setLoading(isLoading) {
    if (isLoading) {
      this._popupForm.querySelector(".modal__button").textContent = "Deleting...";
    } else {
      this._popupForm.querySelector(".modal__button").textContent = "Submit Save";
    }
  }

  close() {
    super.close();
    this._popupForm.removeEventListener("submit", this._handleFormSubmit);
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", this._handleFormSubmit);
  }
}

