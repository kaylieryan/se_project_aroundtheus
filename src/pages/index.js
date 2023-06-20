import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import initialCards from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";

//Elements

//Functions

/*

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

*/

//Buttons

const profileEditButton = document.querySelector("#profile-edit-button");
const addNewCardButton = document.querySelector(".profile__add-button");

const profileInfoSelectors = {
  name: ".profile__title",
  description: ".profile__description",
};

const profileInfo = new UserInfo(profileInfoSelectors);

//Modal Handlers

const previewImageModal = new PopupWithImage("#image-modal");
previewImageModal.setEventListeners();

const editProfileModal = new PopupWithForm("#profile-edit-modal", (data) => {
  profileInfo.setUserInfo(data);
});
editProfileModal.setEventListeners();

const addCardModal = new PopupWithForm("#add-card-modal", addCard);
addCardModal.setEventListeners();

//Render initial cards

const cardList = new Section(
  {
    items: initialCards,
    renderer: addCard,
  },
  ".cards__list"
);

cardList.renderItems();

//Form Validation

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_inactive",
  inputErrorClass: "modal__error-message",
  errorClass: "modal__error_visible",
};

const editFormEl = document.querySelector("#edit-profile-form");

const editProfileFormValidator = new FormValidator(config, editFormEl);
editProfileFormValidator.enableValidation();

const addFormEl = document.querySelector("#add-card-form");

const addCardFormValidator = new FormValidator(config, addFormEl);
addCardFormValidator.enableValidation();

//Event Listeners

profileEditButton.addEventListener("click", (event) => {
  editProfileFormValidator.disableButton();
  handleModalOpen.open(event);
});

addNewCardButton.addEventListener("click", (event) => {
  addCardFormValidator.disableButton();
  handleModalOpen.open(event);
});

//Card Functions

function addCard({ title, url }) {
  const newCardData = { title, url };
  const newCard = createCard(newCardData);
  cardList.addItem(newCard);
  addCardModal.close();
}

function createCard({ name, link }) {
  const card = new Card({ name, link }, "#card-template", () => {
    previewImageModal.open({ name, link });
  });
  return card.getView();
}
