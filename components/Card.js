import { handleImageModal } from "../pages/index.js";

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

  _deleteCard(event) {
    event.target.closest(".card").remove();
  }

  _setEventListeners() {
    this._likeButton.addEventListener(
      "click",
      this._toggleLikeButton.bind(this)
    );
    this._deleteButton.addEventListener("click", this._deleteCard.bind(this));
    this._cardImage.addEventListener("click", handleImageModal);
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
  returnCardElement() {
    return this._getView();
  }
}
