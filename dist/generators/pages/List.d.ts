import React from "react";
import { ItemOperation } from "./table/ItemOperation";
import { FilterValue } from "../filters/TableFilters";
interface ListInterface {
    resourceName: string;
    lockedFilters?: FilterValue[];
    itemOperations?: ItemOperation[];
    collectionOperations?: ItemOperation[];
}
export declare const List: React.FC<ListInterface>;
export {};
