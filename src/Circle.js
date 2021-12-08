import circleSvg from "../assets/Ouroboros.svg";

export class Circle {
  constructor(x, y, color) {
    this._x = x;
    this._y = y;
    this._color = color;
    const el = createElement();
    el.classList.add("circle", color);
    el.style.left = getUnit(this.x);
    el.style.top = getUnit(this.y);
    this._el = el;
    document.body.appendChild(this._el);
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
    this._el.classList.remove(this.color);
    this._el.classList.add("circle", "lightgray");
  }

  clear() {
    document.body.removeChild(this._el);
  }
}

function createElement() {
  const tmp = document.createElement("div");
  tmp.innerHTML = circleSvg;
  return tmp.firstElementChild;
}

function getUnit(value) {
  return `${value}px`;
}
