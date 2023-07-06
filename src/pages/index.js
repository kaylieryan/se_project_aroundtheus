import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithFormConfirmDelete from "../components/PopupWithFormConfirmDelete";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import {
  initialCards,
  config,
  profileTitleSelector,
  profileDescriptionSelector,
  profileEditModalSelector,
  profileEditButton,
  profileDescriptionElement,
  profileTitleElement,
  cardModalSelector,
  addNewCardButton,
  cardList,
  previewImageModal,
  changeProfilePictureModalSelector,
  profileImage,
} from "../utils/constants.js";

//Api Class

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en",
  headers: {
    authorization: "6aac4e36-cba8-4d7d-9a0d-4466297f6d1b",
    "Content-Type": "application/json",
  },
});

let userId;
let cardListSection;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData.name, userData.about);
    cardListSection = new Section(
      {
        items: initialCards,
        renderer: (data) => {
          const newCard = createCard(data);
          cardListSection.addItem(newCard);
        },
      },
      cardList
    );
    cardListSection.renderItems();
  })
  .catch((err) => {
    console.error(err);
  });

//Form Validator

const editProfileFormValidator = new FormValidator(
  config,
  profileEditModalSelector
);
const addCardFormValidator = new FormValidator(config, cardModalSelector);
editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

//Change Profile Picture

const changeProfilePicturePopup = new PopupWithForm(
  changeProfilePictureModalSelector,
  handleChangeProfilePictureSubmit
);

function handleChangeProfilePictureSubmit() {
  alert("hello")
  changeProfilePicturePopup.close();
}

function openChangeProfilePicturePopup() {
  changeProfilePicturePopup.open();
}

profileImage.addEventListener("click", openChangeProfilePicturePopup);


//Profile Class

const userInfo = new UserInfo(profileTitleSelector, profileDescriptionSelector);

const editProfilePopup = new PopupWithForm(
  profileEditModalSelector,
  (inputsObject) => {
    userInfo.setUserInfo(inputsObject.name, inputsObject.description);
    editProfilePopup.close();
  }
);

profileEditButton.addEventListener("click", openProfilePopup);

function openProfilePopup() {
  const { profileName, description } = userInfo.getUserInfo();
  profileTitleElement.value = profileName;
  profileDescriptionElement.value = description;
  editProfileFormValidator.toggleButtonState();
  editProfilePopup.open();
}

//Section Class

// const cardListSection = new Section(
//   {
//     items: initialCards,
//     renderer: ({ name, link }) => {
//       const newCard = createCard({ name, link });
//       cardListSection.addItem(newCard);
//     },
//   },
//   cardList
// );

// cardListSection.renderItems();

//PopupWithForm Class

const newCardPopup = new PopupWithForm(cardModalSelector, submitCard);
const previewImagePopup = new PopupWithImage(previewImageModal);

addNewCardButton.addEventListener("click", () => {
  addCardFormValidator.toggleButtonState();
  newCardPopup.open();
});

//Card Functions

function createCard({ name, link }) {
  const cardElement = new Card(
    { name, link },
    "#card-template",
    ({ name, link }) => {
     previewImagePopup.open({ name, link });
    }
  );
  return cardElement.getView();
}

function submitCard({ title, url }) {
  const newCardData = { name: title, link: url };
  const newCard = createCard(newCardData);
  cardListSection.prependItem(newCard);
  newCardPopup.close();
}
