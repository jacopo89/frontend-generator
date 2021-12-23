import { useCallback, useEffect, useRef, useState } from "react";
import { useList } from "../../redux/actions/verbs/list";
import { useOperation } from "../../redux/actions/verbs/operation";
import { Record } from "../../resource-models/Record";
export function useResource(resourceName, propId, operation) {
    const { data: responseRecord, action } = useOperation(resourceName, operation);
    // @ts-ignore
    const [record, setRecord] = useState(Record.createFromJsonNoModel(responseRecord === null || responseRecord === void 0 ? void 0 : responseRecord.object));
    const getResource = useCallback(() => action(propId), [resourceName, propId]);
    useEffect(() => {
        getResource();
    }, [resourceName, getResource]);
    useEffect(() => {
        // @ts-ignore
        setRecord(Record.createFromJson(responseRecord === null || responseRecord === void 0 ? void 0 : responseRecord.object, operation.model));
    }, [responseRecord]);
    return { record, setRecord, getResource };
}
export function useResources(resourceName) {
    const initialValue = useRef({});
    const [record, setRecord] = useState(initialValue.current);
    const { data: downloadedRecord, get } = useList();
    const getResource = useCallback(() => get(resourceName), [resourceName]);
    useEffect(() => {
        getResource();
    }, []);
    useEffect(() => {
        if (downloadedRecord !== undefined) {
            // @ts-ignore
            setRecord(downloadedRecord);
        }
    }, [downloadedRecord]);
    return { record, setRecord };
}
