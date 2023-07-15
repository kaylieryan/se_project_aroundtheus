export default class Card {
  constructor(
    { cardData, cardSelector, handlePreviewImage, userId },
    handleDeleteButton,
    myId
  ) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._likes = cardData.likes;
    this._ownerId = cardData.ownerId;
    this._myId = myId;
    this._id = cardData._id;
    this._userId = userId;
    this._cardSelector = cardSelector;
    this._handlePreviewImage = handlePreviewImage;
    this._handleDeleteButton = handleDeleteButton;
    this._likes = cardData.likes;
  }

  getId() {
    return this._id;
  }

  isLiked() {
    return this._likes.some((like) => like._id === this._myId);
  }

  _fillCardTemplate() {
    const imageElement = this._cardElement.querySelector(".card__image");
    imageElement.src = this._link;
    imageElement.alt = this._name;
    this._cardElement.id = this._id;

    this._cardElement.querySelector(".card__title").textContent = this._name;
    this._cardLikesCountElement = this._cardElement.querySelector(".card__likes-count");

    if (this._ownerId !== this._myId) {
      this._cardElement.querySelector(".card__delete-button").remove();
    }
  }

  setLikes(amountOfLikes) {
    this._likes = amountOfLikes;
    this.renderLikes();
  }

  _renderLikes() {
    this._cardLikesCountElement =
      this._cardElement.querySelector(".card__likes-count");
    this._cardLikesCountElement.textContent =
      this._likes.length;

      const cardLikeButton = this._cardElement.querySelector(".card__like-button");
      if (this.isLiked()) {
        cardLikeButton.classList.add("card__like-button_active");
      }
      else {
        cardLikeButton.classList.remove("card__like-button_active");
      }
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._toggleLikeButton();
      });
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._deleteCard(this.getId());
      });
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handlePreviewImage({ name: this._name, link: this._link });
      });
  }

  _deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  //handleLikeButton KEEP
  _toggleLikeButton() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  //handleDeleteButton (_deleteCard)
  _deleteButton() {
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    if (this._userId !== this._owner) {
      this._deleteButton.classList.add("card__delete-button_hidden");
    }
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  getView() {
    this._cardElement = this._getTemplate();
    this._setEventListeners();
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardElement.querySelector(".card__title").textContent = this._name;
    this._renderLikes();

    return this._cardElement;
  }
}

//new
// _handlePreviewImage() {
//   previewImage.src = this._link;
//   previewImage.alt = 'Image of ${this._name}';
//   previewImageDescription.textContent = this._name;
//   openModal(modalImagePopup);
// }

// _setEventListeners() {
//   const likeButton = this._cardElement.querySelector(".card__like-button");
//   likeButton.addEventListener("click", () => {
//     this._toggleLikeButton();
//   });

//   const deleteButton = this._cardElement.querySelector(
//     ".card__delete-button"
//   );
//   deleteButton.addEventListener("click", () => {
//     this._deleteCard();
//   });

//   const cardImage = this._cardElement.querySelector(".card__image");
//   cardImage.addEventListener("click", () => {
//     this._handleCardClick({ name: this._name, link: this._link }); // destructuring the object
//   });
// }
