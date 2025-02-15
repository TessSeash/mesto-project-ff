import './pages/index.css'; // добавьте импорт главного файла стилей
import { createCard, deleteCard, setLikeToCard } from './components/card';
import { openModal, closeModal } from './components/modal';
import { enableValidation, clearValidation } from './components/validation';
import { getInitialsCardsApi, getUserDataApi, addNewCardApi, editUserDataApi, updateAvatarApi } from './components/api'


const cardsContainer = document.querySelector(".places__list"); // контейнер, где появляются карточки

const buttonAddCard = document.querySelector(".profile__add-button"); // добавление карточки
const buttonClosePopupAddCard = document.querySelector(".popup_type_new-card .popup__close");
const popupAddCard = document.querySelector('.popup_type_new-card');
const formAddCard = document.querySelector('.popup__form[name="new-place"]');
const newCardName = formAddCard.querySelector('.popup__input_type_card-name');
const newCardLink = formAddCard.querySelector('.popup__input_type_url');

const buttonEditProfile = document.querySelector(".profile__edit-button"); // редактор профиля
const buttonClosePopupEditProfile = document.querySelector(".popup_type_edit .popup__close");
const popupEditProfile = document.querySelector('.popup_type_edit');
const formEditProfile = document.querySelector('.popup__form[name="edit-profile"]');
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector('.popup__input_type_description');

const popupEditAvatar = document.querySelector('.popup_type_avatar') // аватар
const formEditAvatar = document.querySelector('.popup__form[name="edit-avatar"]')
const avatarUrlInput = document.querySelector('.popup__input_type_avatar')
const profileAvatar = document.querySelector('.profile__image');
const buttonClosePopupEditAvatar = document.querySelector(".popup_type_avatar .popup__close");

const profileTitle = document.querySelector('.profile__title'); // данные профиля
const profileDescription = document.querySelector('.profile__description');

const buttonClosePopupShowImage = document.querySelector('.popup_type_image .popup__close'); // попап картинки на весь экран
const popupShowImage = document.querySelector('.popup_type_image');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

let currentUserId = null;

enableValidation(validationConfig);


Promise.all([getUserDataApi(), getInitialsCardsApi()])
  .then(([userData, initialCards]) => {

    currentUserId = userData._id;
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.style.backgroundImage = `url(${userData.avatar})`;


    initialCards.forEach(function (cardData) {

      const names = cardData.likes.map(likes => likes.name);
      const userLiked = names.includes(userData.name);
      
      const card = createCard(cardData, deleteCard, openPopupImage, currentUserId, userLiked);
      cardsContainer.append(card);

    });

  })
  .catch(error => console.log(error))





// Ниже попап для создания новой карточки
function restoreAddCardInputs() { // восстановить прежние значения в инпутах popupAddCard
  formAddCard.reset();
}

buttonAddCard.addEventListener("click", function () {
  openModal(popupAddCard);
  restoreAddCardInputs();
  clearValidation(formAddCard, validationConfig);
});

buttonClosePopupAddCard.addEventListener("click", function () {
  closeModal(popupAddCard);
  clearValidation(formAddCard, validationConfig);
});

function addNewCard(evt) {
  evt.preventDefault();
  renderLoading(true, formAddCard);

  const newCardNameInput = newCardName.value;
  const newCardLinkInput = newCardLink.value;


  addNewCardApi(newCardNameInput, newCardLinkInput)
    .then(card => {
      const newCard = createCard(card, deleteCard, openPopupImage, currentUserId);
      cardsContainer.prepend(newCard);
      closeModal(popupAddCard)
    })
    .catch(err => console.error(err))
    .finally(() => { renderLoading(false, formAddCard) })

}

formAddCard.addEventListener('submit', addNewCard);


// Ниже попап для редактирования профиля
function restoreProfileInputs() { // восстановить прежние значения в инпутах popupEditProfile
  jobInput.value = profileDescription.textContent;
  nameInput.value = profileTitle.textContent;
}

buttonEditProfile.addEventListener("click", function () {
  openModal(popupEditProfile);
  restoreProfileInputs();
  clearValidation(formEditProfile, validationConfig);
});

buttonClosePopupEditProfile.addEventListener("click", function () {
  closeModal(popupEditProfile);
  clearValidation(formEditProfile, validationConfig);
});

function setProfileProperties(evt) {
  evt.preventDefault();
  renderLoading(true, formEditProfile);

  const currentJob = jobInput.value;
  const currentName = nameInput.value;

  profileDescription.textContent = currentJob;
  profileTitle.textContent = currentName;

  editUserDataApi(currentName, currentJob)
    .then(userData => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closeModal(popupEditProfile);
    })
    .catch(err => console.log(err))
    .finally(() => { renderLoading(false, formEditProfile) })

}

formEditProfile.addEventListener('submit', setProfileProperties);


// Ниже попап для открытия карточки на весь экран
function openPopupImage(event) {
  const card = event.target;
  const cardName = card.alt;
  const cardLink = card.src
  const popupName = popupShowImage.querySelector('.popup__caption');
  const popupLink = popupShowImage.querySelector('.popup__image');
  popupName.textContent = cardName;
  popupLink.src = cardLink;
  popupLink.alt = cardName;

  openModal(popupShowImage);
};

buttonClosePopupShowImage.addEventListener("click", function () {
  closeModal(popupShowImage);
});

// Ниже редактор аватара
profileAvatar.addEventListener('click', () => {
  formEditAvatar.reset()
  clearValidation(formEditAvatar, validationConfig)
  openModal(popupEditAvatar)
})

function editAvatar(evt) {

  evt.preventDefault()
  renderLoading(true, formEditAvatar)

  updateAvatarApi(avatarUrlInput.value)
    .then(avatar => {
      profileAvatar.style.backgroundImage = `url(${avatar.avatar})`
      formEditAvatar.reset()
      closeModal(popupEditAvatar)
    })

    .catch(err => console.log(err))
    .finally(() => { renderLoading(false, formEditAvatar) })

}

buttonClosePopupEditAvatar.addEventListener("click", function () {
  closeModal(popupEditAvatar);
  clearValidation(formEditAvatar, validationConfig);
});

formEditAvatar.addEventListener('submit', editAvatar);


const renderLoading = (loading, formElement) => {
  const buttonElement = formElement.querySelector('.popup__button')
  if (loading) {
    buttonElement.setAttribute('data-text', buttonElement.textContent)
    buttonElement.textContent = 'Сохранение...'
  } else {
    buttonElement.textContent = buttonElement.getAttribute('data-text')
    buttonElement.removeAttribute('data-text')
  }
}