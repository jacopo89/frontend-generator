import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import OperationButton from "../../rendering/components/buttons/OperationButton";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from "@material-ui/icons/Refresh";
import FilterListIcon from "@material-ui/icons/FilterList";
import ListPageFilterBar from "./utils/ListPageFilterBar";
import { lighten, makeStyles } from "@material-ui/core/styles";
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
export const TableToolbar = ({ clearFilters, filterComponents = [], showClearFilters, collectionOperations = [], selectedIds, title, getDataHandler }) => {
    const numSelected = selectedIds.length;
    const classes = useToolbarStyles();
    const [expanded, setExpanded] = useState(false);
    return (_jsx(_Fragment, { children: _jsxs(Accordion, Object.assign({ expanded: expanded, elevation: 0 }, { children: [_jsx(AccordionSummary, Object.assign({ "aria-controls": "panel1a-content", id: "panel1a-header" }, { children: _jsxs(Toolbar, Object.assign({ className: classes.root }, { children: [numSelected > 0 ? (_jsxs(Paper, Object.assign({ elevation: 0, className: clsx(classes.paper, {
                                    [classes.highlight]: numSelected > 0,
                                }) }, { children: [_jsxs(Typography, Object.assign({ className: classes.title, color: "inherit", variant: "subtitle1", component: "div" }, { children: [numSelected, " selected"] }), void 0), collectionOperations.map(({ color, text, icon, onClick, requiresConfirmation }) => _jsx(Tooltip, Object.assign({ title: text }, { children: _jsx(OperationButton, { color: color, text: text, icon: icon, onClick: () => onClick(selectedIds), requiresConfirmation: requiresConfirmation }, void 0) }), void 0))] }), void 0)) : (_jsx(Typography, Object.assign({ className: classes.title, variant: "h6", id: "tableTitle", component: "div" }, { children: title }), void 0)), (showClearFilters) && (_jsx(Button, Object.assign({ onClick: clearFilters }, { children: "Clear filters" }), void 0)), _jsx(IconButton, Object.assign({ onClick: () => getDataHandler() }, { children: _jsx(RefreshIcon, {}, void 0) }), void 0), (!!filterComponents.length) && _jsx(Tooltip, Object.assign({ title: "Filter list" }, { children: _jsx(IconButton, Object.assign({ "aria-label": "filter list", onClick: () => setExpanded(!expanded) }, { children: _jsx(FilterListIcon, {}, void 0) }), void 0) }), void 0)] }), void 0) }), void 0), _jsx(AccordionDetails, { children: _jsx(ListPageFilterBar, { components: filterComponents }, void 0) }, void 0)] }), void 0) }, void 0));
};
