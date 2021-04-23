import React, {useEffect, useMemo, useState} from 'react';
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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import {useDispatch} from "react-redux";
import Button from "@material-ui/core/Button";
import {push} from "connected-react-router";

import {useParams} from 'react-router-dom';
import {useDebouncedCallback} from "use-debounce";
import _ from 'lodash';
import Skeleton from "@material-ui/lab/Skeleton";

import {Accordion, AccordionDetails, AccordionSummary} from "@material-ui/core";
import ListPageFilterBar from "./utils/ListPageFilterBar";
import {getResourceModel} from "../../resource-models/modelsRegistry";
import {useList} from "../../redux/actions/verbs/list";
import {getComparator, stableSort} from "./utils/ListPageGeneratorUtils";
import ButtonsHorizontalList from "../../rendering/components/buttons/ButtonsHorizontalList";
import {GenericField} from "../fields/genericField";
import {TableFilters} from "../filters/TableFilters";


function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, headCells, filters} = props;
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
                            onClick={createSortHandler(headCell.id)}
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
                {headCells.map((headCell, index) => (
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
    const { numSelected,clearFilters, components, showClearFilters } = props;

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
                            <Tooltip title="Delete">
                                <IconButton aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                            </Paper>
                        ) : (
                            <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                                {props.title}
                            </Typography>
                        )}
                        {(showClearFilters) && (<Button onClick={clearFilters}>Clear filters</Button>)}
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

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Il max è escluso e il min è incluso
}

function randomArray(){
    return new Array(getRandomInt(3,7)).fill(1);
}


export function GenericList({inheritedResourceName, filters:presetFilters}) {
    const [rows, setRows] = useState([]);
    const [selected, setSelected] = React.useState([]);
    const {urlResourceName} = useParams();
    const resourceNameToUse = useMemo(()=>{return (inheritedResourceName) ? inheritedResourceName : urlResourceName;},[urlResourceName, inheritedResourceName])
    const [model, setModel] = useState({properties:[]});
    const [table, setTable] = useState([]);
    const [resourceName, setResourceName] = useState("");
    const [title, setTitle] = useState("");
    //const {model,resourceName, title} = useMemo(()=>getResourceModel(resourceNameToUse),[resourceNameToUse]);

    useEffect(()=>{
        const {model, resourceName, title, table} = getResourceModel(resourceNameToUse)
        setModel(model);
        setResourceName(resourceName);
        setTitle(title);
        setTable(table);
    },[resourceNameToUse])


    let headCells = table.map(({id, label}) => {return {propertyModel:model.getProperty(id), tableItemName:{id:id, label:label}}}).map(({propertyModel, tableItemName:{id, label}}) => {
        return { id: id, numeric:false, disablePadding:false, label: label};
    })
    headCells = headCells.concat({ numeric:true, disablePadding:false, label:"Actions"})

    const {filters, components, clearFilters} = TableFilters(resourceNameToUse,presetFilters);
    //get Data as a first step.
    const dispatch = useDispatch();
    const {data, get, loading} = useList();
    const {list, totalItems} = data;
    const [localLoading, setLocalLoading] = useState(false);

    useEffect(()=>{setLocalLoading(loading)},[loading])

    const goToNew = ()=> dispatch(push(`/${resourceName}/new`))
    const goToEdit = (id)=> dispatch(push(`/${resourceName}/${id}/edit`))
    const goToShow = (id)=> dispatch(push(`/${resourceName}/${id}/show`))



    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');

    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(30);


    useEffect(()=>{
        setRows([])
        setSelected([])
    }, [resourceNameToUse])

    const debounced = useDebouncedCallback(
        ()=>get(resourceName,page+1, filters),
        1000
    );

    useEffect(()=>{
        setLocalLoading(true);
        debounced.callback();
        setLocalLoading(false)
    },[resourceName, filters, page])


    useEffect(()=>{
        setRows(data.list);
    }, [data]);

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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };//const [rows, setRows] = useState([]);

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const filterBarComponents = components.filter(component => !headCells.some(headCell => headCell.id === component.name))

    const showClearFilters = !!components.length;

    return  (
        <>
            <div className={classes.root}>
                {!inheritedResourceName && <div style={{display: "flex", justifyContent: "flex-end", marginBottom: 5}}>
                    <Button color="primary" variant="contained" onClick={goToNew}>New</Button>
                </div>}
                <Paper className={classes.paper}>
                    <EnhancedTableToolbar numSelected={selected.length} title={title} clearFilters={clearFilters} components={filterBarComponents} showClearFilters={showClearFilters}/>
                    <TableContainer>
                        <Table
                            className={classes.table}
                            aria-labelledby="tableTitle"
                            size={dense ? 'small' : 'medium'}
                            aria-label="enhanced table"
                        >
                            <EnhancedTableHead
                                classes={classes}
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
                                            table.map((tableItem, index) => <TableCell key={index}><Skeleton variant="text"/> </TableCell>)
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
                                                    table.map(({id, label}) =>
                                                    {
                                                        const split = _.split(id, ".");
                                                        const reducer = (start, value) => (start) ? start[value] : undefined;
                                                        const record = split.reduce(reducer, row);
                                                        const propertyModel = model.getProperty(id);
                                                        propertyModel.label = label;
                                                        return {propertyModel: propertyModel , record: record}
                                                    }).map(({propertyModel, record}, localIndex) => {
                                                    return <TableCell key={localIndex}>
                                                        <GenericField table propertyRecord={record} propertyModel={propertyModel} resourceName={resourceName} originalId={row.id} />
                                                    </TableCell>
                                                })}
                                                <TableCell align="right">
                                                    <ButtonsHorizontalList>
                                                        <Button variant="contained" color="primary" onClick={()=>goToShow(row.id)}>Show</Button>
                                                        <Button variant="contained" color="secondary" onClick={()=>goToEdit(row.id)}>Edit</Button>
                                                    </ButtonsHorizontalList>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                {false && emptyRows > 0 && (
                                    <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
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
                {false && <FormControlLabel
                    control={<Switch checked={dense} onChange={handleChangeDense}/>}
                    label="Dense padding"
                />}
            </div>
        </>

    );
}

