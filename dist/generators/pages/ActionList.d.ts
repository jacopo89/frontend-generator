import { FilterValue } from "../filters/TableFilters";
import { ItemOperation } from "./table/ItemOperation";
import React from "react";
import TableItem from "../../resource-models/configurations/TableItem";
interface ListInterface {
    resourceName: string;
    actionName: string;
    lockedFilters?: FilterValue[];
    itemOperations?: ItemOperation[];
    collectionOperations?: ItemOperation[];
    table?: TableItem[];
}
export declare const ActionList: React.FC<ListInterface>;
export {};
