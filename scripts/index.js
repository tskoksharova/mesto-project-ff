// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardsContainer = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

function createCard(cardData){
    const cardElement = cardTemplate.cloneNode(true);
    const card = cardElement.querySelector('.card');
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    const deleteButton = card.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => {
        card.remove();
    })
    return cardElement;
}

function renderInitialCards(){
    initialCards.forEach((cardData) => {
        const cardElement = createCard(cardData);
        cardsContainer.appendChild(cardElement);
    })
}

renderInitialCards();
