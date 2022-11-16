import { PixiGame } from "./MainApp";

window.pixiGame = PixiGame;
window.addEventListener("load", () => {
  pixiGame.init();
});

window.addEventListener("resize", () => pixiGame.onResize());
window.addEventListener("orientationchange", () => pixiGame.onResize());
window.addEventListener("focus", () => pixiGame.onFocusChange(true));
window.addEventListener("blur", () => pixiGame.onFocusChange(false));
