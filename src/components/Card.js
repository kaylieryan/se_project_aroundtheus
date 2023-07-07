export default class Card {
  constructor({ cardData, cardSelector, handlePreviewImage }) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._likes = cardData.likes;
    this._owner = cardData.owner;
    this._id = cardData._id;
    this._cardSelector = cardSelector;
    this._handlePreviewImage = handlePreviewImage;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  //handleLikeButton
  _toggleLikeButton() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  //handleDeleteButton
  _deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _setEventListeners() {
    const likeButton = this._cardElement.querySelector(".card__like-button");
    likeButton.addEventListener("click", () => {
      this._toggleLikeButton();
    });

    const deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    deleteButton.addEventListener("click", () => {
      this._deleteCard();
    });

    const cardImage = this._cardElement.querySelector(".card__image");
    cardImage.addEventListener("click", () => {
      this._handleCardClick({ name: this._name, link: this._link }); // destructuring the object
    });
  }

  getView() {
    this._cardElement = this._getTemplate();
    this._setEventListeners();

    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardElement.querySelector(".card__title").textContent = this._name;

    return this._cardElement;
  }
}
