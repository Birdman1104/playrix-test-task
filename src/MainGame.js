import { lego, legoLogger } from "@armathai/lego";
import * as PIXI from "pixi.js";
import { ScreenSizeConfig } from "./configs/ScreenSizeConfig";
import { MainGameEvents } from "./events/MainEvents";
import { fitDimension } from "./Utils";

export class MainGame extends PIXI.Application {
  constructor() {
    super({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0xc3c3c3,
      powerPreference: "high-performance",
      resolution: 1,
      sharedTicker: true,
    });
  }

  init() {
    document.body.appendChild(this.view);
    this.#initLego();
  }

  onResize(size) {
    const { min, max } = ScreenSizeConfig.size.ratio;
    const { width, height } = fitDimension(size, min, max);

    this.#resizeCanvas(width, height);
    this.#resizeRenderer(width, height);

    lego.event.emit(MainGameEvents.Resize, this.viewBounds, this.viewScale);
  }

  #initLego() {
    legoLogger.start(lego, Object.freeze({}));
  }

  #resizeCanvas(width, height) {
    const { style } = this.renderer.view;
    style.width = `${width}px`;
    style.height = `${height}px`;
  }

  #resizeRenderer(width, height) {
    this.renderer.resize(width, height);
  }
}
