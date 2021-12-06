import React from "react";
import {ItemOperation} from "./table/ItemOperation";
import {FilterValue} from "../filters/TableFilters";
import {ActionList} from "./ActionList";
import TableItem from "../../resource-models/configurations/TableItem";

interface ListInterface {
    resourceName: string;
    lockedFilters?: FilterValue[];
    itemOperations?: ItemOperation[],
    collectionOperations?: ItemOperation[],
    table?: TableItem[]
}

export const List: React.FC<ListInterface> = ({resourceName,lockedFilters=[],  itemOperations = [], collectionOperations = [], table=[]})=>{

   return <ActionList table={table} actionName={"get"} resourceName={resourceName} collectionOperations={collectionOperations} itemOperations={itemOperations} lockedFilters={lockedFilters}/>

}
