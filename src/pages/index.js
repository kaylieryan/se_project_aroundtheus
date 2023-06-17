import Card from "../components/Card";
import FormValidator from "../components/FormValidator";
import { handleModalOpen, handleModalClose } from "../utils/utils.js";
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
const closeButtons = document.querySelectorAll(".modal-close-button");

//Validation

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_inactive",
  inputErrorClass: "modal__error-message",
  errorClass: "modal__error_visible",
};

const editProfileFormValidator = new FormValidator(config, editProfileModal);
editProfileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(config, addCardModal);
addCardFormValidator.enableValidation();

//Functions

function addCard(event) {
  event.preventDefault();

  const cardData = {
    name: cardTitleInput.value,
    link: cardUrlInput.value,
  };

  const newCard = createCard(cardData);

  cardListEl.prepend(newCard);
  addCardFormElement.reset();
  handleModalClose(addCardModal);
}

function handleProfileFormSubmit(e) {
  e.preventDefault();

  profileTitle.textContent = modalTitleInput.value;
  profileDescription.textContent = modalDescriptionInput.value;

  handleModalClose(editProfileModal);
}

function fillProfileForm() {
  modalTitleInput.value = profileTitle.textContent;
  modalDescriptionInput.value = profileDescription.textContent;
}

function closeImageModal(event, previewImageModal) {
  const previewImage = event.target.closest(".modal__preview-image");
  const previewTitle = event.target.closest(".modal__preview-title");
  previewImage.src = event.target.src;
  previewImage.alt = event.target.alt;
  previewTitle.textContent = event.target.alt;
}

function createCard(cardData) {
  const card = new Card(cardData, "#card-template");
  const cardElement = card.getView(); 
  return cardElement;
}

//Render initial cards

initialCards.forEach((obj) => {
  cardListEl.append(createCard(obj));
});

//Event Listeners

closeButtons.forEach((closeButton) => {
  closeButton.addEventListener("click", () => {
    const modal = closeButton.closest(".modal");
    handleModalClose(modal);
  });
});

profileEditButton.addEventListener("click", () => {
  handleModalOpen(editProfileModal);
});

editProfileModal.addEventListener("submit", handleProfileFormSubmit);

addNewCardButton.addEventListener("click", () => {
  addCardFormValidator.disableButton();
  handleModalOpen(addCardModal);
});

addCardFormElement.addEventListener("submit", addCard);
previewImageModal.addEventListener("click", closeImageModal);
editProfileModal.addEventListener("submit", handleProfileFormSubmit);
profileEditButton.addEventListener("click", fillProfileForm);


