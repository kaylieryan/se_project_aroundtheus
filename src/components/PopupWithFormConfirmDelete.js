import PopupWithForm from "./PopupWithForm";

export default class PopupWithFormConfirmDelete extends PopupWithForm {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector, handleFormSubmit);
  }

  open(data) {
    super.open();
    this.data = data;
  }

  setSubmitAction(handleFormSubmit) {
    this._handleFormSubmit = handleFormSubmit;
  }

  _handleSubmit = () => {
    const inputValues = this.data;
    this._handleFormSubmit(inputValues);
  };
}
