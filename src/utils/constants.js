export const initialCards = [
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

//Used in index.js

export const profileEditModalSelector = "#profile-edit-modal";
export const cardModalSelector = "#add-card-modal";
export const profileEditButton = document.querySelector(".profile__edit-button");
export const inputSelector = ".modal__input";
export const addNewCardButton = document.querySelector(".profile__add-button");
export const profileTitleSelector = document.querySelector(".profile__title");
export const profileDescriptionSelector = document.querySelector(".profile__description");
export const profileDescriptionElement = document.querySelector("#modal-form-description");
export const profileTitleElement = document.querySelector("#modal-form-title");
export const cardList = document.querySelector(".cards__list");
export const previewImageModal = "#image-modal";

//Change Profile Picture
export const changeProfilePictureModalSelector = "#change-profile-picture-modal";
export const profileImage = document.querySelector(".profile__image");
export const profileImageInput = document.querySelector("#modal__input_type_url");


export const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_inactive",
  inputErrorClass: "modal__error-message",
  errorClass: "modal__error_visible",
};
