import { openModal } from "./modal";

function createCard(cardName, cardLink, deleteButtonEvent, likeButtonEvent) {
    const cardsTemplate = document.querySelector("#card-template").content; // Темплейт карточки
    const cardElement = cardsTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");
    const deleteButton = cardElement.querySelector(".card__delete-button");
    const likeButton = cardElement.querySelector(".card__like-button");

    cardImage.src = cardLink;
    cardImage.alt = cardName;
    cardTitle.textContent = cardName;

    deleteButton.addEventListener("click", deleteButtonEvent);
    likeButton.addEventListener("click", likeButtonEvent);

    return cardElement;
}

function deleteCard(event) {
    event.target.closest(".card").remove();
}

function activateLike(event) {
    event.target.classList.toggle('card__like-button_is-active');
};

export { createCard, deleteCard, activateLike }