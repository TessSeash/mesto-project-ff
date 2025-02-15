import { deleteOwnerCard, setLikeApi } from './api'

function createCard(cardName, cardLink, deleteButtonEvent, imagePopupEvent, likes, cardId, currentUserId, ownerId, userLiked) {
  const cardsTemplate = document.querySelector("#card-template").content; // Темплейт карточки
  const cardElement = cardsTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCount = cardElement.querySelector(".card__like-count");

  cardImage.src = cardLink;
  cardImage.alt = cardName;
  cardTitle.textContent = cardName;
  likeCount.textContent = likes;

  deleteButton.style.visibility = "hidden"; // Скрываем кнопку удаления карточки
  if (currentUserId === ownerId) { // Показываем кнопку удаления карточки если пользователь - автор картинки
    deleteButton.style.visibility = "visible";
    deleteButton.addEventListener("click", (event) => deleteButtonEvent(event, cardId));
  }

  if (userLiked) {
    likeButton.classList.add('card__like-button_is-active');
  }

  likeButton.addEventListener('click', () => {
    setLikeToCard(likeButton, cardId, likeCount);
  })


  cardImage.addEventListener('click', imagePopupEvent);

  return cardElement;
}

function deleteCard(event, cardId) {
  event.stopPropagation();
  event.target.closest(".card").remove(); // удаляем карточку у себя

  deleteOwnerCard(cardId) // Удаляем карточку с сервера
    .catch(err => {
      console.log(`Ошибка при удалении карточки: ${err}`);
    });
}

function setLikeToCard(likeButton, cardId, likesCount) {
  const isLiked = likeButton.classList.contains('card__like-button_is-active')

  setLikeApi(cardId, isLiked)
    .then(updatedCard => {
      likeButton.classList.toggle('card__like-button_is-active')
      likesCount.textContent = updatedCard.likes.length
    })
    .catch(err => console.log(err))
}

export { createCard, deleteCard, setLikeToCard }
