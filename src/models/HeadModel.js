import { GameModel } from "./GameModel";
import { HintModel } from "./HintModel";
import { ObservableModel } from "./ObservableModel";

class HeadModel extends ObservableModel {
    _gameModel; // GameModel;
    _hint; // HintModel;

    constructor() {
        super("Head");
        this.makeObservable();
        this._gameModel = null;
        this._hint = null;
    }

    set gameModel(value) {
        this._gameModel = value;
    }

    get gameModel() {
        return this._gameModel;
    }

    get hint() {
        return this._hint;
    }

    set hint(value) {
        this._hint = value;
    }

    init() {
        this.#initHint();
        this.#initGameModel();
    }

    destroyHint() {
        this._hint.destroy();
        this._hint = null;
    }

    #initHint() {
        this._hint = new HintModel();
        this._hint.initialize();
    }

    #initGameModel() {
        this._gameModel = new GameModel();
        this._gameModel.init();
    }
}

const Head = new HeadModel();

export default Head;
