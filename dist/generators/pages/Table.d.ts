import React, { Dispatch, SetStateAction } from "react";
import { OrderType } from "./TableHeader";
import { Row } from "./table/Row";
import { HeadCell } from "./table/HeadCell";
import { ItemOperation } from "./table/ItemOperation";
import { CollectionOperation } from "./table/CollectionOperation";
import { FilterComponent } from "../filters/FilterComponent";
import { FilterValue } from "../filters/TableFilters";
interface TableInterface {
    rows: Row[];
    totalItems: number;
    headCells: HeadCell[];
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    title: string;
    showClearFilters?: boolean;
    filterComponents?: FilterComponent[];
    itemOperations?: ItemOperation[];
    collectionOperations?: CollectionOperation[];
    clearFilters: () => void;
    getDataHandler: () => void;
    loading: boolean;
    columns: (row: Row) => any;
    order: OrderType;
    filterValues: FilterValue[];
    setFilterValues: Dispatch<SetStateAction<FilterValue[]>>;
}
export declare const Table: React.FC<TableInterface>;
export {};
