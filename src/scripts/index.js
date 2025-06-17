import '../pages/index.css';
import { createCard } from './card.js';
import { openPopup, closePopup } from './modal.js';
import { enableValidation, clearValidation } from './validation.js';
import {
    getUserInfo,
    getInitialCards,
    updateUserProfile,
    addNewCard,
    deleteCard,
    likeCard,
    unlikeCard,
    updateUserAvatar
} from './api.js';


const cardsContainer = document.querySelector('.places__list');

const editProfileButton = document.querySelector('.profile__edit-button');
const addNewCardButton = document.querySelector('.profile__add-button');
const editAvatarButton = document.querySelector('.profile__image-container');

const popupEditProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const popupUpdateAvatar = document.querySelector('.popup_type_update-avatar');

const popupImageElement = popupImage.querySelector('.popup__image');
const popupCaptionElement = popupImage.querySelector('.popup__caption');

const formEditProfile = document.forms['edit-profile'];
const formNewCard = document.forms['new-place'];
const formUpdateAvatar = document.forms['update-avatar'];

const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.description;
const avatarLinkInput = formUpdateAvatar.elements['avatar-link'];

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');

let userId;

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};

function renderLoading(popup, isLoading) {
    const button = popup.querySelector('.popup__button');
    if (isLoading) {
        button.textContent = 'Сохранение...';
    } else {
        button.textContent = 'Сохранить';
    }
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    renderLoading(popupEditProfile, true);
    updateUserProfile(nameInput.value, jobInput.value)
        .then(userData => {
            profileTitle.textContent = userData.name;
            profileDescription.textContent = userData.about;
            closePopup(popupEditProfile);
        })
        .catch(err => console.log(`Ошибка при обновлении профиля: ${err}`))
        .finally(() => renderLoading(popupEditProfile, false));
}

function handleNewCardSubmit(evt) {
    evt.preventDefault();
    renderLoading(popupNewCard, true);
    const name = formNewCard.elements['place-name'].value;
    const link = formNewCard.elements.link.value;
    addNewCard(name, link)
        .then(cardData => {
            const cardElement = createCard(cardData, userId, handleLikeClick, openImagePopup, handleDeleteClick);
            cardsContainer.prepend(cardElement);
            formNewCard.reset();
            closePopup(popupNewCard);
        })
        .catch(err => console.log(`Ошибка при добавлении карточки: ${err}`))
        .finally(() => renderLoading(popupNewCard, false));
}

function handleAvatarFormSubmit(evt) {
    evt.preventDefault();
    renderLoading(popupUpdateAvatar, true);
    updateUserAvatar(avatarLinkInput.value)
        .then(userData => {
            profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
            closePopup(popupUpdateAvatar);
        })
        .catch(err => console.log(`Ошибка при обновлении аватара: ${err}`))
        .finally(() => renderLoading(popupUpdateAvatar, false));
}

function handleDeleteClick(cardId, cardElement) {
    deleteCard(cardId)
        .then(() => {
            cardElement.remove();
        })
        .catch(err => console.log(`Ошибка при удалении карточки: ${err}`));
}

function handleLikeClick(cardId, isLiked, likeCounterElement, likeButtonElement) {
    const likeAction = isLiked ? unlikeCard(cardId) : likeCard(cardId);
    likeAction
        .then(cardData => {
            likeCounterElement.textContent = cardData.likes.length;
            likeButtonElement.classList.toggle('card__like-button_is-active');
        })
        .catch(err => console.log(`Ошибка при обработке лайка: ${err}`));
}

function openImagePopup(cardData) {
    popupImageElement.src = cardData.link;
    popupImageElement.alt = cardData.name;
    popupCaptionElement.textContent = cardData.name;
    openPopup(popupImage);
}

editProfileButton.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    clearValidation(formEditProfile, validationConfig);
    openPopup(popupEditProfile);
});

addNewCardButton.addEventListener('click', () => {
    formNewCard.reset();
    clearValidation(formNewCard, validationConfig);
    openPopup(popupNewCard);
});

editAvatarButton.addEventListener('click', () => {
    formUpdateAvatar.reset();
    clearValidation(formUpdateAvatar, validationConfig);
    openPopup(popupUpdateAvatar);
});

formEditProfile.addEventListener('submit', handleProfileFormSubmit);
formNewCard.addEventListener('submit', handleNewCardSubmit);
formUpdateAvatar.addEventListener('submit', handleAvatarFormSubmit);

Promise.all([getUserInfo(), getInitialCards()])
    .then(([userData, cardsData]) => {
        userId = userData._id;
        profileTitle.textContent = userData.name;
        profileDescription.textContent = userData.about;
        profileAvatar.style.backgroundImage = `url(${userData.avatar})`;

        cardsData.forEach(card => {
            const cardElement = createCard(card, userId, handleLikeClick, openImagePopup, handleDeleteClick);
            cardsContainer.append(cardElement);
        });
    })
    .catch(err => {
        console.log(`Ошибка при загрузке данных: ${err}`);
    });

enableValidation(validationConfig);