import React from "react";
import {EditForm} from "./edit/EditFormGenerator";
import {useResource} from "../hooks/resourceUtils";
import {Record} from "../../resource-models/Record";
import {ItemActionGenerator} from "./ItemActionGenerator";

interface Props{
    propResourceName:string,
    propActionName:string,
    propId:number,
    propEditPage?:any,
    isEdit?: boolean,

}

/**
 * This component is entitled to create a form and populate it with data
 * @param resourceName Resource that we get from the model
 * @param propId which id
 * @param propEditPage custom page
 * @param isEdit
 * @constructor
 */
export const ItemActionPage: React.FC<Props> = ({propResourceName:resourceName,propActionName, propId, propEditPage, isEdit=true}) => {

    const {record, getNewResource} = useResource(resourceName, propId);
    return <ItemActionGenerator isEdit={isEdit}  propResourceName={resourceName} propId={propId} record={record} refresh={getNewResource} propEditPage={propEditPage} propActionName={propActionName}/>
}

