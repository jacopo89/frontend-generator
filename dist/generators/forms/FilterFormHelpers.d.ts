import { FilterType } from "../filters/Filter";
import { FilterValue } from "../filters/TableFilters";
import { Dispatch, SetStateAction } from "react";
export declare function onFilterChange(type: FilterType, setFilterValues: Dispatch<SetStateAction<FilterValue[]>>, filterValues: FilterValue[], vars: any[]): void;
