import {FilterType} from "../filters/Filter";
import {FilterValue} from "../filters/TableFilters";
import {Dispatch, SetStateAction} from "react";
import {
    BOOLEAN,
    EMBEDDED_MULTIPLE,
    EMBEDDED_SINGLE,
    ENUM_SINGLE,
    FILE_MULTIPLE,
    FILE_SINGLE, PHONE,
    REFERENCE
} from "./inputs/InputTypes";

export function onFilterChange(type:FilterType, setFilterValues:Dispatch<SetStateAction<FilterValue[]>>, filterValues:FilterValue[], vars:any[]){

    const  changeFilterValue = (name:string, value:any) => {
        const filterValue: FilterValue|undefined = filterValues.find((filterValue:FilterValue)=> filterValue.name===name && !filterValue.isOrder)
        // @ts-ignore
        const oldIndex = filterValues?.indexOf(filterValue);
        const newFilterValues = [...filterValues];
        // @ts-ignore
        newFilterValues.splice(oldIndex,1, new FilterValue({name, value}))
        setFilterValues(newFilterValues)
    }

    const fileOnChange = (vars:any[]) => {

        const [name, value] = vars;
        changeFilterValue(name, value);
    }


    const controlledOnChange = (vars:any[]) =>{
        const [event] = vars;
        const target = event.target;
        let value = target.value;
        const name = target.name;
        changeFilterValue(name,value)
    }
    const checkboxOnChange = (vars:any[]) =>{
        const [name, value] = vars;

        changeFilterValue(name, value)
    }

    const autoCompleteOnchange = (vars:any[]) => {
        const [name, value] = vars;
        changeFilterValue(name, value)

    }

    const phoneOnChange = (vars:any[]) =>{

    }

    const embeddedOnChange = (vars:any[])=> {};



    switch (type){

        case REFERENCE:{
            return autoCompleteOnchange(vars);
        }
        case EMBEDDED_MULTIPLE:{
            return embeddedOnChange(vars);
        }
        case EMBEDDED_SINGLE:{
            return embeddedOnChange(vars);
        }
        case ENUM_SINGLE:{
            return autoCompleteOnchange(vars);
        }
        case FILE_SINGLE:{
            return fileOnChange(vars);
        }
        case FILE_MULTIPLE:{
            return fileOnChange(vars);
        }
        case BOOLEAN:{
            return checkboxOnChange(vars);
        }
        case PHONE: {
            return phoneOnChange(vars);
        }
        default:{
            return controlledOnChange(vars);
        }

    }

}
