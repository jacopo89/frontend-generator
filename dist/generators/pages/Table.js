import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState } from "react";
import { Checkbox, Paper, TableBody, TableCell, TableContainer, TablePagination, TableRow } from "@material-ui/core";
import { TableToolbar } from "./TableToolbar";
import { TableHeader } from "./TableHeader";
import { Table as MTable } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import ButtonsHorizontalList from "../../rendering/components/buttons/ButtonsHorizontalList";
import OperationButton from "../../rendering/components/buttons/OperationButton";
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Il max è escluso e il min è incluso
}
function randomArray() {
    return new Array(getRandomInt(3, 7)).fill(1);
}
export const Table = ({ rows, totalItems, loading, page, setPage, filterComponents = [], filterValues = [], setFilterValues, title, clearFilters, showClearFilters, itemOperations = [], collectionOperations = [], headCells, columns, getDataHandler, order }) => {
    headCells = (itemOperations.length !== 0) ? headCells.concat({ id: "actions", label: "Actions" }) : headCells;
    //get Data as a first step.
    const [rowsPerPage, setRowsPerPage] = React.useState(30);
    const [selectedIds, setSelectedIds] = useState([]);
    const selectAllHandler = (event, checked) => {
        if (event.target.checked) {
            const newSelectedIds = rows.map((n) => n.id);
            setSelectedIds(newSelectedIds.map((id) => id));
            return;
        }
        setSelectedIds([]);
    };
    const handleClick = (event, id) => {
        const selectedIndex = selectedIds.indexOf(id);
        let newSelectedIds = [];
        if (selectedIndex === -1) {
            newSelectedIds = newSelectedIds.concat(selectedIds, id);
        }
        else if (selectedIndex === 0) {
            newSelectedIds = newSelectedIds.concat(selectedIds.slice(1));
        }
        else if (selectedIndex === selectedIds.length - 1) {
            newSelectedIds = newSelectedIds.concat(selectedIds.slice(0, -1));
        }
        else if (selectedIndex > 0) {
            newSelectedIds = newSelectedIds.concat(selectedIds.slice(0, selectedIndex), selectedIds.slice(selectedIndex + 1));
        }
        setSelectedIds(newSelectedIds);
    };
    const handleChangePage = (event, newPage) => setPage(newPage);
    const isSelected = (id) => selectedIds.indexOf(id) !== -1;
    return (_jsx(_Fragment, { children: _jsx("div", { children: _jsxs(Paper, { children: [_jsx(TableToolbar, { filterComponents: filterComponents, selectedIds: selectedIds, getDataHandler: getDataHandler }, void 0), _jsx(TableContainer, { children: _jsxs(MTable, Object.assign({ "aria-labelledby": "tableTitle", "aria-label": "enhanced table" }, { children: [_jsx(TableHeader, { filterComponents: filterComponents, filterValues: filterValues, setFilterValues: setFilterValues, selectedIds: selectedIds, rows: rows, selectAllHandler: selectAllHandler, headCells: headCells, order: order }, void 0), _jsx(TableBody, { children: loading ?
                                        (randomArray()).map((value, index) => _jsxs(TableRow, Object.assign({ hover: true }, { children: [_jsx(TableCell, { padding: "checkbox" }, void 0), headCells.map((headcell, index) => _jsxs(TableCell, { children: [_jsx(Skeleton, { variant: "text" }, void 0), " "] }, index)), _jsx(TableCell, { align: "right" }, void 0)] }), index))
                                        :
                                            rows
                                                .slice(0, rowsPerPage)
                                                .map((row, index) => {
                                                const isItemSelected = isSelected(row.id);
                                                const labelId = `enhanced-table-checkbox-${index}`;
                                                return (_jsxs(TableRow
                                                //hover
                                                //onClick={(event) => handleClick(event, row.id)}
                                                //role="checkbox"
                                                , Object.assign({ "aria-checked": isItemSelected, selected: isItemSelected }, { children: [_jsx(TableCell, Object.assign({ padding: "checkbox", id: labelId }, { children: _jsx(Checkbox, { checked: isItemSelected, onClick: (event) => handleClick(event, row.id), inputProps: { 'aria-labelledby': labelId } }, void 0) }), void 0), columns(row).map((column, localIndex) => //TODO COLUMN??
                                                         _jsx(TableCell, { children: column }, localIndex)), _jsx(TableCell, Object.assign({ align: "right" }, { children: _jsx(ButtonsHorizontalList, { children: itemOperations.map(({ color, icon, onClick, text, visibility, requiresConfirmation }) => _jsx(OperationButton, { color: color, text: text, icon: icon, onClick: () => onClick(row), visible: visibility(row), requiresConfirmation: requiresConfirmation }, void 0)) }, void 0) }), void 0)] }), index));
                                            }) }, void 0)] }), void 0) }, void 0), _jsx(TablePagination, { component: "div", count: totalItems, rowsPerPage: rowsPerPage, rowsPerPageOptions: [30], page: page, onPageChange: handleChangePage }, void 0)] }, void 0) }, void 0) }, void 0));
    return _jsx("div", {}, void 0);
};
