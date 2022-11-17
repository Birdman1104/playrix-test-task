import { ObservableModel } from "./ObservableModel";

export class TutorialModel extends ObservableModel {
    constructor() {
        super("TutorialModel");
        this.makeObservable();
    }

    init() {
        //
    }
}
