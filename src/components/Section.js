export default class Section {
  constructor({ items, renderer }, containerElement) {
    this._items = items;
    this._renderer = renderer;
    this._containerElement = containerElement;
  }

  renderItems() {
    this._items.reverse().forEach(this._renderer);
  }

  addItem(domElement) {
    this._containerElement.prepend(domElement);
  }
}
