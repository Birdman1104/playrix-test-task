import { lego } from "@armathai/lego";
import { WindowEvent } from "./events/MainEvents";
import { MainGame } from "./MainGame";

class MainApp {
    #mainGame;
    constructor() {
        //
    }

    init() {
        this.#mainGame = new MainGame();
        this.#mainGame.init();
    }

    onFocusChange(value) {
        lego.event.emit(WindowEvent.FocusChange, value);
    }

    onResize() {
        lego.event.emit(WindowEvent.Resize);
        const { clientWidth: width, clientHeight: height } = document.body;
        if (width === 0 || height === 0) return;
        this.#mainGame.onResize({ width, height });
    }
}

export const PixiGame = new MainApp();
