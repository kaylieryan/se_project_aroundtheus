export default class Card {
  constructor(
    {
      cardData,
      cardSelector,
      handlePreviewImage,
      //userId,
      handleLikeButton,
      handleDeleteButton,
    },
    myId
  ) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._likes = cardData.likes;
    this._ownerId = cardData.owner._id;
    this._myId = myId;
    this._id = cardData._id;
    //this._userId = userId; // not using this value as of now
    this._cardSelector = cardSelector;
    this._handlePreviewImage = handlePreviewImage;
    this._handleDeleteButton = handleDeleteButton;
    this._handleLikeButton = handleLikeButton;
  }

  _handleDeleteButtonClick() {
    this._handleDeleteButton(this._id);
  }

  getId() {
    return this._id;
  }

  isLiked() {
    return this._likes.some((like) => like._id === this._myId);
  }

  setLikes(likes) {
    this._likes = likes;
    this._renderLikes();
  }

  _renderLikes() {
    this._cardLikesCountElement.textContent = this._likes.length;

    if (this.isLiked()) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeButton(this._id, this.isLiked());
    });

    if (this._myId === this._ownerId) {
      this._deleteButton.addEventListener("click", () => {
        this._handleDeleteButtonClick();
      });
    }

    this._cardImage.addEventListener("click", () => {
      this._handlePreviewImage({ name: this._name, link: this._link });
    });
  }
  // this._cardElement
  //   .querySelector(".card__like-button")
  //   .addEventListener("click", () => {
  //     this._handleLikeButton(this._id, this.isLiked());
  //   });
  // if (this._myId === this._ownerId) {
  //   this._cardElement
  //     .querySelector(".card__delete-button")
  //     .addEventListener("click", () => {
  //       this._handleDeleteButtonClick();
  //     });
  // }
  // this._cardElement
  //   .querySelector(".card__image")
  //   .addEventListener("click", () => {
  //     this._handlePreviewImage({ name: this._name, link: this._link });
  //   });

  deleteCard() {
    this._handleDeleteButton(this._id);
  }

  _toggleLikeButton() {
    this._handleDeleteButton(this._id);
    // this._cardElement
    //   .querySelector(".card__like-button")
    //   .classList.toggle("card__like-button_active");
  }

  _hideDeleteButton() {
    if (this._ownerId !== this._myId) {
      this._deleteButton.remove();
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
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._cardLikesCountElement =
      this._cardElement.querySelector(".card__likes-count");
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._hideDeleteButton();
    this._renderLikes();
    this._setEventListeners();

    return this._cardElement;
  }

  remove() {
    this._cardElement.remove();
    this._cardElement = null;
  }
}
