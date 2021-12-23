import React from "react";
import {EditForm} from "./edit/EditFormGenerator";
import {useGetResourceContext} from "./utils/useGetResourceContext";

interface Props{
    propResourceName:string,
    propId:number,
    propEditPage?:any,
}

/**
 * This component is entitled to create a form and populate it with data
 * @param resourceName Resource that we get from the model
 * @param propId which id
 * @param propEditPage custom page
 * @param isEdit
 * @constructor
 */
export const EditPage: React.FC<Props> = ({propResourceName, propId, propEditPage}) => {
    const {record, setRecord, getResource} = useGetResourceContext({propResourceName, propId});
    // @ts-ignore
    return <EditForm propResourceName={propResourceName} propId={propId} record={record} setRecord={setRecord} refresh={getResource} propEditPage={propEditPage}/>
}
