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
  changeProfilePictureSelector,
  profileImageButton
);
const editProfilePopup = new PopupWithForm(
  profileEditModalSelector,
  handleProfileFormSubmit
);
const changeProfilePicturePopup = new PopupWithForm(
  changeProfilePictureSelector,
  handleProfilePictureFormSubmit
);
const previewImagePopup = new PopupWithImage(previewImageModal);
const userInfo = new UserInfo(
  profileTitleSelector,
  profileDescriptionSelector,
  profileImage
);

//const deleteImagePopup = new PopupWithFormConfirmDelete(deleteCardModalSelector);
//const deleteCardFormValidator = new FormValidator(config, deleteCardModalSelector);

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en",
  headers: {
    authorization: "6aac4e36-cba8-4d7d-9a0d-4466297f6d1b",
    "Content-Type": "application/json",
  },
});

//Form Validators
editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
changeProfilePictureFormValidator.enableValidation();
//deleteCardFormValidator.enableValidation();

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
  .catch((err) => {
    console.error(err);
  });

//Profile Functions
function handleProfilePictureFormSubmit(url) {
  changeProfilePicturePopup.setLoading(true, "Save");
  api
    .updateProfilePicture(url)
    .then((data) => {
      userInfo.setUserAvatar(data.avatar);
      changeProfilePicturePopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      changeProfilePicturePopup.setLoading(false, "Save");
    });
}

function openProfilePopup() {
  const { profileName, description } = userInfo.getUserInfo();
  profileTitleElement.value = profileName;
  profileDescriptionElement.value = description;
  editProfileFormValidator.toggleButtonState();
  editProfilePopup.open();
}

function handleProfileFormSubmit({ name, description }) {
  editProfilePopup.setLoading(true);
  api
    .changeUserInfo(name, description)
    .then((data) => {
      userInfo.setUserInfo(data.name, data.about);
      editProfilePopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      editProfilePopup.setLoading(false, "Save");
    });
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
    // const newCardData = { name: data.name, link: data.link, likes: data.likes };
    const newCard = createCard(data);
    cardListSection.addItem(newCard);
    newCardPopup.close();
  });
}
const newCardPopup = new PopupWithForm(cardModalSelector, submitCard);
// const popupwithFormDelete  = new PopupWithFormConfirmDelete(deleteCardModalSelector, deleteMethodWIth API);
function createCard(cardData, userId) {
  // const { name, link, likes } = cardData;
  const cardElement = new Card(
    {
      cardData: cardData,
      cardSelector: "#card-template",
      handlePreviewImage: ({ name, link }) => {
        previewImagePopup.open({ name, link });
      },
      handleLikeButton: (cardId, isLiked) => {
        console.log(cardId, isLiked);
        api.changeLikeNumber(cardId, isLiked).then((data) => {
          console.log(data);
          cardElement.setLikes(data.likes);
        });
      },
      // handleDeleteButton: (card id here) => {
      //you want open the POpWithCOnfirm modal and you want

      // }
    },
    userId
  );
  return cardElement.getView();
}

//Card Set Event Listeners
addNewCardButton.addEventListener("click", () => {
  addCardFormValidator.toggleButtonState();
  newCardPopup.open();
});
