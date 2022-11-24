import { delayRunnable, removeRunnable } from "../Utils";
import { ObservableModel } from "./ObservableModel";

const hintDelay = 2; // seconds
export class HintModel extends ObservableModel {
    _visible = false;

    constructor() {
        super("HintModel");
        this.makeObservable();
    }

    get visible() {
        return this._visible;
    }

    set visible(value) {
        this._visible = value;
        this.stopVisibilityTimer();
    }

    get timerAlreadyStarted() {
        return this._visibilityTimer;
    }

    stopVisibilityTimer() {
        removeRunnable(this._visibilityTimer);
        this._visibilityTimer = null;
    }

    startVisibilityTimer() {
        this._visibilityTimer = delayRunnable(hintDelay, () => {
            this._visible = true;
        });
    }

    destroy() {
        this.stopVisibilityTimer();
    }

    init() {
        //
    }
}
