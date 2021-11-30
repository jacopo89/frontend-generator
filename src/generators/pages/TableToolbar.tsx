import React, {useState} from "react";
import {Accordion, AccordionDetails, AccordionSummary} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import OperationButton from "../../rendering/components/buttons/OperationButton";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from "@material-ui/icons/Refresh";
import FilterListIcon from "@material-ui/icons/FilterList";
import ListPageFilterBar from "./utils/ListPageFilterBar";
import {StringInput} from "../forms/inputs/StringInput";
import {lighten, makeStyles} from "@material-ui/core/styles";
import {CollectionOperation} from "./table/CollectionOperation";
import {FilterComponent} from "../filters/FilterComponent";




interface ToolbarPropsInterface{
    title?: string;
    showClearFilters?:boolean
    clearFilters?: ()=>{},
    filterComponents?: FilterComponent[],
    collectionOperations?: CollectionOperation[],
    selectedIds: number[],
    getDataHandler: ()=>void
}


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


export const TableToolbar: React.FC<ToolbarPropsInterface> = ({clearFilters, filterComponents=[], showClearFilters, collectionOperations=[], selectedIds , title, getDataHandler})=> {
    const numSelected = selectedIds.length;
    const classes = useToolbarStyles();
    const [expanded, setExpanded] = useState(false)

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
                                        <OperationButton color={color} text={text} icon={icon} onClick={() => onClick(selectedIds)} requiresConfirmation={requiresConfirmation}/>
                                    </Tooltip>
                                )}
                            </Paper>
                        ) : (
                            <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                                {title}
                            </Typography>

                        )}
                        {/*{ false && setTable && <TextField
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
                        </TextField> }*/}
                        {(showClearFilters) && (<Button onClick={clearFilters}>Clear filters</Button>)}
                        <IconButton onClick={() => getDataHandler()}><RefreshIcon></RefreshIcon></IconButton>
                        {(!!filterComponents.length) && <Tooltip title="Filter list">
                            <IconButton aria-label="filter list" onClick={()=>setExpanded(!expanded)}>
                                <FilterListIcon />
                            </IconButton>
                        </Tooltip>}
                    </Toolbar>
                </AccordionSummary>
                <AccordionDetails>
                    <ListPageFilterBar components={filterComponents}/>
                </AccordionDetails>
            </Accordion>


        </>
    );
}


/*
export const TableToolbar: React.FC<> (props) => {
    const classes = useToolbarStyles();
    const { numSelected,clearFilters, filterComponents, showClearFilters, collectionOperations, selected, setTable, allColumns = [] , title, getDataHandler} = props;
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
                        {(!!filterComponents.length) && <Tooltip title="Filter list">
                            <IconButton aria-label="filter list" onClick={handleChange}>
                                <FilterListIcon />
                            </IconButton>
                        </Tooltip>}
                    </Toolbar>
                </AccordionSummary>
                <AccordionDetails>
                    <ListPageFilterBar filterComponents={filterComponents}/>
                </AccordionDetails>
            </Accordion>


        </>
    );
};

*/
