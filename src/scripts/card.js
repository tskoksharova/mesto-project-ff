const cardTemplate = document.querySelector('#card-template').content;

export function createCard(cardData, userId, handleLikeClick, handleImageClick, handleDeleteClick) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const likeButton = cardElement.querySelector('.card__like-button');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeCounter = cardElement.querySelector('.card__like-counter');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
    likeCounter.textContent = cardData.likes.length;

    if (cardData.owner._id !== userId) {
        deleteButton.style.display = 'none';
    } else {
        deleteButton.addEventListener('click', () => {
            handleDeleteClick(cardData._id, cardElement);
        });
    }

    const isLiked = cardData.likes.some(like => like._id === userId);
    if (isLiked) {
        likeButton.classList.add('card__like-button_is-active');
    }

    likeButton.addEventListener('click', () => {
        handleLikeClick(cardData._id, likeButton.classList.contains('card__like-button_is-active'), likeCounter, likeButton);
    });

    cardImage.addEventListener('click', () => {
        handleImageClick(cardData);
    });

    return cardElement;
}
