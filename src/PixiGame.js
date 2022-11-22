import { lego, legoLogger } from "@armathai/lego";
import { PixiStatsPlugin } from "@armathai/pixi-stats";
import * as PIXI from "pixi.js";
import { assets } from "./assets/assets-names/assets";
import { images } from "./assets/assets-names/images";
import { mapCommands } from "./commands/EventCommandPairs";
import { ScreenSizeConfig } from "./configs/ScreenSizeConfig";
import { MainGameEvents } from "./events/MainEvents";
import { fitDimension } from "./Utils";
import { MainView } from "./views/MainView";

export class PixiGame extends PIXI.Application {
    #mainView; // MainView

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

        this.#initStats();
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
        // TODO Choose a better logic
        assets.forEach(({ assetName, url }) => {
            this.loader.add({ name: assetName, url });
        });
        images.forEach((img) => {
            this.loader.add({ name: img, url: "assets/images/main/" + img });
        });
        this.loader.onComplete.add(this.#onLoadComplete, this);
        this.loader.onProgress.add(this.#onLoadProgress, this);
        this.loader.onError.add(this.#onLoadError, this);

        this.loader.load();
    }

    #onLoadComplete() {
        lego.command.execute(mapCommands);
        this.#mainView = new MainView();
        this.stage.addChild(this.#mainView);
        lego.event.emit(MainGameEvents.MainViewReady);
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

    #initStats() {
        if (process.env.NODE_ENV !== "production") {
            const stats = new PixiStatsPlugin(this);
            document.body.appendChild(stats.stats.dom);
            stats.stats.dom.childNodes.forEach((e) => {
                e.style.width = "250px";
                e.style.height = "150px";
            });
            this.ticker.add(() => {
                stats.stats.update();
            });
        }
    }
}
