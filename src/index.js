import './pages/index.css'; // добавьте импорт главного файла стилей
import { initialCards } from './scripts/cards';
import { createCard, deleteCard, activateLike, popupImage } from './components/card';
import { openModal, closeModal } from './components/modal';


const cardsContainer = document.querySelector(".places__list"); // контейнер, где появляются карточки

const buttonAddCard = document.querySelector(".profile__add-button"); // добавление карточки
const buttonClosePopupAddCard = document.querySelector(".popup_type_new-card .popup__close");
const popupAddCard = document.querySelector('.popup_type_new-card');

const buttonEditProfile = document.querySelector(".profile__edit-button");// редактор профиля
const buttonClosePopupEditProfile = document.querySelector(".popup_type_edit .popup__close");
const popupEditProfile = document.querySelector('.popup_type_edit');


const buttonClosePopupShowImage = document.querySelector('.popup_type_image .popup__close');
const popupShowImage = document.querySelector('.popup_type_image');

const formEditProfile = document.querySelector('.popup__form[name="edit-profile"]');
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector('.popup__input_type_description');

const formAddCard = document.querySelector('.popup__form[name="new-place"]');
const newCardName = formAddCard.querySelector('.popup__input_type_card-name');
const newCardLink = formAddCard.querySelector('.popup__input_type_url');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

initialCards.forEach(function (cardData) {
  const card = createCard(cardData.name, cardData.link, deleteCard, activateLike);
  cardsContainer.append(card);
});


//попап для создания новой карточки
function restoreAddCardInputs() { // восстановить прежние значения в инпутах popupAddCard
  formAddCard.reset();
}

buttonAddCard.addEventListener("click", function () {
  openModal(popupAddCard);
  restoreAddCardInputs();
});

buttonClosePopupAddCard.addEventListener("click", function () {
  closeModal(popupAddCard);
});

function addNewCard(evt) {
  evt.preventDefault();

  const newCardNameInput = newCardName.value;
  const newCardLinkInput = newCardLink.value;

  const newCard = createCard(newCardNameInput, newCardLinkInput, deleteCard, activateLike);
  cardsContainer.prepend(newCard);

  closeModal(popupAddCard);
}

formAddCard.addEventListener('submit', addNewCard);


//попап для редактирования профиля
function restoreProfileInputs() { // восстановить прежние значения в инпутах popupEditProfile
  jobInput.value = profileDescription.textContent;
  nameInput.value = profileTitle.textContent;
}

buttonEditProfile.addEventListener("click", function () {
  openModal(popupEditProfile);
  restoreProfileInputs();
});

buttonClosePopupEditProfile.addEventListener("click", function () {
  closeModal(popupEditProfile);
});

function setProfileProperties(evt) {
  evt.preventDefault();

  const currentJob = jobInput.value;
  const currentName = nameInput.value;

  profileDescription.textContent = currentJob;
  profileTitle.textContent = currentName;

  closeModal(popupEditProfile);
}

formEditProfile.addEventListener('submit', setProfileProperties);


// попап для открытия карточки на весь экран

buttonClosePopupShowImage.addEventListener("click", function () {
  closeModal(popupShowImage);
});

cardsContainer.addEventListener("click", popupImage);
