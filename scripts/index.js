// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardsTemplate = document.querySelector("#card-template").content; // Темплейт карточки
const cardsContainer = document.querySelector(".places__list"); // контейнер, где появляются карточки

function createCard(cardName, cardLink, deleteButtonEvent) {
  const cardElement = cardsTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title')
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = cardLink;
  cardImage.alt = cardName;
  cardTitle.textContent = cardName;

  deleteButton.addEventListener('click', deleteButtonEvent);

  return cardElement;
}

function deleteCard (event) { 
  event.target.closest(".card").remove(); 
};

initialCards.forEach(function(cardData) {
  const card = createCard(cardData.name, cardData.link, deleteCard);
  cardsContainer.append(card);
});
