import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
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
import { useDebouncedCallback } from "use-debounce";
import Skeleton from "@material-ui/lab/Skeleton";
import { Accordion, AccordionDetails, AccordionSummary } from "@material-ui/core";
import ListPageFilterBar from "./utils/ListPageFilterBar";
import { useGetResourceModel } from "../../resource-models/modelsRegistry";
import { useList } from "../../redux/actions/verbs/list";
import { getComparator, stableSort } from "./utils/ListPageGeneratorUtils";
import ButtonsHorizontalList from "../../rendering/components/buttons/ButtonsHorizontalList";
import { useRouteFilters, useTableFilters } from "../filters/TableFilters";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { useCookies } from "react-cookie";
import { Record } from "../../resource-models/Record";
import OperationButton from "../../rendering/components/buttons/OperationButton";
import RefreshIcon from '@material-ui/icons/Refresh';
export function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, headCells, filters = [] } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    return (_jsxs(TableHead, { children: [_jsxs(TableRow, { children: [_jsx(TableCell, Object.assign({ padding: "checkbox" }, { children: _jsx(Checkbox, { indeterminate: numSelected > 0 && numSelected < rowCount, checked: rowCount > 0 && numSelected === rowCount, onChange: onSelectAllClick, inputProps: { 'aria-label': 'select all desserts' } }, void 0) }), void 0), headCells.map((headCell, index) => (_jsx(TableCell, Object.assign({ align: headCell.numeric ? 'right' : 'left', padding: headCell.disablePadding ? 'none' : 'default', sortDirection: orderBy === headCell.id ? order : false }, { children: _jsxs(TableSortLabel, Object.assign({ active: orderBy === headCell.id, direction: orderBy === headCell.id ? order : 'asc', 
                            /*onClick={createSortHandler(headCell.id)}*/
                            hideSortIcon: true }, { children: [headCell.label, orderBy === headCell.id ? (_jsx("span", Object.assign({ className: classes.visuallyHidden }, { children: order === 'desc' ? 'sorted descending' : 'sorted ascending' }), void 0)) : null] }), void 0) }), index)))] }, void 0), _jsxs(TableRow, { children: [_jsx(TableCell, { padding: "checkbox" }, void 0), filters.length !== 0 && headCells.map((headCell, index) => {
                        var _a;
                        return (_jsx(TableCell, Object.assign({ align: "left", padding: "none", sortDirection: orderBy === headCell.id ? order : false }, { children: (_a = filters.find(filter => filter.name === headCell.id)) === null || _a === void 0 ? void 0 : _a.component }), index));
                    })] }, void 0)] }, void 0));
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
        width: "100%"
    },
    highlight: theme.palette.type === 'light'
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
    const { numSelected, clearFilters, components, showClearFilters, collectionOperations, selected, setTable, allColumns = [], title, getDataHandler } = props;
    const selectedColumns = allColumns.filter(column => column.inColumn === true);
    const handleChangeCols = (event) => {
        const newValues = event.target.value;
        setTable(newValues);
    };
    const [expanded, setExpanded] = useState(false);
    const handleChange = () => {
        setExpanded(!expanded);
    };
    return (_jsx(_Fragment, { children: _jsxs(Accordion, Object.assign({ expanded: expanded, elevation: 0 }, { children: [_jsx(AccordionSummary, Object.assign({ "aria-controls": "panel1a-content", id: "panel1a-header" }, { children: _jsxs(Toolbar, Object.assign({ className: classes.root }, { children: [numSelected > 0 ? (_jsxs(Paper, Object.assign({ elevation: 0, className: clsx(classes.paper, {
                                    [classes.highlight]: numSelected > 0,
                                }) }, { children: [_jsxs(Typography, Object.assign({ className: classes.title, color: "inherit", variant: "subtitle1", component: "div" }, { children: [numSelected, " selected"] }), void 0), collectionOperations.map(({ color, text, icon, onClick, requiresConfirmation }) => _jsx(Tooltip, Object.assign({ title: text }, { children: _jsx(OperationButton, { color: color, text: text, icon: icon, onClick: () => onClick(selected), requiresConfirmation: requiresConfirmation }, void 0) }), void 0))] }), void 0)) : (_jsx(Typography, Object.assign({ className: classes.title, variant: "h6", id: "tableTitle", component: "div" }, { children: title }), void 0)), false && setTable && _jsx(TextField, Object.assign({ id: "standard-select-currency", select: true, label: "", value: selectedColumns, onChange: handleChangeCols, SelectProps: {
                                    multiple: true
                                } }, { children: allColumns.map((option) => (_jsx(MenuItem, Object.assign({ value: option }, { children: option.label }), option.id))) }), void 0), (showClearFilters) && (_jsx(Button, Object.assign({ onClick: clearFilters }, { children: "Clear filters" }), void 0)), _jsx(IconButton, Object.assign({ onClick: () => getDataHandler() }, { children: _jsx(RefreshIcon, {}, void 0) }), void 0), (!!components.length) && _jsx(Tooltip, Object.assign({ title: "Filter list" }, { children: _jsx(IconButton, Object.assign({ "aria-label": "filter list", onClick: handleChange }, { children: _jsx(FilterListIcon, {}, void 0) }), void 0) }), void 0)] }), void 0) }), void 0), _jsx(AccordionDetails, { children: _jsx(ListPageFilterBar, { components: components }, void 0) }, void 0)] }), void 0) }, void 0));
};
EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Il max è escluso e il min è incluso
}
function randomArray() {
    return new Array(getRandomInt(3, 7)).fill(1);
}
export function RouteFilterList({ resourceName, filters: lockedFilters, itemOperations = [], collectionOperations = [] }) {
    var _a;
    const { operations } = useGetResourceModel(resourceName);
    const { model, table, title } = operations.getOperationModel("get");
    const [cookies, setCookie] = useCookies([`list-${resourceName}`]);
    const [localTable, setLocalTable] = useState((_a = cookies[`list-${resourceName}`]) !== null && _a !== void 0 ? _a : table);
    const [localModel, setLocalModel] = useState(model);
    const [rows, setRows] = useState([]);
    useEffect(() => { setRows([]); }, [resourceName]);
    useEffect(() => { setLocalModel(model); }, [model]); //Change model
    useEffect(() => { var _a; setLocalTable((_a = cookies[`list-${resourceName}`]) !== null && _a !== void 0 ? _a : table); }, [table, resourceName, cookies]); //Change tables
    const propSetLocalTable = (value) => {
        setCookie(`list-${resourceName}`, value, { path: '/' });
        setLocalTable(value);
    };
    const allProperties = localModel.getAllPropertiesReadableNames();
    const tableWithStats = allProperties.map(tableElement => {
        return Object.assign(Object.assign({}, tableElement), { inColumn: localTable.some(localTableElement => localTableElement.id === tableElement.id) });
    });
    const headCells = useMemo(() => {
        const localHeadcells = localTable.map(({ id, label }) => {
            return { propertyModel: localModel.getProperty(id), tableItemName: { id: id, label: label } };
        }).map(({ propertyModel, tableItemName: { id, label } }) => {
            return { id: id, numeric: false, disablePadding: false, label: label };
        });
        return localHeadcells;
    }, [localTable, localModel]);
    const { filters, components, clearFilters } = useRouteFilters(resourceName, lockedFilters);
    const { data, get, loading } = useList();
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const debounced = useDebouncedCallback(() => get(resourceName, page + 1, filters), 1000);
    useEffect(() => {
        debounced();
    }, [resourceName, filters, page]);
    useEffect(() => {
        setRows(data.list);
    }, [data]);
    const filterBarComponents = components.filter(component => !headCells.some(headCell => headCell.id === component.name));
    const showClearFilters = !!components.length;
    const getRowElement = (row, id, label, localModel, viewElement) => {
        const record = Record.createFromJson(row, localModel);
        return localModel.getOutputField(id, { record: record, model: localModel }, viewElement, false);
    };
    const columns = useCallback((row) => localTable.map(({ id, label, viewElement }) => {
        return getRowElement(row, id, label, localModel, viewElement);
    }), [localModel, localTable]);
    return _jsx(GenericList, { data: rows, totalItems: data.totalItems, getDataHandler: debounced, loading: loading, page: page, setPage: setPage, selected: selected, setSelected: setSelected, title: title, clearFilters: clearFilters, filterBarComponents: filterBarComponents, showClearFilters: showClearFilters, components: components, columns: columns, headCells: headCells, itemOperations: itemOperations, collectionOperations: collectionOperations, allColumns: tableWithStats, setTable: propSetLocalTable }, void 0);
}
export function FilterList({ resourceName, filters: lockedFilters, itemOperations = [], collectionOperations = [] }) {
    var _a;
    const { model, table, title } = useGetResourceModel(resourceName);
    const [cookies, setCookie] = useCookies([`list-${resourceName}`]);
    const [localTable, setLocalTable] = useState((_a = cookies[`list-${resourceName}`]) !== null && _a !== void 0 ? _a : table);
    const [localModel, setLocalModel] = useState(model);
    const [rows, setRows] = useState([]);
    useEffect(() => { setRows([]); }, [resourceName]);
    useEffect(() => { setLocalModel(model); }, [model]); //Change model
    useEffect(() => { var _a; setLocalTable((_a = cookies[`list-${resourceName}`]) !== null && _a !== void 0 ? _a : table); }, [table, resourceName, cookies]); //Change tables
    const propSetLocalTable = (value) => {
        setCookie(`list-${resourceName}`, value, { path: '/' });
        setLocalTable(value);
    };
    const allProperties = localModel.getAllPropertiesReadableNames();
    const tableWithStats = allProperties.map(tableElement => {
        return Object.assign(Object.assign({}, tableElement), { inColumn: localTable.some(localTableElement => localTableElement.id === tableElement.id) });
    });
    const headCells = useMemo(() => {
        const localHeadcells = localTable.map(({ id, label }) => {
            return { propertyModel: localModel.getProperty(id), tableItemName: { id: id, label: label } };
        }).map(({ propertyModel, tableItemName: { id, label } }) => {
            return { id: id, numeric: false, disablePadding: false, label: label };
        });
        return localHeadcells;
    }, [localTable, localModel]);
    const { filters, components, clearFilters } = useTableFilters(resourceName, lockedFilters);
    const { data, get, loading } = useList();
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const debounced = useDebouncedCallback(() => get(resourceName, page + 1, filters), 1000);
    useEffect(() => {
        debounced();
    }, [resourceName, filters, page]);
    useEffect(() => {
        setRows(data.list);
    }, [data]);
    const filterBarComponents = components.filter(component => !headCells.some(headCell => headCell.id === component.name));
    const showClearFilters = !!components.length;
    const getRowElement = (row, id, label, localModel) => {
        const record = Record.createFromJson(row, localModel);
        const propertyModel = localModel.getProperty(id);
        propertyModel.label = label;
        return propertyModel.getOutputField({ record: record.getPropertyRecord(id), showLabel: false });
    };
    const columns = useCallback((row) => localTable.map(({ id, label }) => {
        return getRowElement(row, id, label, localModel);
    }), [localModel, localTable]);
    return _jsx(GenericList, { data: rows, totalItems: data.totalItems, getDataHandler: () => get(resourceName, page + 1, filters), getDataHandlerDebounced: debounced, loading: loading, page: page, setPage: setPage, selected: selected, setSelected: setSelected, title: title, clearFilters: clearFilters, filterBarComponents: filterBarComponents, showClearFilters: showClearFilters, components: components, columns: columns, headCells: headCells, itemOperations: itemOperations, collectionOperations: collectionOperations, allColumns: tableWithStats, setTable: propSetLocalTable }, void 0);
}
export function GenericList({ data: rows, totalItems, loading, page, setPage, selected, setSelected, title, clearFilters, filterBarComponents, showClearFilters, components, itemOperations = [], collectionOperations = [], headCells, columns, allColumns, setTable, getDataHandler, getDataHandlerDebounced }) {
    headCells = (itemOperations.length !== 0) ? headCells.concat({ numeric: true, disablePadding: false, label: "Actions" }) : headCells;
    //get Data as a first step.
    const [localLoading, setLocalLoading] = useState(false);
    useEffect(() => { setLocalLoading(loading); }, [loading]);
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
        }
        else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        }
        else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        }
        else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
    };
    const handleChangePage = (event, newPage) => setPage(newPage);
    const isSelected = (name) => selected.indexOf(name) !== -1;
    return (_jsx(_Fragment, { children: _jsx("div", { children: _jsxs(Paper, { children: [_jsx(EnhancedTableToolbar, { selected: selected, numSelected: selected.length, title: title, clearFilters: clearFilters, components: filterBarComponents, showClearFilters: showClearFilters, collectionOperations: collectionOperations, setTable: setTable, allColumns: allColumns, getDataHandler: getDataHandler }, void 0), _jsx(TableContainer, { children: _jsxs(Table, Object.assign({ "aria-labelledby": "tableTitle", size: dense ? 'small' : 'medium', "aria-label": "enhanced table" }, { children: [_jsx(EnhancedTableHead, { numSelected: selected.length, order: order, orderBy: orderBy, onSelectAllClick: handleSelectAllClick, onRequestSort: handleRequestSort, rowCount: rows.length, headCells: headCells, filters: components }, void 0), _jsx(TableBody, { children: localLoading ?
                                        (randomArray()).map((value, index) => _jsxs(TableRow, Object.assign({ hover: true, 
                                            //onClick={(event) => handleClick(event, row.id)}
                                            role: "checkbox", tabIndex: -1 }, { children: [_jsx(TableCell, { padding: "checkbox" }, void 0), headCells.map((headcell, index) => _jsxs(TableCell, { children: [_jsx(Skeleton, { variant: "text" }, void 0), " "] }, index)), _jsx(TableCell, { align: "right" }, void 0)] }), index))
                                        :
                                            stableSort(rows, getComparator(order, orderBy))
                                                .slice(0, rowsPerPage)
                                                .map((row, index) => {
                                                const isItemSelected = isSelected(row.id);
                                                const labelId = `enhanced-table-checkbox-${index}`;
                                                return (_jsxs(TableRow, Object.assign({ hover: true, 
                                                    //onClick={(event) => handleClick(event, row.id)}
                                                    role: "checkbox", "aria-checked": isItemSelected, tabIndex: -1, selected: isItemSelected }, { children: [_jsx(TableCell, Object.assign({ padding: "checkbox", id: labelId }, { children: _jsx(Checkbox, { checked: isItemSelected, onClick: (event) => handleClick(event, row.id), inputProps: { 'aria-labelledby': labelId } }, void 0) }), void 0), columns(row).map((column, localIndex) => _jsx(TableCell, { children: column }, localIndex)), _jsx(TableCell, Object.assign({ align: "right" }, { children: _jsx(ButtonsHorizontalList, { children: itemOperations.map(({ color, icon, onClick, text, visibility, requiresConfirmation }) => _jsx(OperationButton, { color: color, text: text, icon: icon, onClick: () => onClick(row), visible: visibility(row), requiresConfirmation: requiresConfirmation }, void 0)) }, void 0) }), void 0)] }), index));
                                            }) }, void 0)] }), void 0) }, void 0), _jsx(TablePagination, { component: "div", count: totalItems, rowsPerPage: rowsPerPage, rowsPerPageOptions: [30], page: page, onChangePage: handleChangePage }, void 0)] }, void 0) }, void 0) }, void 0));
}
export function getOperationButton({ color, onClick, text, icon, visible = true }) {
    return;
}
