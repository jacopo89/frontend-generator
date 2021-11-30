import React, {Dispatch, SetStateAction, useState} from "react";
import {Checkbox, Paper, TableBody, TableCell, TableContainer, TablePagination, TableRow} from "@material-ui/core";
import {TableToolbar} from "./TableToolbar";
import {OrderType, TableHeader} from "./TableHeader";
import {Row} from "./table/Row";

import { Table as MTable } from "@material-ui/core";
import {HeadCell} from "./table/HeadCell";
import {Skeleton} from "@material-ui/lab";
import ButtonsHorizontalList from "../../rendering/components/buttons/ButtonsHorizontalList";
import OperationButton from "../../rendering/components/buttons/OperationButton";
import {ItemOperation} from "./table/ItemOperation";
import {CollectionOperation} from "./table/CollectionOperation";
import {FilterComponent} from "../filters/FilterComponent";
import {FilterValue} from "../filters/TableFilters";


interface TableInterface {
    rows: Row[],
    totalItems: number,
    headCells:HeadCell[],
    page: number,
    setPage: React.Dispatch<React.SetStateAction<number>>,
    title:string,
    showClearFilters?: boolean,
    filterComponents?: FilterComponent[]
    itemOperations?: ItemOperation[],
    collectionOperations?: CollectionOperation[],
    clearFilters:  () => void,
    getDataHandler:  () => void,
    loading: boolean,
    columns: (row:Row) => any,
    order: OrderType,
    orderBy: string,
    filterValues:FilterValue[],
    setFilterValues:  Dispatch<SetStateAction<FilterValue[]>>

}


function getRandomInt(min:number, max:number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Il max è escluso e il min è incluso
}

function randomArray(){
    return new Array(getRandomInt(3,7)).fill(1);
}


