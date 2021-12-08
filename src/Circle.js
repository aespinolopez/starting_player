export class Circle {
  constructor(x, y, color) {
    this._x = x;
    this._y = y;
    this._color = color;
    const el = document.createElement("div");
    el.classList.add("circle");
    el.style.backgroundColor = color;
    el.style.left = getUnit(this.x);
    el.style.top = getUnit(this.y);
    this._el = el;
  }

  get x() {
    return this._x;
  }

  set x(x) {
    this._x = x;
    this._el.style.left = getUnit(x);
  }

  get y() {
    return this._y;
  }

  set y(y) {
    this._y = this.y;
    this._el.style.top = getUnit(y);
  }

  get color() {
    return this._color;
  }

  looser() {
    this._el.style.backgroundColor = "lightgray";
  }

  draw() {
    document.body.appendChild(this._el);
  }

  clear() {
    document.body.removeChild(this._el);
  }
}

function getUnit(value) {
  return `${value}px`;
}
