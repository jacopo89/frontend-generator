import {useCallback, useEffect, useRef, useState} from "react";
import {useList} from "../../redux/actions/verbs/list";
import {useOperation} from "../../redux/actions/verbs/operation";
import {Operation} from "../../resource-models/actions/Operation";
import {Record} from "../../resource-models/Record";

export function useResource(resourceName:string, propId:number, operation: Operation){
    const {data:responseRecord, action} = useOperation(resourceName, operation);
    // @ts-ignore
    const [record, setRecord] = useState<Record>(Record.createFromJsonNoModel(responseRecord?.object));

    const getResource = useCallback(()=>action(propId),[resourceName,propId]);
    useEffect(()=> {
        getResource()
    },[resourceName, getResource])

    useEffect(()=>{
        // @ts-ignore
        setRecord(Record.createFromJson(responseRecord?.object, operation.model))
    },[responseRecord])
    return {record, setRecord, getResource};
}

export function useResources(resourceName:string){
    const initialValue = useRef({});
    const [record, setRecord] = useState(initialValue.current);
    const {data:downloadedRecord, get} = useList();
    const getResource = useCallback(()=>get(resourceName),[resourceName]);
    useEffect(()=> {
        getResource()
    },[])

    useEffect(()=>{
        if(downloadedRecord!==undefined){
            // @ts-ignore
            setRecord(downloadedRecord)
        }
    },[downloadedRecord])
    return {record, setRecord};
}
