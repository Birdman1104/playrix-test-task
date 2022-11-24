import { GameState } from "../configs/Constants";
import { StairOptions, StairType } from "../configs/StairsOptionsConfig";
import { ObservableModel } from "./ObservableModel";
import { StairOptionModel } from "./StairOptionModel";
import { TutorialModel } from "./TutorialModel";

export class GameModel extends ObservableModel {
    _tutorial; // TutorialModel
    _state;
    _stairType; // StairType
    _options; // StairOptionModel[]

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

    get options() {
        return this._options;
    }

    set options(value) {
        this._options = value;
    }

    get state() {
        return this._state;
    }

    set state(value) {
        this._state = value;
    }

    get stairType() {
        return this._stairType;
    }

    set stairType(value) {
        this._stairType = value;
    }

    init() {
        this._stairType = StairType.Default;
        this._state = GameState.Unknown;
        this._options = [];
    }

    setStairType(type) {
        this._stairType = type;
        this._options.forEach((o) => {
            o.selected = type === o.type;
        });
    }

    initOptions() {
        this._options = StairOptions.map(({ name }) => new StairOptionModel(name));
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
