import { handleModalOpen } from "../utils/utils.js";
import {
  
}
from "../pages/index.js"

export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _setEventListeners(cardElement) {
    const likeButton = cardElement.querySelector(".card__like-button");
    const deleteButton = cardElement.querySelector(".card__delete-button");

    likeButton.addEventListener("click", () => {
      this._handleLikeClick();
    });

    deleteButton.addEventListener("click", () => {
      this._handleDeleteClick();
    });

    this._cardImage.addEventListener("click", (evt) => this._handlePreviewClick(evt));
  }


  _handleLikeClick() {
    this._likeButton.querySelector(".card__like-button")
    .classList.toggle("card__like-button_active");

  }

  _handleDeleteClick() {
    const card = this._deleteButton.closest(".card");
    card.remove();
  }
  

  _handlePreviewClick() {
    this._previewImage.src = this._cardImage.src;
    this._previewImage.alt = this._cardTitle.textContent;
    this._previewTitle.textContent = this._cardTitle.textContent;
    this._handleModalOpen(this._previewImageModal);
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._cardSelector).content.querySelector(".card");
    return cardTemplate;
  }

  getView() {
    this._getTemplate();
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardTitle = this._cardElement.querySelector(".card__title");
    
  }

}
