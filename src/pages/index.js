import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithFormConfirmDelete from "../components/PopupWithFormConfirmDelete.js";
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
  changeProfilePictureSelector,
  profileImage,
  profileImageButton,
  deleteCardModalSelector,
} from "../utils/constants.js";

//Class Instances
const editProfileFormValidator = new FormValidator(
  config,
  profileEditModalSelector
);
const addCardFormValidator = new FormValidator(config, cardModalSelector);
const changeProfilePictureFormValidator = new FormValidator(
  config,
  changeProfilePictureSelector
);
//const deleteCardFormValidator = new FormValidator(config, deleteCardModalSelector);

const userInfo = new UserInfo(
  profileTitleSelector,
  profileDescriptionSelector,
  profileImage
);
const editProfilePopup = new PopupWithForm(profileEditModalSelector);
// (inputsObject) => {
//   userInfo.setUserInfo(inputsObject.name, inputsObject.description);
//   editProfilePopup.close();

// const newCardPopup = new PopupWithForm(cardModalSelector);

const changeProfilePicturePopup = new PopupWithForm(
  changeProfilePictureSelector,
  (inputsObject) => {
    api
      .updateProfilePicture(inputsObject["profile-picture-url"])
      .then((data) => {
        profileImageButton.src = data.avatar;
        changeProfilePicturePopup.close();
      })
      .catch((err) => {
        console.error(err);
      });
  }
);

const previewImagePopup = new PopupWithImage(previewImageModal);
//const deleteImagePopup = new PopupWithFormConfirmDelete(deleteCardModalSelector);

//Form Validators

editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
changeProfilePictureFormValidator.enableValidation();
//deleteCardFormValidator.enableValidation();

//Api Promise

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en",
  headers: {
    authorization: "6aac4e36-cba8-4d7d-9a0d-4466297f6d1b",
    "Content-Type": "application/json",
  },
});

// let userId;
// api.getUserInfo().then((userData) => {
//   userId = userData._id;
//   userInfo.setUserInfo(userData.name, userData.about);
//   userInfo.setUserAvatar(userData.avatar);
//   //profileImage.src = userData.avatar;
// });

// let cardListSection;
// api
//   .getInitialCards()
//   .then((initialCards) => {
//     cardListSection = new Section(
//       {
//         items: initialCards,
//         renderer: (data) => {
//           const newCard = createCard(data);
//           cardListSection.addItem(newCard);
//         },
//       },
//       cardList
//     );
//     cardListSection.renderItems();
//   })
//   .catch((err) => {
//     console.error(err);
//   });

let userId;
let cardListSection;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData.name, userData.about);
    userInfo.setUserAvatar(userData.avatar);
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

//cardListSection.renderItems();

function openProfilePopup() {
  const { profileName, description } = userInfo.getUserInfo();
  profileTitleElement.value = profileName;
  profileDescriptionElement.value = description;
  editProfileFormValidator.toggleButtonState();
  editProfilePopup.open();
}

function handleProfileFormSubmit({ title, description }) {
  editProfilePopup.setLoading(true);
  api
    .updateUserInfo(title, description)
    .then((data) => {
      userInfo.setUserInfo(data.name, data.about);
      editProfilePopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      editProfilePopup.setLoading(false);
    });

  // userInfo.setUserInfo(inputsObject.name, inputsObject.description);
  // editProfilePopup.close();
}

//Profile Set Event Listeners
profileEditButton.addEventListener("click", openProfilePopup);
profileImage.addEventListener("click", openChangeProfilePicturePopup);

function openChangeProfilePicturePopup() {
  changeProfilePictureFormValidator.toggleButtonState();
  changeProfilePicturePopup.open();
}

//Card Functions
function submitCard({ title, url }) {
  console.log(title, url);
  api.addCard(title, url).then((data) => {
    const newCardData = { name: data.name, link: data.link, likes: data.likes };
    const newCard = createCard(newCardData);
    cardListSection.addItem(newCard);
    newCardPopup.close();
  });
}
const newCardPopup = new PopupWithForm(cardModalSelector, submitCard);

function createCard(cardData) {
  const { name, link, likes } = cardData;
  const cardElement = new Card({
    cardData: { name, link, likes },
    cardSelector: "#card-template",
    handlePreviewImage: ({ name, link }) => {
      previewImagePopup.open({ name, link });
    },
  });
  return cardElement.getView();
}

//Card Set Event Listeners
addNewCardButton.addEventListener("click", () => {
  addCardFormValidator.toggleButtonState();
  newCardPopup.open();
});
