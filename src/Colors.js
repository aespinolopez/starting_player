function colors() {
  const colors = ["green", "red", "blue", "purple", "pink", "black"];
  const pickedColors = new Set();

  function randomInt() {
    return Math.round(Math.random() * colors.length);
  }

  function pick() {
    let chosen = colors[randomInt()];
    while (pickedColors.has(chosen)) {
      chosen = colors[randomInt()];
    }
    pickedColors.add(chosen);

    return chosen;
  }

  function remove(color) {
    pickedColors.delete(color);
  }

  return {
    pick,
    remove,
  };
}

export default colors();
