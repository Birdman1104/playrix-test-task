import { BoardState } from "../configs/Constants";
import { StairType } from "../configs/StairsOptionsConfig";
import { ObservableModel } from "./ObservableModel";
import { StairsModel } from "./StairsModel";

export class BoardModel extends ObservableModel {
    _state = BoardState.Unknown;
    _stairs = null;

    constructor() {
        super("BoardModel");
        this.makeObservable();
    }

    get state() {
        return this._state;
    }

    set state(value) {
        this._state = value;
    }

    get stairs() {
        return this._stairs;
    }

    set stairs(value) {
        this._stairs = value;
    }

    init() {
        this._state = BoardState.Game;
        this._stairs = StairType.Default;
        console.warn(78);
    }

    initStairs() {
        this._stairs = new StairsModel();
        this._stairs.init();
    }
}
