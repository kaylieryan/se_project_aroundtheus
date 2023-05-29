import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import * as utils from "../utils/utils.js";
import initialCards from "../utils/constants.js";

//Elements

const profileEditButton = document.querySelector("#profile-edit-button");
const editProfileModal = document.querySelector("#profile-edit-modal");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileEditForm = editProfileModal.querySelector(".modal__form");
const addCardModal = document.querySelector("#add-card-modal");
const addCardFormElement = addCardModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const modalTitleInput = document.querySelector("#modal-form-title");
const modalDescriptionInput = document.querySelector("#modal-form-description");
const addNewCardButton = document.querySelector(".profile__add-button");
const cardTitleInput = addCardFormElement.querySelector(
  ".modal__input_type_title"
);

const cardUrlInput = addCardFormElement.querySelector(".modal__input_type_url");
const previewImageModal = document.querySelector("#image-modal");

const previewTitle = previewImageModal.querySelector("#card-preview-title");
const previewImage = previewImageModal.querySelector("#card-preview-image");
const cardImage = document.querySelector(".card__image");
const cardTitle = document.querySelector(".card__title");
const closeButtons = document.querySelectorAll(".modal__close");

//Functions

function addCard (event) {
  event.preventDefault();

  const cardData = {
    name: cardTitleInput.value,
    link: cardUrlInput.value,
  };

  const newCard = new Card(cardData, "#card-template").getView();

  cardListEl.prepend(newCard);
  addCardModal.querySelector(".modal__form").reset();
  utils.closeModal(addCardModal);
  addCardFormValidator.disableButtonState();

}

function handleProfileFormSubmit(e) {
  e.preventDefault();

  profileTitle.textContent = modalTitleInput.value;
  profileDescription.textContent = modalDescriptionInput.value;
 
  utils.closeModal(editProfileModal);
}

function fillProfileForm() {
  modalTitleInput.value = profileTitle.textContent;
  modalDescriptionInput.value = profileDescription.textContent;
}

export function handleImageModal(event, previewImageModal) {
  const cardImage = previewImageModal.querySelector(".card__image");
  const cardTitle = previewImageModal.querySelector(".card__title");
  cardImage.src = event.target.src;
  cardImage.alt = event.target.alt;
  cardTitle.textContent = event.target.alt;
}

function handleModalOpen() {
  utils.openModal(modal);
}

function handleModalClose() {
  utils.closeModal(modal);
}

function closeImageModal() {
  utils.closeModal(previewImageModal);
}

function createCard (cardData) {
  const card = new Card(cardData, "#card-template");
  const cardElement = card.getView();
  return cardElement;
}

//Render initial cards

initialCards.forEach((obj) => {
  cardListEl.append(createCard(obj));
});

//Event Listeners

profileEditButton.addEventListener("click", handleModalOpen);
editProfileModal.addEventListener("click", handleProfileFormSubmit);

addNewCardButton.addEventListener("click", handleModalOpen);
addCardFormElement.addEventListener("submit", addCard);

previewImageModal.addEventListener("click", closeImageModal);

editProfileModal.addEventListener("submit", handleProfileFormSubmit);
addCardModal.addEventListener("submit", addCard);

//Validation

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: ".modal__button_inactive",
  inputErrorClass: ".modal__error-message",
  errorClass: ".modal__error_visible",
};

const editProfileFormValidator = new FormValidator(config, editProfileModal);
editProfileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(config, addCardModal);
addCardFormValidator.enableValidation();

