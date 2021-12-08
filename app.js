import "./assets/styles.css";
import players from "./src/players";

const IDLE_TIME = 2000;
const explanationEl = document.getElementById("app-explanation");
let timeout = 0;

window.addEventListener("touchstart", (e) => {
  clearTimeout(timeout);
  showExplanation(false);
});
window.addEventListener("touchend", (e) => {
  if (e.touches.length === 0) {
    clearTimeout(timeout);
    timeout = setTimeout(() => showExplanation(true), IDLE_TIME);
  }
});
window.addEventListener("touchcancel", (e) => {
  if (e.touches.length === 0) {
    clearTimeout(timeout);
    timeout = setTimeout(() => showExplanation(true), IDLE_TIME);
  }
});
window.addEventListener("mousedown", (e) => {
  clearTimeout(timeout);
  showExplanation(false);
});
window.addEventListener("mouseup", (e) => {
  clearTimeout(timeout);
  timeout = setTimeout(() => showExplanation(true), IDLE_TIME);
});

function showExplanation(show) {
  explanationEl.style.display = show ? "flex" : "none";
}
