import { Filter } from "./Filter";
import { Model } from "../../resource-models/Model";
import { FilterValue } from "./TableFilters";
import { Dispatch, SetStateAction } from "react";
interface GetFilterComponentInterface {
    model: Model;
    filterValues: FilterValue[];
    filters: Filter[];
    setFilterValues: Dispatch<SetStateAction<FilterValue[]>>;
}
export declare function getFilterComponents({ model, filters, filterValues, setFilterValues }: GetFilterComponentInterface): any[];
export {};
