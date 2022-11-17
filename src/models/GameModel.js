import { ObservableModel } from "./ObservableModel";

export class GameModel extends ObservableModel {
    _score = null;
    _lives = null;

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

    get lives() {
        return this._score;
    }

    set lives(value) {
        this._lives = value;
    }

    init() {
        this.score = 0;
        this.lives = 0;
    }
}
