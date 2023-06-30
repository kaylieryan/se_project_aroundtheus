export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }


getInitialCards() {
  return fetch("https://around.nomoreparties.co/v1/group-42/cards", {
    headers: {
      authorization: "c56e30dc-2883-4270-a59e-b2f7bae969c6"
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
}