import React from "react";
import {GenericFilterArray} from "./GenericFilterArray";
import {Model} from "../../resource-models/Model";
import {GetListingsMap} from "../../utils/referenceFieldUtils";
import {filterOnChangeHandler} from "../forms/formHelpers";

interface Props{
    model:Model;
    modelFilters:any;
    filters:any;
    setFilters:any;
}

export const FilterList = ({model,modelFilters,filters, setFilters}:Props) => {

    const {referencesMap} = GetListingsMap(model);
    const filterFieldOnChange = (type:string) =>{
        return (...vars:any)=> filterOnChangeHandler(type, setFilters, filters, vars);
    }

    return GenericFilterArray({
        model: model,
        modelFilters: modelFilters,
        referencesMap: referencesMap,
        inputFieldOnChange: filterFieldOnChange,
        filterValue: filters
    });

}
