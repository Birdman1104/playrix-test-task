import { ObservableModel } from "./ObservableModel";

export class GameModel extends ObservableModel {
    _score = null;

    constructor() {
        super("GameModel");
        this.makeObservable();
    }

    get score() {
        return this._score;
    }

    set score(value) {
        this._score = value;
    }

    init() {
        this.score = 0;
    }
}
