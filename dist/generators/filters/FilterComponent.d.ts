import { ReactElement } from "react";
import { FilterType } from "./Filter";
interface FilterComponentInterface {
    type: FilterType;
    name: string;
    isOrder?: boolean;
    component?: ReactElement<any, any>;
}
export declare class FilterComponent {
    type: FilterType;
    name: string;
    isOrder: boolean;
    component?: ReactElement<any, any>;
    constructor({ type, name, component, isOrder }: FilterComponentInterface);
}
export {};
