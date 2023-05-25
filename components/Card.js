

export default class Card {
  constructor(data, cardSelector, handleModalOpen) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleModalOpen = handleModalOpen;
  }

  _setEventListeners(cardElement) {
    this._likeButton.
    querySelector(".card__like-button")
    .addEventListener("click", () => this._handleLikeClick());
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
    this._cardElement = this._getTemplate();
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(".card__delete-button");
    this._previewImageModal = document.querySelector("#image-modal");
    this._previewTitle = this._previewImageModal.querySelector("#card-preview-title");
    this._previewImage = this._previewImageModal.querySelector("#card-preview-image");

    this._cardTitle.textContent = this._name;
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;

    this._setEventListeners(this._cardElement);

    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick();
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick();
    });

    this._cardImage.addEventListener("click", () => {
      this._handlePreviewClick();
    });

    return this._cardElement;
    
  }

}
