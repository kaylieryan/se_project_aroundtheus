



export default class FormValidator {
  constructor(config, formEl) {
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
      this._showInputError(inputEl, inputEl.validationMessage);
    } else {
      this._hideInputError(inputEl);
    }
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
    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState();
      });
    });
    this._toggleButtonState();
  }

  deleteButtonState() {
    this._submitButtonSelector.disabled = true;
    this._submitButtonSelector.classList.add(this._config.inactiveButtonClass);
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners();
  }
}

