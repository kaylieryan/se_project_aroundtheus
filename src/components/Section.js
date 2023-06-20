export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(domElement) {
    this._containerSelector.append(domElement);
  }

  prependItem(domElement) {
    this._containerSelector.prepend(domElement);
  }
}
