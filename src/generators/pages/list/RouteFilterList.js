import {useGetResourceModel} from "../../../resource-models/modelsRegistry";
import {useCookies} from "react-cookie";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {useRouteFilters} from "../../filters/TableFilters";
import {useList} from "../../../redux/actions/verbs/list";
import {useDebouncedCallback} from "use-debounce";
import {Record} from "../../../resource-models/Record";
import {GenericList} from "../ListPageGenerator";
const table = [];

export function RouteFilterList({resourceName, filters:lockedFilters,  itemOperations = [], collectionOperations = []}) {
    const {operations} = useGetResourceModel(resourceName);
    const model = operations.getOperationModel("get");
    const title = model.title;
    const [cookies, setCookie] = useCookies([`list-${resourceName}`]);
    const [localTable, setLocalTable] = useState(cookies[`list-${resourceName}`] ?? table);
    const [localModel, setLocalModel] = useState(model);
    const [rows, setRows] = useState([])

    useEffect(()=>{setRows([])}, [resourceName])
    useEffect(()=>{setLocalModel(model)},[model]) //Change model
    useEffect(()=>{
        setLocalTable(cookies[`list-${resourceName}`] ?? table)
    },[table, resourceName, cookies]) //Change tables

    const propSetLocalTable = (value) => {
        setCookie(`list-${resourceName}`, value, {path: '/'});
        setLocalTable(value);
    }

    const allProperties = localModel.getAllPropertiesReadableNames();
    const tableWithStats = allProperties.map(tableElement => {
        return {
            ...tableElement,
            inColumn: localTable.some(localTableElement => localTableElement.id === tableElement.id)
        }
    })


    const headCells = useMemo(()=>{
        const localHeadcells = localTable.map(({id, label}) => {
            return {propertyModel: localModel.getProperty(id), tableItemName: {id: id, label: label}}
        }).map(({propertyModel, tableItemName: {id, label}}) => {
            return {id: id, numeric: false, disablePadding: false, label: label};
        })
        return localHeadcells;
    }, [localTable, localModel])


    const {filters, components, clearFilters} = useRouteFilters(resourceName,"get", lockedFilters);
    const {data, get, loading} = useList();
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);

    const debounced = useDebouncedCallback(
        () => get(resourceName, page + 1, filters),
        1000
    );

    useEffect(() => {
        debounced();
    }, [resourceName, filters, page])

    useEffect(()=>{
        setRows(data.list);
    },[data])

    const filterBarComponents = components.filter(component => !headCells.some(headCell => headCell.id === component.name))

    const showClearFilters = !!components.length;

    const getRowElement = (row, id, label, localModel, viewElement)=> {
        const record = Record.createFromJson(row, localModel);
        return localModel.getOutputField(id, {record:record, model:localModel}, viewElement, false);
    }

    const columns = useCallback((row) => localTable.map( ({id, label, viewElement}) => {
        return getRowElement(row, id, label, localModel, viewElement)
    }),[localModel, localTable])


    return <GenericList
        data={rows}
        totalItems={data.totalItems}
        getDataHandler={debounced}
        loading={loading}
        page={page}
        setPage={setPage}
        selected={selected}
        setSelected={setSelected}
        title={title}
        clearFilters={clearFilters}
        filterBarComponents={filterBarComponents}
        showClearFilters={showClearFilters}
        components={components}
        columns={columns}
        headCells={headCells}
        itemOperations={itemOperations}
        collectionOperations={collectionOperations}
        allColumns={tableWithStats}
        setTable={propSetLocalTable}
    />

}
