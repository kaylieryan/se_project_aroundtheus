export default class FormValidator {
  constructor(config, formEl ) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;

    this._formEl = formEl;
  
  }

  _showInputError(inputEl, errorMessage) {
    const errorEl = this._formEl.querySelector(`#${inputEl.id}-error`);

    inputEl.classList.add(this._inputErrorClass);
    errorEl.textContent = errorMessage;
    errorEl.classList.add(this._errorClass);
  }

  _hideInputError(inputEl) {
    const errorEl = this._formEl.querySelector(`#${inputEl.id}-error`);

    inputEl.classList.remove(this._inputErrorClass);
    errorEl.textContent = "";
    errorEl.classList.remove(this._errorClass);
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      return this._showInputError(inputEl, inputEl.validationMessage);
    }
    return this._hideInputError(inputEl);
  }

  _toggleButtonState(inputEls, submitButton) {
    if (this._hasInvalidInput(inputEls)) {
      submitButton.classList.add(this._inactiveButtonClass);
      submitButton.disabled = true;
    } else {
      submitButton.classList.remove(this._inactiveButtonClass);
      submitButton.disabled = false;
    }
  }

  _hasInvalidInput(inputEls) {
    return inputEls.some((inputEl) => !inputEl.validity.valid);
  }

  _setEventListeners() {
    this._inputEls = [...this._formEl.querySelectorAll(this._inputSelector)];
    this._submitButton = this._formEl.querySelector(this._submitButtonSelector);

    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState(this._inputEls, this._submitButton);
      });
    });
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners();
  }
}