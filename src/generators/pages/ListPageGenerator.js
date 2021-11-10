import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {lighten, makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import Button from "@material-ui/core/Button";
import {useDebouncedCallback} from "use-debounce";
import Skeleton from "@material-ui/lab/Skeleton";

import {Accordion, AccordionDetails, AccordionSummary} from "@material-ui/core";
import ListPageFilterBar from "./utils/ListPageFilterBar";
import {useGetResourceModel} from "../../resource-models/modelsRegistry";
import {useList} from "../../redux/actions/verbs/list";
import {getComparator, stableSort} from "./utils/ListPageGeneratorUtils";
import ButtonsHorizontalList from "../../rendering/components/buttons/ButtonsHorizontalList";
import {useRouteFilters, useTableFilters} from "../filters/TableFilters";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import {useCookies} from "react-cookie";
import {Record} from "../../resource-models/Record";
import OperationButton from "../../rendering/components/buttons/OperationButton";
import RefreshIcon from '@material-ui/icons/Refresh';


export function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, headCells, filters = []} = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell>
                {headCells.map((headCell, index) => (
                    <TableCell
                        key={index}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            /*onClick={createSortHandler(headCell.id)}*/
                            hideSortIcon={true}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
            <TableRow>
                <TableCell padding="checkbox">
                </TableCell>
                {filters.length!==0 && headCells.map((headCell, index) => (
                    <TableCell
                        key={index}
                        align="left"
                        padding="none"
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {filters.find(filter => filter.name === headCell.id)?.component}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
    headCells: PropTypes.array.isRequired
};


const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
        width:"100%"
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
    paper: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingLeft: theme.spacing(2),
        marginRight: theme.spacing(1)
    }
}));


const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected,clearFilters, components, showClearFilters, collectionOperations, selected, setTable, allColumns = [] , title, getDataHandler} = props;
    const selectedColumns = allColumns.filter(column => column.inColumn === true)
    const handleChangeCols = (event)=>{
        const newValues = event.target.value
        setTable(newValues);
    }

    const [expanded, setExpanded] = useState(false);

    const handleChange = () => {
        setExpanded(!expanded);
    };

    return (
        <>
            <Accordion expanded={expanded} elevation={0}>
                <AccordionSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Toolbar className={classes.root}>
                        {numSelected > 0 ? (<Paper elevation={0} className={clsx(classes.paper, {
                                [classes.highlight]: numSelected > 0,
                            })}>
                            <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                                {numSelected} selected
                            </Typography>
                                {collectionOperations.map(({color, text, icon, onClick, requiresConfirmation}) =>
                                    <Tooltip title={text}>
                                        <OperationButton color={color} text={text} icon={icon} onClick={() => onClick(selected)} requiresConfirmation={requiresConfirmation}/>
                                    </Tooltip>
                                )}
                            </Paper>
                        ) : (
                            <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                                {title}
                            </Typography>

                        )}
                        { false && setTable && <TextField
                            id="standard-select-currency"
                            select
                            label=""
                            value={selectedColumns}
                            onChange={handleChangeCols}
                            SelectProps={{
                                multiple:true
                            }}
                        >
                            {allColumns.map((option) => (
                                <MenuItem key={option.id} value={option}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField> }
                        {(showClearFilters) && (<Button onClick={clearFilters}>Clear filters</Button>)}
                        <IconButton onClick={() => getDataHandler()}><RefreshIcon></RefreshIcon></IconButton>
                        {(!!components.length) && <Tooltip title="Filter list">
                            <IconButton aria-label="filter list" onClick={handleChange}>
                                <FilterListIcon />
                            </IconButton>
                        </Tooltip>}
                    </Toolbar>
                </AccordionSummary>
                <AccordionDetails>
                    <ListPageFilterBar components={components}/>
                </AccordionDetails>
            </Accordion>


        </>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Il max è escluso e il min è incluso
}

function randomArray(){
    return new Array(getRandomInt(3,7)).fill(1);
}

export function RouteFilterList({resourceName, filters:lockedFilters,  itemOperations = [], collectionOperations = []}) {
    const {operations} = useGetResourceModel(resourceName);
    const {model, table, title} = operations.getOperationModel("get");
    const [cookies, setCookie] = useCookies([`list-${resourceName}`]);
    const [localTable, setLocalTable] = useState(cookies[`list-${resourceName}`] ?? table);
    const [localModel, setLocalModel] = useState(model);
    const [rows, setRows] = useState([])

    useEffect(()=>{setRows([])}, [resourceName])
    useEffect(()=>{setLocalModel(model)},[model]) //Change model
    useEffect(()=>{setLocalTable(cookies[`list-${resourceName}`] ?? table)},[table, resourceName, cookies]) //Change tables

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


    const {filters, components, clearFilters} = useRouteFilters(resourceName, lockedFilters);
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

export function FilterList({resourceName, filters:lockedFilters,  itemOperations = [], collectionOperations = []}) {
    const {model, table, title} = useGetResourceModel(resourceName)
    const [cookies, setCookie] = useCookies([`list-${resourceName}`]);
    const [localTable, setLocalTable] = useState(cookies[`list-${resourceName}`] ?? table);
    const [localModel, setLocalModel] = useState(model);
    const [rows, setRows] = useState([])

    useEffect(()=>{setRows([])}, [resourceName])
    useEffect(()=>{setLocalModel(model)},[model]) //Change model
    useEffect(()=>{setLocalTable(cookies[`list-${resourceName}`] ?? table)},[table, resourceName, cookies]) //Change tables

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


    const {filters, components, clearFilters} = useTableFilters(resourceName, lockedFilters);
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

    const getRowElement = (row, id, label, localModel)=> {
        const record = Record.createFromJson(row, localModel);
        const propertyModel = localModel.getProperty(id);
        propertyModel.label = label;

        return propertyModel.getOutputField({record: record.getPropertyRecord(id), showLabel:false})
    }

    const columns = useCallback((row) => localTable.map( ({id, label}) => {
        return getRowElement(row, id, label, localModel)
    }),[localModel, localTable])


    return <GenericList
        data={rows}
        totalItems={data.totalItems}
        getDataHandler={() => get(resourceName, page + 1, filters)}
        getDataHandlerDebounced={debounced}
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



export function GenericList({data:rows, totalItems, loading, page, setPage, selected, setSelected, title, clearFilters, filterBarComponents, showClearFilters, components, itemOperations = [], collectionOperations = [], headCells, columns, allColumns, setTable, getDataHandler, getDataHandlerDebounced}) {
    headCells = (itemOperations.length!==0) ?  headCells.concat({ numeric:true, disablePadding:false, label:"Actions"}) : headCells
    //get Data as a first step.
    const [localLoading, setLocalLoading] = useState(false);
    useEffect(()=>{setLocalLoading(loading)},[loading])

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

export function getOperationButton({color, onClick,text, icon, visible = true}){
    return
}
