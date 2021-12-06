import {FilterValue, useTableFilters} from "../filters/TableFilters";
import {ItemOperation} from "./table/ItemOperation";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {useGetResourceModel} from "../../resource-models/modelsRegistry";
import {Row} from "./table/Row";
import {HeadCell} from "./table/HeadCell";
import {useOperation} from "../../redux/actions/verbs/operation";
import {useDebouncedCallback} from "use-debounce";
import {Model} from "../../resource-models/Model";
import {Record} from "../../resource-models/Record";
import {PropertyFieldConfiguration} from "../../resource-models/configurations/PropertyFieldConfiguration";
import {Table} from "./Table";
import {CollectionResponse} from "../../redux/actions/verbs/CollectionResponse";
import TableItem from "../../resource-models/configurations/TableItem";

interface ListInterface {
    resourceName: string;
    actionName:string;
    lockedFilters?: FilterValue[];
    itemOperations?: ItemOperation[],
    collectionOperations?: ItemOperation[],
    table?: TableItem[]
}

export const ActionList: React.FC<ListInterface> = ({resourceName,actionName,lockedFilters=[],  itemOperations = [], collectionOperations = [],table = []})=>{
    const {operations,title} = useGetResourceModel(resourceName);
    const operation = operations.findListOperationByName(actionName);
    const model = operations.getListOperationModel(actionName, operation.resource);
    const [rows, setRows]= useState<Row[]>([]);

    const headCells: HeadCell[] = useMemo(()=>{

        return table.map(({id, label}) => {
            return {propertyModel: model.getProperty(id), tableItemName: {id: id, label: label}}
        }).map(({propertyModel, tableItemName: {id, label}}) => {
            return new HeadCell({id, label});
        });
    }, [ model])


    const {data, action,loading} = useOperation(resourceName, operation);

    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const {filterValues, components, clearFilters, setFilterValues} = useTableFilters(resourceName,actionName,  lockedFilters);



    const debounced = useDebouncedCallback(
        () => action(page + 1, filterValues),
        1000
    );

    useEffect(() => {
        debounced();
    }, [resourceName, filterValues, page])

    useEffect(()=>{
        if (data instanceof CollectionResponse) {
            setRows(data.list);
        }
    },[data])

    useEffect(()=>{setRows([])}, [resourceName])

    const getRowElement = (row:Row, id:string, label:string, model:Model)=> {
        const record = Record.createFromJson(row, model);
        const propertyModel = model.getProperty(id);
        propertyModel.label = label;

        const configuration = new PropertyFieldConfiguration({showLabel:false});
        return propertyModel.getOutputField({model:propertyModel, record: record.getPropertyRecord(id)}, configuration)
    }

    const columns = useCallback((row) => table.map( ({id, label}) => {
        return getRowElement(row, id, label, model)
    }),[model, table])

    return <Table filterValues={filterValues} setFilterValues={setFilterValues} filterComponents={components} rows={rows} totalItems={data instanceof CollectionResponse ? data.totalItems : 0} headCells={headCells} page={page} setPage={setPage} title={title} clearFilters={clearFilters} getDataHandler={debounced} loading={loading} columns={columns} order={"asc"}/>
}
