import { ObservableModel } from "./ObservableModel";
import { TutorialModel } from "./TutorialModel";

export class GameModel extends ObservableModel {
    _tutorial;

    constructor() {
        super("GameModel");
        this.makeObservable();
    }

    get tutorial() {
        return this._tutorial;
    }

    set tutorial(value) {
        this._tutorial = value;
    }

    init() {
        //
    }

    initTutorial() {
        this._tutorial = new TutorialModel();
        this._tutorial.init();
    }

    destroyTutorial() {
        this._tutorial.destroy();
        this._tutorial = null;
    }
}
