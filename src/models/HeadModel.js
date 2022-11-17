import { GameModel } from "./GameModel";
import { ObservableModel } from "./ObservableModel";

class HeadModel extends ObservableModel {
    _gameModel;

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
        this.gameModel = new GameModel();
        this.gameModel.init();
    }
}

const Head = new HeadModel();

export default Head;