export const Table: React.FC<TableInterface> = ({rows, totalItems, loading, page, setPage, filterComponents = [], filterValues=[], setFilterValues, title, clearFilters, showClearFilters, itemOperations = [], collectionOperations = [], headCells, columns, getDataHandler, order})=> {
    headCells = (itemOperations.length!==0) ?  headCells.concat({id:"actions", label:"Actions"}) : headCells
    //get Data as a first step.

    const [rowsPerPage, setRowsPerPage] = React.useState(30);

    const [selectedIds, setSelectedIds] = useState<number[]>([]);


    const selectAllHandler = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        if (event.target.checked) {
            const newSelectedIds = rows.map((n:Row) => n.id);
            setSelectedIds(newSelectedIds.map((id:number) => id));
            return;
        }
        setSelectedIds([]);
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>, id:number) => {
        const selectedIndex = selectedIds.indexOf(id);
        let newSelectedIds: number[] = [];

        if (selectedIndex === -1) {
            newSelectedIds = newSelectedIds.concat(selectedIds, id);
        } else if (selectedIndex === 0) {
            newSelectedIds = newSelectedIds.concat(selectedIds.slice(1));
        } else if (selectedIndex === selectedIds.length - 1) {
            newSelectedIds = newSelectedIds.concat(selectedIds.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelectedIds = newSelectedIds.concat(
                selectedIds.slice(0, selectedIndex),
                selectedIds.slice(selectedIndex + 1),
            );
        }

        setSelectedIds(newSelectedIds);
    };

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage:number) => setPage(newPage)

    const isSelected = (id:number) => selectedIds.indexOf(id) !== -1;


    return  (
        <>
            <div>
                <Paper>
                    <TableToolbar filterComponents={filterComponents} selectedIds={selectedIds} getDataHandler={getDataHandler}/>
                    <TableContainer>
                        <MTable
                            aria-labelledby="tableTitle"
                            //size={"medium"}
                            aria-label="enhanced table"
                        >
                            <TableHeader filterComponents={filterComponents} filterValues={filterValues} setFilterValues={setFilterValues} selectedIds={selectedIds} rows={rows} selectAllHandler={selectAllHandler} headCells={headCells} order={order}></TableHeader>
                            <TableBody>
                                {loading ?
                                    (randomArray()).map((value, index) => <TableRow
                                        key={index}
                                        hover
                                        //onClick={(event) => handleClick(event, row.id)}
                                        //role="checkbox"
                                        //tabIndex={-1}
                                    >
                                        <TableCell padding="checkbox" >

                                        </TableCell>
                                        {
                                            headCells.map((headcell, index) => <TableCell key={index}><Skeleton variant="text"/> </TableCell>)
                                        }
                                        <TableCell align="right">

                                        </TableCell>
                                    </TableRow>)
                                    :
                                    rows
                                        .slice(0, rowsPerPage)
                                        .map((row:Row, index:number) => {
                                            const isItemSelected = isSelected(row.id);
                                            const labelId = `enhanced-table-checkbox-${index}`;

                                            return (
                                                <TableRow
                                                    //hover
                                                    //onClick={(event) => handleClick(event, row.id)}
                                                    //role="checkbox"
                                                    aria-checked={isItemSelected}
                                                    //tabIndex={-1}
                                                    key={index}
                                                    selected={isItemSelected}
                                                >
                                                    <TableCell padding="checkbox" id={labelId}>
                                                        <Checkbox
                                                            checked={isItemSelected}
                                                            onClick={(event) => handleClick(event, row.id)}
                                                            inputProps={{ 'aria-labelledby': labelId }}
                                                        />
                                                    </TableCell>
                                                    {
                                                        columns(row).map((column:any, localIndex:number)=> //TODO COLUMN??
                                                            <TableCell key={localIndex}>
                                                                {column}
                                                            </TableCell>
                                                        )
                                                    }
                                                    <TableCell align="right">
                                                        <ButtonsHorizontalList>
                                                            {itemOperations.map(({color, icon, onClick,text, visibility, requiresConfirmation}) =>
                                                                <OperationButton color={color} text={text} icon={icon} onClick={() => onClick(row)} visible={visibility(row)} requiresConfirmation={requiresConfirmation}/>
                                                            ) }
                                                        </ButtonsHorizontalList>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                            </TableBody>
                        </MTable>
                    </TableContainer>
                    <TablePagination
                        component="div"
                        count={totalItems}
                        rowsPerPage={rowsPerPage}
                        rowsPerPageOptions={[30]}
                        page={page}
                        onPageChange={handleChangePage}
                    />
                </Paper>
            </div>
        </>

    );
    return <div></div>
}

/*
{data:rows, totalItems, loading, page, setPage, selected, setSelected, title, clearFilters, filterBarComponents, showClearFilters, components, itemOperations = [], collectionOperations = [], headCells, columns, allColumns, setTable, getDataHandler, getDataHandlerDebounced}) {
    headCells = (itemOperations.length!==0) ?  headCells.concat({ numeric:true, disablePadding:false, label:"Actions"}) : headCells
    //get Data as a first step.
    const [localLoading, setLocalLoading] = useState(false);
    useEffect(()=>{
        console.log("loading")
        setLocalLoading(loading)},[loading])

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(30);


    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => setPage(newPage)

    const isSelected = (name) => selected.indexOf(name) !== -1;


    return  (
        <>
            <div>
                <Paper>
                    <EnhancedTableToolbar selected={selected} numSelected={selected.length} title={title} clearFilters={clearFilters} components={filterBarComponents} showClearFilters={showClearFilters} collectionOperations={collectionOperations} setTable={setTable} allColumns={allColumns} getDataHandler={getDataHandler} />
                    <TableContainer>
                        <Table
                            aria-labelledby="tableTitle"
                            size={dense ? 'small' : 'medium'}
                            aria-label="enhanced table"
                        >
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={rows.length}
                                headCells={headCells}
                                filters={components}
                            />
                            <TableBody>
                                {localLoading ?
                                    (randomArray()).map((value, index) => <TableRow
                                        key={index}
                                        hover
                                        //onClick={(event) => handleClick(event, row.id)}
                                        role="checkbox"
                                        tabIndex={-1}
                                    >
                                        <TableCell padding="checkbox" >

                                        </TableCell>
                                        {
                                            headCells.map((headcell, index) => <TableCell key={index}><Skeleton variant="text"/> </TableCell>)
                                        }
                                        <TableCell align="right">

                                        </TableCell>
                                    </TableRow>)
                                      :
                                    stableSort(rows, getComparator(order, orderBy))
                                    .slice(0, rowsPerPage)
                                    .map((row, index) => {
                                        const isItemSelected = isSelected(row.id);
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow
                                                hover
                                                //onClick={(event) => handleClick(event, row.id)}
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={index}
                                                selected={isItemSelected}
                                            >
                                                <TableCell padding="checkbox" id={labelId}>
                                                    <Checkbox
                                                        checked={isItemSelected}
                                                        onClick={(event) => handleClick(event, row.id)}
                                                        inputProps={{ 'aria-labelledby': labelId }}
                                                    />
                                                </TableCell>
                                                {
                                                    columns(row).map((column, localIndex)=>
                                                        <TableCell key={localIndex}>
                                                            {column}
                                                        </TableCell>
                                                    )
                                                }
                                                <TableCell align="right">
                                                    <ButtonsHorizontalList>
                                                        {itemOperations.map(({color, icon, onClick,text, visibility, requiresConfirmation}) =>
                                                            <OperationButton color={color} text={text} icon={icon} onClick={() => onClick(row)} visible={visibility(row)} requiresConfirmation={requiresConfirmation}/>
                                                            ) }
                                                    </ButtonsHorizontalList>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        component="div"
                        count={totalItems}
                        rowsPerPage={rowsPerPage}
                        rowsPerPageOptions={[30]}
                        page={page}
                        onChangePage={handleChangePage}
                    />
                </Paper>
            </div>
        </>

    );
}

 */
