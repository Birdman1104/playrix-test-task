import { ObservableModel } from "./ObservableModel";

export class StairOptionModel extends ObservableModel {
    _selected; //boolean
    _type; // StairType

    constructor(type) {
        super("StairOptionModel");
        this._type = type;
        this.makeObservable();
    }

    get type() {
        return this._type;
    }

    get selected() {
        return this._selected;
    }

    set selected(value) {
        this._selected = value;
    }

    init() {
        this._selected = false;
    }
}
