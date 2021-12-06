import { jsx as _jsx } from "react/jsx-runtime";
import { ActionList } from "./ActionList";
export const List = ({ resourceName, lockedFilters = [], itemOperations = [], collectionOperations = [], table = [] }) => {
    return _jsx(ActionList, { table: table, actionName: "get", resourceName: resourceName, collectionOperations: collectionOperations, itemOperations: itemOperations, lockedFilters: lockedFilters }, void 0);
};
