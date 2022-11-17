import { BoardState } from "../configs/Constants";
import { ObservableModel } from "./ObservableModel";

export class StairsModel extends ObservableModel {
    _state = BoardState.Unknown;
    constructor() {
        super("StairsModel");
        this.makeObservable();
    }

    get state() {
        return this._state;
    }

    set state(value) {
        this._state = value;
    }

    init() {
        this._state = BoardState.Game;
    }
}
