class Api {
   constructor({ baseUrl, headers }) {
      this._baseUrl = baseUrl;
      this._headers = headers;
   }

   //проверка
   _checkResponse(res) {
      if (res.ok) {
         return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
   }

   //Загрузка информации о пользователе с сервера
   getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
         method: 'GET',
         headers: {...this._headers, 'Authorization': `Bearer ${localStorage.getItem('jwt')}`},
      })
         .then(this._checkResponse);
   }

   //Загрузка карточек с сервера
   getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
         method: 'GET',
         headers: {...this._headers, 'Authorization': `Bearer ${localStorage.getItem('jwt')}`},
      })
         .then(this._checkResponse);
   }

   //Редактирование профиля
   patchUserInfoData({ name, about }) {
      return fetch(`${this._baseUrl}/users/me`, {
         method: 'PATCH',
         headers: {...this._headers, 'Authorization': `Bearer ${localStorage.getItem('jwt')}`},
         body: JSON.stringify({
            name: name,
            about: about
         })
      })
         .then(this._checkResponse);
   }

   //Добавление новой карточки
   postUserCardData({ name, link}) {
      return fetch(`${this._baseUrl}/cards`, {
         method: 'POST',
         headers: {...this._headers, 'Authorization': `Bearer ${localStorage.getItem('jwt')}`},
         body: JSON.stringify({
            name: name,
            link: link,
         })
      })
         .then(this._checkResponse);
   }

   //Отображение количества лайков карточки
   addLike(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
         method: 'PUT',
         headers: {...this._headers, 'Authorization': `Bearer ${localStorage.getItem('jwt')}`},
      })
         .then(this._checkResponse);
   }

   //Удаление карточки
   deleteCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
         method: 'DELETE',
         headers: {...this._headers, 'Authorization': `Bearer ${localStorage.getItem('jwt')}`},
      })
         .then(this._checkResponse);
   }

   //Постановка и снятие лайка
   deleteLike(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
         method: 'DELETE',
         headers: {...this._headers, 'Authorization': `Bearer ${localStorage.getItem('jwt')}`},
      })
         .then(this._checkResponse);
   }

   changeLikeStatus(cardId, isLiked) {
      if(isLiked) {
        return this.setlike(cardId)
      } else {
        return this.removeLike(cardId)
      }
    }

   //Обновление аватара пользователя
   patchUserAvatarData(link) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
         method: 'PATCH',
         headers: {...this._headers, 'Authorization': `Bearer ${localStorage.getItem('jwt')}`},
         body: JSON.stringify(link)
      })
         .then(this._checkResponse);
   }
}

const api = new Api({
   baseUrl: 'https://api.evgeshka.nomoredomainsclub.ru',
   headers: {
      'Content-Type': 'application/json'
   }
});

export default api;