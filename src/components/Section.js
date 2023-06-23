export default class Section {
  constructor({ items, renderer }, classSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(classSelector);
  }

  renderItems() {
    this._items.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(domElement) {
    this._container.append(domElement);
  }

  prependItem(domElement) {
    this._container.prepend(domElement);
  }
}
