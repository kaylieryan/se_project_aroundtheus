import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._previewImageElement = document.querySelector(".modal__preview-image");
    this._previewImageCaption = document.querySelector(".modal__preview-title");
  }

  open(cardData) {
    this._previewImageElement.alt = 'Image of ${cardData.name}';
    this._previewImageCaption.textContent = cardData.name;
    this._previewImageElement.src = cardData.link;
    super.open();
  }
}
