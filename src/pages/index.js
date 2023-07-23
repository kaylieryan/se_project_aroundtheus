import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import {
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
  profileImageButton,
  currentProfileImage,
  deleteCardModalSelector,
} from "../utils/constants.js";

//Class Instances
const editProfilePopup = new PopupWithForm(
  profileEditModalSelector,
  handleProfileFormSubmit
);
const changeProfilePicturePopup = new PopupWithForm(
  changeProfilePictureSelector,
  handleProfilePictureFormSubmit
);
const newCardPopup = new PopupWithForm(cardModalSelector, submitCard);

const previewImagePopup = new PopupWithImage(previewImageModal);
const userInfo = new UserInfo(
  profileTitleSelector,
  profileDescriptionSelector,
  currentProfileImage
);

const deleteImagePopup = new PopupWithConfirm(deleteCardModalSelector);

//Api Instance
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en",
  headers: {
    authorization: "6aac4e36-cba8-4d7d-9a0d-4466297f6d1b",
    "Content-Type": "application/json",
  },
});

//Form Validators
const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    // Get the name of the form
    const formName = formElement.getAttribute("name");
    // Store a validator by the `name` of the form
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(config);

//Api Promise
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
          const newCard = createCard(data, userId);
          cardListSection.addItem(newCard);
        },
      },
      cardList
    );
    cardListSection.renderItems();
  })
  .catch(console.error);

//Profile Functions
function handleProfilePictureFormSubmit(url) {
  changeProfilePicturePopup.renderLoading(true, "Saving...");
  api
    .updateProfilePicture(url)
    .then((data) => {
      userInfo.setUserAvatar(data.avatar);
      changeProfilePicturePopup.close();
    })
    .catch(console.error)

    .finally(() => {
      changeProfilePicturePopup.renderLoading(false, "Save");
    });
}

function openProfilePopup() {
  const { profileName, description } = userInfo.getUserInfo();
  profileTitleElement.value = profileName;
  profileDescriptionElement.value = description;
  formValidators["edit-profile-form"].resetValidation();
  editProfilePopup.open();
}

function handleProfileFormSubmit({ name, description }) {
  editProfilePopup.renderLoading(true);
  api
    .changeUserInfo(name, description)
    .then((data) => {
      userInfo.setUserInfo(data.name, data.about);
      editProfilePopup.close();
    })
    .catch(console.error)

    .finally(() => {
      editProfilePopup.renderLoading(false, "Save");
    });
}

//Profile Set Event Listeners
profileEditButton.addEventListener("click", openProfilePopup);
profileImageButton.addEventListener("click", openChangeProfilePicturePopup);

function openChangeProfilePicturePopup() {
  formValidators["change-profile-picture-form"].resetValidation();
  changeProfilePicturePopup.open();
}

//Card Functions
function submitCard({ title, url }) {
  newCardPopup.renderLoading(true);
  api
    .addCard(title, url)
    .then((data) => {
      const newCard = createCard(data, userId);
      cardListSection.addItem(newCard);
      newCardPopup.close();
    })
    .catch(console.error)

    .finally(() => {
      newCardPopup.renderLoading(false, "Create");
    });
}

function createCard(cardData, userId) {
  const cardElement = new Card(
    {
      cardData: cardData,
      cardSelector: "#card-template",
      handlePreviewImage: ({ name, link }) => {
        previewImagePopup.open({ name, link });
      },
      handleLikeButton: (cardId, isLiked) => {
        api
          .changeLikeNumber(cardId, isLiked)
          .then((data) => {
            cardElement.setLikes(data.likes);
          })
          .catch(console.error);
      },
      handleDeleteButton: (cardId) => {
        deleteImagePopup.setSubmitAction(() => {
          deleteImagePopup.setLoading(true);
          cardElement.deleteCard();
          api
            .deleteCard(cardId)
            .then((result) => {
              cardElement.remove(result.cardId);
              deleteImagePopup.close();
            })
            .catch(console.error)

            .finally(() => {
              deleteImagePopup.setLoading(false, "Yes");
            });
        });
        deleteImagePopup.open(cardId);
      },
    },
    userId
  );
  return cardElement.getView();
}

//Card Set Event Listeners
addNewCardButton.addEventListener("click", () => {
  formValidators["add-card-form"].resetValidation();
  newCardPopup.open();
});
