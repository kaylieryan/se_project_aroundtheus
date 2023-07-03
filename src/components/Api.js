export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  //Checks response from the server
  _checkResponse(result) {
    if (result.ok) {
      return result.json();
    }
    return Promise.reject(`Error: ${result.status}`);
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
  setUserInfo(name, about) {
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
}