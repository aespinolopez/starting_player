import { Circle } from "./Circle";
import colors from "./Colors";

const TIME = 3000;

function playersFactory() {
  const players = {};
  let timeout = 0;

  addTouchableInterface();
  addMouseInterface();

  function register(id, circle) {
    players[id] = circle;
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
      createCircle(Array.from(e.changedTouches));
    });
    window.addEventListener("touchend", (e) => {
      deleteCircle(Array.from(e.changedTouches));
    });
    window.addEventListener("touchmove", (e) => {
      moveCircle(Array.from(e.changedTouches));
    });
    window.addEventListener("touchcancel", (e) => {
      deleteCircle(Array.from(e.changedTouches));
    });
  }

  function addMouseInterface() {
    window.addEventListener("mousedown", (e) => {
      createCircle(createTouchesFromMouseEvent(e));
    });
    window.addEventListener("mouseup", (e) => {
      deleteCircle(createTouchesFromMouseEvent(e));
    });
    window.addEventListener("mousemove", (e) => {
      moveCircle(createTouchesFromMouseEvent(e));
    });
  }

  return {
    register,
    unregister,
    getCircleFromPlayer,
  };
}

const players = playersFactory();

function createTouchesFromMouseEvent(e) {
  return [
    {
      identifier: "mouse",
      pageX: e.pageX,
      pageY: e.pageY,
    },
  ];
}

function createCircle(touches) {
  touches.forEach((touch) => {
    const circle = new Circle(touch.pageX, touch.pageY, colors.pick());
    players.register(touch.identifier, circle);
  });
}

function moveCircle(touches) {
  touches.forEach((touch) => {
    const circle = players.getCircleFromPlayer(touch.identifier);
    if (circle) {
      circle.x = touch.pageX;
      circle.y = touch.pageY;
    }
  });
}

function deleteCircle(touches) {
  touches.forEach((touch) => {
    const circle = players.unregister(touch.identifier);
    colors.remove(circle.color);
  });
}

export default players;
