import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useGetResourceModel } from "../../resource-models/modelsRegistry";
import { HeadCell } from "./table/HeadCell";
import { useDebouncedCallback } from "use-debounce";
import { useCollectionOperation } from "../../redux/actions/verbs/operation";
import { useTableFilters } from "../filters/TableFilters";
import { Record } from "../../resource-models/Record";
import { Table } from "./Table";
import { PropertyFieldConfiguration } from "../../resource-models/configurations/PropertyFieldConfiguration";
export const List = ({ resourceName, lockedFilters = [], itemOperations = [], collectionOperations = [] }) => {
    const { operations, title, table } = useGetResourceModel(resourceName);
    const operation = operations.findCollectionOperationByName("get");
    const model = operations.getCollectionOperationModel("get");
    const [rows, setRows] = useState([]);
    const headCells = useMemo(() => {
        return table.map(({ id, label }) => {
            return { propertyModel: model.getProperty(id), tableItemName: { id: id, label: label } };
        }).map(({ propertyModel, tableItemName: { id, label } }) => {
            return new HeadCell({ id, label });
        });
    }, [model]);
    // @ts-ignore
    const { data, action, loading } = useCollectionOperation(resourceName, operation);
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const { filterValues, components, clearFilters, setFilterValues } = useTableFilters(resourceName, "get", lockedFilters);
    useEffect(() => { console.log("filtervalues", filterValues); }, [filterValues]);
    const debounced = useDebouncedCallback(() => action(page + 1, filterValues), 1000);
    useEffect(() => {
        debounced();
    }, [resourceName, filterValues, page]);
    useEffect(() => {
        setRows(data.list);
    }, [data]);
    useEffect(() => { setRows([]); }, [resourceName]);
    const getRowElement = (row, id, label, model) => {
        const record = Record.createFromJson(row, model);
        const propertyModel = model.getProperty(id);
        propertyModel.label = label;
        const configuration = new PropertyFieldConfiguration({ showLabel: false });
        return propertyModel.getOutputField({ model: propertyModel, record: record.getPropertyRecord(id) }, configuration);
    };
    const columns = useCallback((row) => table.map(({ id, label }) => {
        return getRowElement(row, id, label, model);
    }), [model, table]);
    return _jsx(Table, { filterValues: filterValues, setFilterValues: setFilterValues, filterComponents: components, rows: rows, totalItems: data.totalItems, headCells: headCells, page: page, setPage: setPage, title: title, clearFilters: clearFilters, getDataHandler: debounced, loading: loading, columns: columns, order: "asc", orderBy: "id" }, void 0);
};
