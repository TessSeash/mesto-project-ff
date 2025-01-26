export function openModal(modalWindow) {
  modalWindow.classList.add('popup_is-opened');
  document.addEventListener('keydown', popupCloseByEsc);
  modalWindow.addEventListener('mousedown', overlayMouseDown);
  modalWindow.addEventListener('mouseup', overlayMouseUp);
};

export function closeModal(modalWindow) {
  modalWindow.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', popupCloseByEsc);
  modalWindow.removeEventListener('mousedown', overlayMouseDown);
  modalWindow.removeEventListener('mouseup', overlayMouseUp);
};

function popupCloseByEsc(evt) {
  if (evt.key === 'Escape') {
    closeModal(document.querySelector('.popup_is-opened'));
  }
}

function overlayMouseDown(event) {
  if (!event.target.classList.contains('popup_is-opened')) return;
  event.target.isClicked = true;
}

function overlayMouseUp(event) {
  if (event.target.isClicked && event.target.classList.contains('popup_is-opened')) {
    event.preventDefault();
    closeModal(event.currentTarget);
  }
  event.currentTarget.isClicked = false;
}