import React from "react";
import { ItemOperation } from "./table/ItemOperation";
import { FilterValue } from "../filters/TableFilters";
import TableItem from "../../resource-models/configurations/TableItem";
interface ListInterface {
    resourceName: string;
    lockedFilters?: FilterValue[];
    itemOperations?: ItemOperation[];
    collectionOperations?: ItemOperation[];
    table?: TableItem[];
}
export declare const List: React.FC<ListInterface>;
export {};
