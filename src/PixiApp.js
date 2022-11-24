import { lego } from "@armathai/lego";
import { WindowEvent } from "./events/MainEvents";
import { PixiGame } from "./PixiGame";

class PixiApp {
    #pixiGame;
    constructor() {
        //
    }

    get pixiGame() {
        return this.#pixiGame;
    }

    init() {
        this.#pixiGame = new PixiGame();
        this.#pixiGame.init();
    }

    onFocusChange(value) {
        lego.event.emit(WindowEvent.FocusChange, value);
    }

    onResize() {
        lego.event.emit(WindowEvent.Resize);
        const { clientWidth: width, clientHeight: height } = document.body;
        if (width === 0 || height === 0) return;
        this.#pixiGame.onResize({ width, height });
    }
}

const pixiApp = new PixiApp();

export default pixiApp;