/*function TableFilters(resourceNameToUse, presetFilters){
    console.log("passing through table filters");

    let {urlResourceName} = useParams();
    const location = useLocation();
    const [routeFilters, setRouteFilters] = useState({});
    const [inheritedFilters, setInheritedFilters] = useState({});
    const [filterObject, setFilterObject] = useState({});
    const dispatch = useDispatch();

    const isEmbeddedTable = resourceNameToUse!==urlResourceName;

    const getFiltersFromLocation = (location) => {
        const searchParams = new URLSearchParams(location.search);
        const routeFilters = {};
        for(let key of searchParams.keys()) {
            routeFilters[key] = searchParams.get(key);
        }
        return routeFilters;
    }

    useEffect(()=>{
        console.log("preset filters changed");
        setInheritedFilters(presetFilters)},[presetFilters])

    useEffect(()=>{
        console.log("inherited filters changed");
        if(inheritedFilters){
            setFilterObject(inheritedFilters);
        }
    },[inheritedFilters])


    useEffect(()=>{
        console.log("location");
        const filtersFromLocation = getFiltersFromLocation(location);
        if(!_.isEqual(routeFilters, filtersFromLocation)){
            setRouteFilters(filtersFromLocation);
        }
    }, [location])

    useEffect(()=> {
        console.log("route filters changed");
        if(!isEmbeddedTable){
            if(!_.isEqual(routeFilters, filterObject)){
                setFilterObject(routeFilters);
            }
        }

    },[routeFilters])

    const checkIfFiltersEqualToRouteFilters = useCallback(()=>{
        return _.isEqual(filterObject, routeFilters)
    },[filterObject,routeFilters])

    useEffect(()=> {
        console.log("filter object");
        if(!isEmbeddedTable){
            if(!checkIfFiltersEqualToRouteFilters()){
                let route = location.pathname+"?";
                Object.keys(filterObject).forEach((key,index)=> {
                    if(index===0){
                        route = route.concat(`${key}=${filterObject[key]}`);
                    }else{
                        route = route.concat(`&${key}=${filterObject[key]}`);
                    }

                })
                dispatch(replace(route));
            }
        }

    },[filterObject])


    const clearFilters = ()=>setFilterObject({});
    const {model, filters:modelFilters} = useMemo(()=> getResourceModel(resourceNameToUse),[resourceNameToUse]);
    const propsFiltersList = useMemo(()=> {return {model:model, modelFilters: modelFilters, filters: filterObject, setFilters: setFilterObject}},[model, modelFilters, filterObject]);
    return {filters:filterObject, components:FilterList(propsFiltersList), clearFilters:clearFilters}

}*/




