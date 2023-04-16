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
    const winnerIndex = Math.floor(Math.random() * playerIds.length);
    const winner = playerIds[winnerIndex];

    Object.entries(players)
      .filter(([player]) => {
        return String(player) !== String(winner);
      })
      .forEach(([player, circle]) => {
        circle.looser();
      });
  }

  function getCircleFromPlayer(id) {
    return players[id];
  }

  function addTouchableInterface() {
    window.addEventListener("touchstart", (e) => {
      e.preventDefault();
      createCircle(Array.from(e.changedTouches));
    });
    window.addEventListener("touchend", (e) => {
      e.preventDefault();
      deleteCircle(Array.from(e.changedTouches));
    });
    window.addEventListener("touchmove", (e) => {
      e.preventDefault();
      moveCircle(Array.from(e.changedTouches));
    });
    window.addEventListener("touchcancel", (e) => {
      e.preventDefault();
      deleteCircle(Array.from(e.changedTouches));
    });
  }

  function addMouseInterface() {
    window.addEventListener("mousedown", (e) => {
      e.preventDefault();
      createCircle(createTouchesFromMouseEvent(e));
    });
    window.addEventListener("mouseup", (e) => {
      e.preventDefault();
      deleteCircle(createTouchesFromMouseEvent(e));
    });
    window.addEventListener("mousemove", (e) => {
      e.preventDefault();
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
