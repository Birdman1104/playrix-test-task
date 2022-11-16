import { lego, legoLogger } from "@armathai/lego";
import { PixiStatsPlugin } from "@armathai/pixi-stats";
import * as PIXI from "pixi.js";
import { ScreenSizeConfig } from "./configs/ScreenSizeConfig";
import { MainGameEvents } from "./events/MainEvents";
import { MainView } from "./MainView";
import { fitDimension } from "./Utils";

export class MainGame extends PIXI.Application {
    #mainView;
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

        if (process.env.NODE_ENV !== "production") {
            const stats = new PixiStatsPlugin(this);
            console.warn(stats);
            document.body.appendChild(stats.stats.dom);
            stats.stats.dom.childNodes.forEach((e) => {
                e.style.width = "250px";
                e.style.height = "150px";
            });
            this.ticker.add(() => {
                stats.stats.update();
            });
        }
        this.#initLego();
        this.#loadAssets();
    }

    onResize(size) {
        const { min, max } = ScreenSizeConfig.size.ratio;
        const { width, height } = fitDimension(size, min, max);

        this.#resizeCanvas(width, height);
        this.#resizeRenderer(width, height);

        lego.event.emit(MainGameEvents.Resize);
    }

    #initLego() {
        legoLogger.start(lego, Object.freeze({}));
    }

    #loadAssets() {
        this.loader.add([
            { name: "arrow", url: "./assets/arrow.png" },
            { name: "ball", url: "./assets/bball.png" },
        ]);

        this.loader.onComplete.add(this.#onLoadComplete, this);
        this.loader.onProgress.add(this.#onLoadProgress, this);
        this.loader.onError.add(this.#onLoadError, this);

        this.loader.load();
    }

    #onLoadComplete() {
        this.#mainView = new MainView();
        this.stage.addChild(this.#mainView);
    }

    #onLoadProgress(loader, resource) {
        console.log(`progress  |  ${loader.progress} | ${resource.name}`);
    }

    #onLoadError(error, _loader, _resource) {
        throw new Error(error);
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
