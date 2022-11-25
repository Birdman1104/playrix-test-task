import { GameModel } from "./GameModel";
import { HintModel } from "./HintModel";
import { ObservableModel } from "./ObservableModel";

class HeadModel extends ObservableModel {
    _gameModel; // GameModel;
    _hint; // HintModel;

    constructor() {
        super("HeadModel");
        this._gameModel = null;
        this._hint = null;
        this.makeObservable();
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
        //
    }

    destroyHint() {
        this._hint.destroy();
        this._hint = null;
    }

    initHint() {
        this._hint = new HintModel();
        this._hint.initialize();
    }

    initGameModel() {
        this._gameModel = new GameModel();
        this._gameModel.init();
    }
}

const Head = new HeadModel();

export default Head;
