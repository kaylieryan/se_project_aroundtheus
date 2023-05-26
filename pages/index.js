import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { handleModalClose, handleModalOpen, closeModalWithEsc } from "../utils/utils.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },

  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },

  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },

  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },

  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },

  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

//Elements

const profileEditButton = document.querySelector("#profile-edit-button");
const editProfileModal = document.querySelector("#profile-edit-modal");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileEditForm = editProfileModal.querySelector(".modal__form");
const addCardModal = document.querySelector("#add-card-modal");
const addCardFormElement = addCardModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template").content.firstElementChild;

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

const cardSelector = "#card-template";

//Functions

function handleModalClose(modal) {
  modal.classList.remove("modal_opened");
  modal.removeEventListener("mousedown", closeModalWithClick);
  document.removeEventListener("keydown", closeModalWithEsc);
}

function handleModalOpen(modal) {
  modal.classList.add("modal_opened");
  modal.addEventListener("mousedown", closeModalWithClick);
  document.addEventListener("keydown", closeModalWithEsc);
}

function renderCard(cardData,  )  {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
  
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  deleteButton.addEventListener("click", () => {
    const card = deleteButton.closest(".card");

    card.remove();
  });

  cardImage.addEventListener("click", () => {
    previewImage.src = cardImage.src;
    previewImage.alt = cardTitle.textContent;
    previewTitle.textContent = cardTitle.textContent;
    handleModalOpen(previewImageModal);
  });

  cardTitle.textContent = cardData.name;
  cardImage.alt = cardTitle.textContent;
  cardImage.src = cardData.link;

  return cardElement;
}

function handleProfileFormSubmit(e) {
  e.preventDefault();

  profileTitle.textContent = modalTitleInput.value;
  profileDescription.textContent = modalDescriptionInput.value;
  handleModalClose(editProfileModal);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;

  renderCard({ name, link }, cardListEl);
  handleModalClose(addCardModal);
  e.target.reset();

  const inputEls = [...addCardModal.querySelectorAll(".modal__input")];
  const submitButton = addCardModal.querySelector(".modal__button");
  toggleButtonState(inputEls, submitButton, config);
}

const closeModalWithClick = (e) => {
  if (e.target === e.currentTarget) {
    handleModalClose(e.currentTarget);
  }
};

const closeModalWithEsc = (e) => {
  if (e.key === "Escape") {
    const activeModal = document.querySelector(".modal_opened");
    handleModalClose(activeModal);
  }
};

profileEditButton.addEventListener("click", () => {
  modalTitleInput.value = profileTitle.textContent;
  modalDescriptionInput.value = profileDescription.textContent;
  handleModalOpen(editProfileModal);
});

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
profileEditForm.addEventListener("submit", handleProfileFormSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

addNewCardButton.addEventListener("click", () =>
  handleModalOpen(addCardModal, addCardModal)
);

closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const popup = button.closest(".modal");
    handleModalClose(popup);
  });
});

//Validation

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: ".modal__button_inactive",
  inputErrorClass: ".modal__error-message",
  errorClass: ".modal__error_visible",
};

const editProfileFormValidator = new FormValidator(config, profileEditForm);
editProfileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(config, addCardFormElement);
addCardFormValidator.enableValidation();