export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    this.setEventListeners();
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    this._popupElement.removeEventListener("click", this._closeModalWithClick);
    document.removeEventListener("keydown", this._closeModalWithEsc);
  }

  _closeModalWithEsc = (evt) => {
    // listens for esc button
    if (evt.key === "Escape") {
      this.close();
    }
  };

  _closeModalWithClick = (evt) => {
    if (
      evt.target.classList.contains("modal__close") ||
      evt.target.classList.contains("modal__close-button")
    ) {
      this.close();
    }
  };

  setEventListeners() {
    // sets event listeners
    document.addEventListener("keydown", this._closeModalWithEsc);
    this._popupElement.addEventListener("click", this._closeModalWithClick);
  }
}
