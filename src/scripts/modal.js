const popupImage = document.querySelector('.popup_type_image');
const popupImageElement = popupImage.querySelector('.popup__image');
const popupCaptionElement = popupImage.querySelector('.popup__caption');

function handleEscapeClose(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
            closePopup(openedPopup);
        }
    }
}

function handleCloseEvents(evt) {
    if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')) {
        closePopup(evt.currentTarget);
    }
}

export function openPopup(popupElement) {
    popupElement.classList.remove('popup_is-animated');
    popupElement.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscapeClose);
    popupElement.addEventListener('mousedown', handleCloseEvents);
}

export function closePopup(popupElement) {
    popupElement.classList.remove('popup_is-opened');
    popupElement.classList.add('popup_is-animated');
    document.removeEventListener('keydown', handleEscapeClose);
    popupElement.removeEventListener('mousedown', handleCloseEvents);
}

export function openImagePopup(cardData) {
    popupImageElement.src = cardData.link;
    popupImageElement.alt = cardData.name;
    popupCaptionElement.textContent = cardData.name;
    openPopup(popupImage);
}