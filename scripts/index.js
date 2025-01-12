// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardsTemplate = document.querySelector("#card-template").content; // Темплейт карточки
const cardsContainer = document.querySelector(".places__list"); // контейнер, где появляются карточки

function createCards(cardsArray) {
  cardsArray.forEach(function (elem) {
    const clonedCard = cardsTemplate.cloneNode(true); // клонирую темплейт в CloneCard

    const cardImage = clonedCard.querySelector(".card__image"); // переменная для редактирования картинки
    const cardTitle = clonedCard.querySelector(".card__title"); // переменная для редактирования описания под картинкой
    const deleteButton = clonedCard.querySelector(".card__delete-button"); // переменная для кнопки удаления

    cardImage.src = elem.link; // меняю параметры у клона темплейта
    cardImage.alt = elem.name;
    cardTitle.textContent = elem.name;

    function deleteCard() {
      const removeCard = deleteButton.closest(".card");
      removeCard.remove();
    } // функция удаления карты

    deleteButton.addEventListener("click", deleteCard); // добавление слушателя событий к кнопке
    cardsContainer.append(clonedCard); // добавляю клон темплейта в конец контейнера
  });
}

createCards(initialCards);
