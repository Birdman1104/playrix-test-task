import { ObservableModel } from "./ObservableModel";

export class GameModel extends ObservableModel {
    constructor() {
        super("GameModel");
        this.makeObservable();
    }

    init() {
        //
    }
}
