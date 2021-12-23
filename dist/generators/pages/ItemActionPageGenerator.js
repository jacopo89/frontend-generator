import { jsx as _jsx } from "react/jsx-runtime";
import { useResource } from "../hooks/resourceUtils";
import { ItemActionGenerator } from "./ItemActionGenerator";
import { useGetResourceModel } from "../../resource-models/modelsRegistry";
/**
 * This component is entitled to create a form and populate it with data
 * @param resourceName Resource that we get from the model
 * @param propId which id
 * @param propEditPage custom page
 * @param isEdit
 * @constructor
 */
export const ItemActionPage = ({ propResourceName: resourceName, propActionName, propId, propEditPage }) => {
    const { operations } = useGetResourceModel(resourceName);
    const operation = operations.findItemOperationByName("get");
    const { record, setRecord, getResource } = useResource(resourceName, propId, operation);
    return _jsx(ItemActionGenerator, { propResourceName: resourceName, propId: propId, record: record, setRecord: setRecord, refresh: getResource, propEditPage: propEditPage, propActionName: propActionName }, void 0);
};
