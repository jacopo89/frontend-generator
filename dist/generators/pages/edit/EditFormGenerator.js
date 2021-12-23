import { jsx as _jsx } from "react/jsx-runtime";
import { ItemActionGenerator } from "../ItemActionGenerator";
/**
 *
 * @param record
 * @param setRecord
 * @param propId
 * @param propResourceName
 * @param propEditPage
 * @param refresh
 * @param isEdit
 * @constructor
 *
 * This function returns a react component with the edit form. This component is not responsible for fetching previous data.
 */
export const EditForm = ({ record, setRecord, propId, propResourceName, propEditPage, refresh }) => {
    return _jsx(ItemActionGenerator, { setRecord: setRecord, propResourceName: propResourceName, propId: propId, propActionName: "patch", record: record, refresh: refresh, propEditPage: propEditPage }, void 0);
};
