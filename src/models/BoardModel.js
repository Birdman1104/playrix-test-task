import { StairOptions, StairType } from "../configs/StairsOptionsConfig";
import { ObservableModel } from "./ObservableModel";
import { StairOptionModel } from "./StairOptionModel";

export class BoardModel extends ObservableModel {
    _stairType; // StairType
    _options; // StairOptionModel[]

    constructor() {
        super("BoardModel");
        this.makeObservable();
    }

    get options() {
        return this._options;
    }

    set options(value) {
        this._options = value;
    }

    get stairType() {
        return this._stairType;
    }

    set stairType(value) {
        this._stairType = value;
    }

    init() {
        this._stairType = StairType.Default;
        this._options = [];
        this.#initOptions();
    }

    setStairType(type) {
        this._stairType = type;
        this._options.forEach((o) => {
            o.selected = type === o.type;
        });
    }

    #initOptions() {
        this._options = StairOptions.map(({ name }) => new StairOptionModel(name));
    }
}
