const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-mag-4',
    headers: {
        authorization: 'c8f36a28-6935-4341-9557-c8717ad7664c',
        'Content-Type': 'application/json'
    }
};
function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

export function getUserInfo() {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    }).then(checkResponse);
}

export function getInitialCards() {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    }).then(checkResponse);
}

export function updateUserProfile(name, about) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: about
        })
    }).then(checkResponse);
}

export function addNewCard(name, link) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    }).then(checkResponse);
}

export function deleteCard(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    }).then(checkResponse);
}

export function likeCard(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    }).then(checkResponse);
}

export function unlikeCard(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    }).then(checkResponse);
}

export function updateUserAvatar(avatarUrl) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatarUrl
        })
    }).then(checkResponse);
}