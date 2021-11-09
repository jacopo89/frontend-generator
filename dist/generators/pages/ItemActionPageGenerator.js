import { jsx as _jsx } from "react/jsx-runtime";
import { useResource } from "../hooks/resourceUtils";
import { ItemActionGenerator } from "./ItemActionGenerator";
/**
 * This component is entitled to create a form and populate it with data
 * @param resourceName Resource that we get from the model
 * @param propId which id
 * @param propEditPage custom page
 * @param isEdit
 * @constructor
 */
export const ItemActionPage = ({ propResourceName: resourceName, propActionName, propId, propEditPage, isEdit = true }) => {
    const { record, getNewResource } = useResource(resourceName, propId);
    return _jsx(ItemActionGenerator, { isEdit: isEdit, propResourceName: resourceName, propId: propId, record: record, refresh: getNewResource, propEditPage: propEditPage, propActionName: propActionName }, void 0);
};
