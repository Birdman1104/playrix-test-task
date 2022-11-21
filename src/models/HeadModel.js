import { GameModel } from "./GameModel";
import { ObservableModel } from "./ObservableModel";

class HeadModel extends ObservableModel {
    _gameModel; // GameModel;

    constructor() {
        super("Head");
        this.makeObservable();
        this._gameModel = null;
    }

    set gameModel(value) {
        this._gameModel = value;
    }

    get gameModel() {
        return this._gameModel;
    }

    init() {
        this.#initGameModel();
    }

    #initGameModel() {
        this._gameModel = new GameModel();
        this._gameModel.init();
    }
}

const Head = new HeadModel();

export default Head;
