import { Dispatch, SetStateAction } from "react";
export declare const useRouteFilters: (resourceNameToUse: string, operationName: string, presetFilters: any) => {
    components: any;
    filters: any;
    clearFilters: () => void;
};
interface FilterValueInterface {
    name: string;
    value: any;
    isOrder?: boolean;
}
export declare class FilterValue {
    name: string;
    value: any;
    isOrder: boolean;
    constructor({ name, value, isOrder }: FilterValueInterface);
}
export declare const useTableFilters: (resourceName: string, operationName: string, propLockedFilters?: FilterValue[]) => {
    filterValues: FilterValue[];
    components: any[];
    clearFilters: () => void;
    setFilterValues: Dispatch<SetStateAction<FilterValue[]>>;
};
export {};
