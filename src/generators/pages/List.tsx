import React from "react";
import {ItemOperation} from "./table/ItemOperation";
import {FilterValue} from "../filters/TableFilters";
import {ActionList} from "./ActionList";

interface ListInterface {
    resourceName: string;
    lockedFilters?: FilterValue[];
    itemOperations?: ItemOperation[],
    collectionOperations?: ItemOperation[],
}

export const List: React.FC<ListInterface> = ({resourceName,lockedFilters=[],  itemOperations = [], collectionOperations = []})=>{

   return <ActionList actionName={"get"} resourceName={resourceName} collectionOperations={collectionOperations} itemOperations={itemOperations} lockedFilters={lockedFilters}/>

}
