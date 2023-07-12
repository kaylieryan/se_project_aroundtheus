export default class Card {
  constructor(
    { cardData, cardSelector, handlePreviewImage, userId },
    handleDeleteButton,
  ) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._likes = cardData.likes;
    this._owner = cardData.owner;
    this._id = cardData._id;
    this._userId = userId;
    this._cardSelector = cardSelector;
    this._handlePreviewImage = handlePreviewImage;
    this._handleDeleteButton = handleDeleteButton;
  }

  //NEW

  getId() {
    return this._id;
  }

  isLiked() {
    return this._likes.some((like) => like._id === this._userId);
  }

  setLikes(likes) {
    this._likes = likes;
    this.renderLikes();
  }

  _renderLikes() {
    this._likesCount = this._cardElement.querySelector(".card__likes-count");
    this._likesCount.textContent = this._likes.length;
    if (this.isLiked()) {
      this._cardElement
        .querySelector(".card__like-button")
        .classList.add("card__like-button_active");
    } else {
      this._cardElement
        .querySelector(".card__like-button")
        .classList.remove("card__like-button_active");
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

  //handleLikeButton KEEP
  _toggleLikeButton() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  //handleDeleteButton
  _deleteCard() {
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
    this._deleteCard();
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

