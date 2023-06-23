export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = popupSelector;
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    this.setEventListeners();
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    this._popupElement.removeEventListener("click", this._closeViaClick);
    document.removeEventListener("keydown", this._closeByEscape);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  _closeViaClick = (evt) => {
    if (
      evt.target.classList.contains("modal__close") ||
      evt.target.classList.contains("modal")
    ) {
      this.close();
    }
  };

  setEventListeners() {
    document.addEventListener("keydown", this._handleEscClose);
    this._popupElement.addEventListener("click", this._closeViaClick);
  }
}
