import React, { Dispatch, SetStateAction } from "react";
import { Row } from "./table/Row";
import { HeadCell } from "./table/HeadCell";
import { FilterComponent } from "../filters/FilterComponent";
import { FilterValue } from "../filters/TableFilters";
export declare type OrderType = 'asc' | 'desc';
interface TableHeadInterface {
    selectedIds: number[];
    rows: Row[];
    selectAllHandler: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
    headCells: HeadCell[];
    filterComponents?: FilterComponent[];
    filterValues?: FilterValue[];
    setFilterValues: Dispatch<SetStateAction<FilterValue[]>>;
    order: OrderType;
}
export declare const TableHeader: React.FC<TableHeadInterface>;
export {};
