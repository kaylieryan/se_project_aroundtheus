import { handleImageModal } from "../pages/index.js";
//import { handleModalOpen } from "..utils/utils.js";

export default class Card {
  _cardElement;
  _cardImage;
  _cardTitle;
  _likeButton;
  _deleteButton;
  _name;
  _link;
  _cardSelector;

  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return this._cardElement;
  }

  _fillCard() {
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
  }

  _toggleLikeButton(event) {
    event.target.classList.toggle("card__like-button_active");
  }

  _deleteCard() {
    this._cardElement.remove();
  }

  _previewImageModal(event) {
    const cardImage = previewImageModal.querySelector(".card__image");
    const cardTitle = previewImageModal.querySelector(".card__title");
    cardImage.src = event.target.src;
    cardImage.alt = event.target.alt;
    cardTitle.textContent = event.target.alt;
    handleModalOpen(previewImageModal);
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => this._toggleLikeButton());
    this._deleteButton.addEventListener("click", () => this._deleteCard());
    this._cardImage.addEventListener("click", (event) =>
      handleImageModal(event, this._previewImageModal)
    );
  }

  getView() {
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._setEventListeners();
    this._fillCard();

    return this._cardElement;
  }
}
