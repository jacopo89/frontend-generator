import React from "react";
import { CollectionOperation } from "./table/CollectionOperation";
import { FilterComponent } from "../filters/FilterComponent";
interface ToolbarPropsInterface {
    title?: string;
    showClearFilters?: boolean;
    clearFilters?: () => {};
    filterComponents?: FilterComponent[];
    collectionOperations?: CollectionOperation[];
    selectedIds: number[];
    getDataHandler: () => void;
}
export declare const TableToolbar: React.FC<ToolbarPropsInterface>;
export {};
