export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }


getInitialCards() {
  return fetch("https://around.nomoreparties.co/v1/cohort-3-en", {
    headers: {
      authorization: "6aac4e36-cba8-4d7d-9a0d-4466297f6d1b",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
    .catch((err) => {
      console.error(err);
    });
    }
  }
