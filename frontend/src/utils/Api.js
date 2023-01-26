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
         headers: this._headers
      })
         .then(this._checkResponse);
   }

   //Загрузка карточек с сервера
   getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
         method: 'GET',
         headers: this._headers
      })
         .then(this._checkResponse);
   }

   //Редактирование профиля
   patchUserInfoData(name, about) {
      return fetch(`${this._baseUrl}/users/me`, {
         method: 'PATCH',
         headers: this._headers,
         body: JSON.stringify({
            name: name,
            about: about
         })
      })
         .then(this._checkResponse);
   }

   //Добавление новой карточки
   postUserCardData(name, link) {
      return fetch(`${this._baseUrl}/cards`, {
         method: 'POST',
         headers: this._headers,
         body: JSON.stringify({
            name: name,
            link: link
         })
      })
         .then(this._checkResponse);
   }

   //Отображение количества лайков карточки
   addLike(id) {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
         method: 'PUT',
         headers: this._headers
      })
         .then(this._checkResponse);
   }

   //Удаление карточки
   deleteCard(id) {
      return fetch(`${this._baseUrl}/cards/${id}`, {
         method: 'DELETE',
         headers: this._headers
      })
         .then(this._checkResponse);
   }

   //Постановка и снятие лайка
   deleteLike(id) {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
         method: 'DELETE',
         headers: this._headers
      })
         .then(this._checkResponse);
   }

   changeLikeStatus(id, isLiked) {
      return isLiked ? this.deleteLike(id) : this.addLike(id);
   }

   //Обновление аватара пользователя
   patchUserAvatarData(link) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
         method: 'PATCH',
         headers: this._headers,
         body: JSON.stringify({
            avatar: link
         })
      })
         .then(this._checkResponse);
   }
}

export default new Api({
   baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-51',
   headers: {
      authorization: '5c931bad-1961-412c-8ce8-c9feec65b03a',
      'Content-Type': 'application/json'
   }
});