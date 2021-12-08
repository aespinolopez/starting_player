import { Circle } from "./Circle";
import colors from "./Colors";

const TIME = 3000;

function players() {
  const players = {};
  let timeout = 0;

  addTouchableInterface();

  function register(id, circle) {
    players[id] = circle;
    circle.draw();
    startCountDown();
  }

  function startCountDown() {
    if (timeout) {
      clearTimeout(timeout);
      timeout = setTimeout(choseWinner, TIME);
    } else {
      timeout = setTimeout(choseWinner, TIME);
    }
  }

  function unregister(id) {
    const circle = players[id];
    delete players[id];
    circle.clear();
    startCountDown();
    return circle;
  }

  function choseWinner() {
    const playerIds = Object.keys(players);
    const winner = Math.round(Math.random() * playerIds.length);
    Object.entries(players)
      .filter(([player]) => player !== playerIds[winner])
      .forEach(([player, circle]) => {
        circle.looser();
      });
  }

  function getCircleFromPlayer(id) {
    return players[id];
  }

  function addTouchableInterface() {
    window.addEventListener("touchstart", (e) => {
      Array.from(e.changedTouches).forEach((touch) => {
        const circle = new Circle(touch.pageX, touch.pageY, colors.pick());
        register(touch.identifier, circle);
      });
    });
    window.addEventListener("touchend", (e) => {
      Array.from(e.changedTouches).forEach((touch) => {
        const circle = unregister(touch.identifier);
        colors.remove(circle.color);
      });
    });
    window.addEventListener("touchmove", (e) => {
      Array.from(e.changedTouches).forEach((touch) => {
        const circle = getCircleFromPlayer(touch.identifier);
        circle.x = touch.pageX;
        circle.y = touch.pageY;
      });
    });
    window.addEventListener("touchcancel", (e) => {
      Array.from(e.changedTouches).forEach((touch) => {
        const circle = unregister(touch.identifier);
        colors.remove(circle.color);
      });
    });
  }

  return {
    register,
    unregister,
    getCircleFromPlayer,
  };
}

export default players();
