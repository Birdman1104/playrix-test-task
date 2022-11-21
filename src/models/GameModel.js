import { BoardModel } from "./BoardModel";
import { ObservableModel } from "./ObservableModel";
import { TutorialModel } from "./TutorialModel";

export class GameModel extends ObservableModel {
    _tutorial; // TutorialModel
    _board; // BoardModel

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

    get board() {
        return this._board;
    }

    set board(value) {
        this._board = value;
    }

    init() {
        this.initBoard();
    }

    initBoard() {
        this._board = new BoardModel();
        this._board.init();
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
