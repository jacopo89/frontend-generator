import { FilterValue } from "../filters/TableFilters";
import { ItemOperation } from "./table/ItemOperation";
import React from "react";
interface ListInterface {
    resourceName: string;
    actionName: string;
    lockedFilters?: FilterValue[];
    itemOperations?: ItemOperation[];
    collectionOperations?: ItemOperation[];
}
export declare const ActionList: React.FC<ListInterface>;
export {};
