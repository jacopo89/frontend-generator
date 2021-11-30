import React, {Dispatch, SetStateAction, useState} from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import {lighten, makeStyles} from "@material-ui/core/styles";
import {TableHead} from "@material-ui/core";
import {Row} from "./table/Row";
import {HeadCell} from "./table/HeadCell";
import {Filter} from "../filters/Filter";
import {FilterComponent} from "../filters/FilterComponent";
import {FilterValue} from "../filters/TableFilters";

export type OrderType = 'asc' | 'desc'


interface TableHeadInterface{
    selectedIds: number[],
    rows: Row[],
    selectAllHandler: (event:React.ChangeEvent<HTMLInputElement>, checked:boolean)=>void,
    headCells:HeadCell[],
    filterComponents?: FilterComponent[],
    filterValues?: FilterValue[]
    setFilterValues:  Dispatch<SetStateAction<FilterValue[]>>
    order: OrderType


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


export const TableHeader: React.FC<TableHeadInterface> = ({selectedIds,rows,selectAllHandler,setFilterValues,filterValues=[], headCells, filterComponents=[],order}) =>{
    const numSelected = selectedIds.length
    const numRows = rows.length

    const orderComponents = filterComponents.filter((filterComponent: FilterComponent)=> filterComponent.isOrder)

    return <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < numRows}
                        checked={numRows > 0 && numSelected === numRows}
                        onChange={selectAllHandler}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell>
                {headCells.map((headCell, index) => {
                    const orderComponent: FilterComponent|undefined =  orderComponents.find((filterComponent: FilterComponent) => filterComponent.name === headCell.id)

                    const filterValue: FilterValue|undefined = filterValues.find((filterValue:FilterValue)=> filterValue.name===orderComponent?.name && filterValue.isOrder)
                    const sortHandler = ()=>{// @ts-ignore

                        const oldIndex = filterValues?.indexOf(filterValue);

                        // @ts-ignore
                        const newFilterValue = new FilterValue({name:orderComponent?.name, value:(filterValue?.value === "asc" ? "desc" : "asc"), isOrder:true})
                        if(oldIndex!==-1){
                            const newFilterValues = [...filterValues];
                            newFilterValues.splice(oldIndex,1, newFilterValue )
                            setFilterValues(newFilterValues)
                        }else{
                            setFilterValues([...filterValues, newFilterValue])
                        }
                    }
                    return <TableCell
                            key={index}
                            align={'left'}
                            padding={'none'}
                            sortDirection={filterValue?.name === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={filterValue?.name === headCell.id} //filterComponents.find((filterComponent:FilterComponent) => filterComponent.name === headCell.id)?.component
                                direction={filterValue?.value}
                                onClick={sortHandler}
                                hideSortIcon={!(orderComponent?.isOrder)}
                            >
                                {headCell.label}
                            </TableSortLabel>
                        </TableCell>
                    }
                )}
            </TableRow>
            <TableRow>
                <TableCell padding="checkbox">
                </TableCell>
                {filterComponents.length!==0 && headCells.map((headCell, index) => (
                    <TableCell
                        key={index}
                        align="left"
                        padding="none"
                    >
                        {filterComponents.find((filterComponent:FilterComponent) => filterComponent.name === headCell.id)?.component}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
}

/*
export function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowsCount, onRequestSort, headCells, filters = []} = props;
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
                            /!*onClick={createSortHandler(headCell.id)}*!/
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
*/
