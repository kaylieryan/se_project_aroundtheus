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

  updateProfilePicture(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data["profile-picture-url"],
      }),
    }).then((result) => {
      return this._checkResponse(result);
    });
  }

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

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((result) => {
      return this._checkResponse(result);
    });
  }

  changeLikeNumber(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._headers,
    }).then((result) => {
      return this._checkResponse(result);
    });
  }

  getInitialData() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  //Checks response from the server
  _checkResponse(result) {
    if (result.ok) {
      return result.json();
    }
    return Promise.reject(`Error: ${result.status}`);
  }
}
