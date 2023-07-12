export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  //retrieves initial cards from the server
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((result) => {
      return this._checkResponse(result);
    });
  }

  getInitialData() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }

  //Retrieves user info from the server
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((result) => {
      return this._checkResponse(result);
    });
  }

  //Updates user info on the server
  changeUserInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((result) => {
      return this._checkResponse(result);
    });
  }

  updateProfilePicture(imageElement) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: imageElement,
      }),
    }).then((result) => {
      return this._checkResponse(result);
    });
  }

  //Adds a new card to the server
  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((result) => {
      return this._checkResponse(result);
    });
  }

  deleteCard(getId) {
    return fetch(`${this._baseUrl}/cards/${getId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((result) => {
      return this._checkResponse(result);
    });
  }

  changeLikeNumber(getId, isLiked) {
    return fetch(`${this._baseUrl}/cards/likes/${getId}`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: this._headers,
    }).then((result) => {
      return this._checkResponse(result);
    });
  }


  //Checks response from the server
  _checkResponse(result) {
    if (result.ok) {
      return result.json();
    }
    return Promise.reject(`Error: ${result.status}`);
  }

  // getInitialData(id) {
  //   return fetch(`${this._baseUrl}/${id}`, {
  //     headers: this._headers,
  //   }).then(this._checkResponse);
  // }

  // addImagetoApi(placeName, imageLink) {
  //   return fetch(`${this._baseUrl}/cards`, {
  //     method: "POST",
  //     headers: this._headers,
  //     body: JSON.stringify({
  //       name: placeName,
  //       link: imageLink,
  //     }),
  //   }).then((result) => {
  //     return this._checkResponse(result);
  //   });
  // }

  // removeImageFromApi(cardId) {
  //   return fetch(`${this._baseUrl}/cards/${cardId}`, {
  //     method: "DELETE",
  //     headers: this._headers,
  //   }).then((result) => {
  //     return this._checkResponse(result);
  //   });
  // }

  // addLike(cardId) {
  //   return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
  //     method: "PUT",
  //     headers: this._headers,
  //   }).then((result) => {
  //     return this._checkResponse(result);
  //   });
  // }

  // removeLike(cardId) {
  //   return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
  //     method: "DELETE",
  //     headers: this._headers,
  //   }).then((result) => {
  //     return this._checkResponse(result);
  //   });
  // }
}
