import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import { lighten, makeStyles } from "@material-ui/core/styles";
import { TableHead } from "@material-ui/core";
import { FilterValue } from "../filters/TableFilters";
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
export const TableHeader = ({ selectedIds, rows, selectAllHandler, setFilterValues, filterValues = [], headCells, filterComponents = [], order }) => {
    const numSelected = selectedIds.length;
    const numRows = rows.length;
    const orderComponents = filterComponents.filter((filterComponent) => filterComponent.isOrder);
    return _jsxs(TableHead, { children: [_jsxs(TableRow, { children: [_jsx(TableCell, Object.assign({ padding: "checkbox" }, { children: _jsx(Checkbox, { indeterminate: numSelected > 0 && numSelected < numRows, checked: numRows > 0 && numSelected === numRows, onChange: selectAllHandler, inputProps: { 'aria-label': 'select all desserts' } }, void 0) }), void 0), headCells.map((headCell, index) => {
                        const orderComponent = orderComponents.find((filterComponent) => filterComponent.name === headCell.id);
                        const filterValue = filterValues.find((filterValue) => filterValue.name === (orderComponent === null || orderComponent === void 0 ? void 0 : orderComponent.name) && filterValue.isOrder);
                        const sortHandler = () => {
                            const oldIndex = filterValues === null || filterValues === void 0 ? void 0 : filterValues.indexOf(filterValue);
                            // @ts-ignore
                            const newFilterValue = new FilterValue({ name: orderComponent === null || orderComponent === void 0 ? void 0 : orderComponent.name, value: ((filterValue === null || filterValue === void 0 ? void 0 : filterValue.value) === "asc" ? "desc" : "asc"), isOrder: true });
                            if (oldIndex !== -1) {
                                const newFilterValues = [...filterValues];
                                newFilterValues.splice(oldIndex, 1, newFilterValue);
                                setFilterValues(newFilterValues);
                            }
                            else {
                                setFilterValues([...filterValues, newFilterValue]);
                            }
                        };
                        return _jsx(TableCell, Object.assign({ align: 'left', padding: 'none', sortDirection: (filterValue === null || filterValue === void 0 ? void 0 : filterValue.name) === headCell.id ? order : false }, { children: _jsx(TableSortLabel, Object.assign({ active: (filterValue === null || filterValue === void 0 ? void 0 : filterValue.name) === headCell.id, direction: filterValue === null || filterValue === void 0 ? void 0 : filterValue.value, onClick: sortHandler, hideSortIcon: !(orderComponent === null || orderComponent === void 0 ? void 0 : orderComponent.isOrder) }, { children: headCell.label }), void 0) }), index);
                    })] }, void 0), _jsxs(TableRow, { children: [_jsx(TableCell, { padding: "checkbox" }, void 0), filterComponents.length !== 0 && headCells.map((headCell, index) => {
                        var _a;
                        return (_jsx(TableCell, Object.assign({ align: "left", padding: "none" }, { children: (_a = filterComponents.find((filterComponent) => filterComponent.name === headCell.id)) === null || _a === void 0 ? void 0 : _a.component }), index));
                    })] }, void 0)] }, void 0);
};
