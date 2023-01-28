export const BASE_URL = 'https://api.evgeshka.nomoredomainsclub.ru';

//проверка
function onResponse(response) {
    if (response.ok) {
        console.log(response)
        return response.json();
    }
    return Promise.reject({ message: "Ошибка" }, response);
}

export const register = (email, password) => {
    return fetch(`${BASE_URL}/sign-up`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then((res) => onResponse(res));
}

export const login = (email, password) => {
    return fetch(`${BASE_URL}/sign-in`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then((res) => onResponse(res));
}

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
        .then((res) => onResponse(res));
}
