function createCard(cardName, cardLink, deleteButtonEvent, likeButtonEvent, showCardImageEvent) {
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
    cardImage.addEventListener("click", showCardImageEvent);

    return cardElement;
}

function deleteCard(event) {
    event.target.closest(".card").remove();
}

function activateLike(event) {
    event.target.classList.toggle('card__like-button_is-active');
};

function showCardImage(event) {
    const popup = document.querySelector('.popup_type_image');
    const popupImage = popup.querySelector('.popup__image');
    const popupCaption = popup.querySelector('.popup__caption');

    popup.classList.add('popup_is-opened'); // открытие попапа и изменение атрибутов
    popupImage.setAttribute('alt', event.target.alt);
    popupImage.setAttribute('src', event.target.src);
    popupCaption.textContent = event.target.alt;

    function closeByOverlay(event) { // закрытие попапа на оверлей
        if (event.target === popup) {
            popup.classList.remove('popup_is-opened');
        }
    };

    function closeByEsc(event) { // закрытие попапа на Esc
        if (event.key === 'Escape') {
            popup.classList.remove('popup_is-opened');
        }
    }

    popup.addEventListener("click", closeByOverlay);
    document.addEventListener("keydown", closeByEsc);

}

export { createCard, deleteCard, activateLike, showCardImage }