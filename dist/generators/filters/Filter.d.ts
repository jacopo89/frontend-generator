import { InputType } from "../../resource-models/PropertyModel";
export declare type FilterType = InputType | "order";
interface FilterInterface {
    type: FilterType;
    name: string;
}
export declare class Filter {
    type: FilterType;
    name: string;
    constructor({ type, name }: FilterInterface);
}
export {};
