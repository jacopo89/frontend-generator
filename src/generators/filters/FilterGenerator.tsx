import {GetListingsMap} from "../../utils/referenceFieldUtils";
import {filterOnChangeHandler} from "../forms/formHelpers";
import BooleanFilter from "./inputs/BooleanFilter";
import ReferenceFilter from "./inputs/ReferenceFilter";
import TextFilter from "./inputs/TextFilter";
import {AutoCompleteFilter} from "./inputs/AutoCompleteFilter";
import ReferenceMultipleFilter from "./inputs/ReferenceMultipleFilter";
import {Filter, FilterType} from "./Filter";
import {Model} from "../../resource-models/Model";
import {FilterValue} from "./TableFilters";
import React, {Dispatch, SetStateAction} from "react";
import {FilterComponent} from "./FilterComponent";
import {onFilterChange} from "../forms/FilterFormHelpers";

interface GetFilterComponentInterface {
    model:Model,
    filterValues: FilterValue[],
    filters: Filter[],
    setFilterValues: Dispatch<SetStateAction<FilterValue[]>>
}

export function getFilterComponents({model, filters,filterValues,setFilterValues }:GetFilterComponentInterface){
    const {referencesMap} = GetListingsMap(model);
    const filterFieldOnChange = (type:FilterType) =>{
        return (...vars:any)=> onFilterChange(type, setFilterValues, filterValues, vars);
    }

    const getFilter:any = (name:string, type: FilterType) => {
        const value = filterValues.find((filterValue)=> filterValue.name === name && !filterValue.isOrder)?.value;
        switch (type) {
            case "boolean": {
                return new FilterComponent({
                    name,
                    type: "boolean",
                    component: <BooleanFilter name={name} type={type} inputFieldOnChange={filterFieldOnChange} value={value}/>})
            }
            case "reference":{
                const propertyModel = model.getProperty(name);
                const options = referencesMap.get(propertyModel.resourceName);
                return  new FilterComponent({
                    name: name,
                    type:"reference",
                    component: <ReferenceFilter key={name} inputFieldOnChange={filterFieldOnChange} text={name} modelItem={propertyModel} options={options} inheritedValue={value}/>
                })
            }
            case "string": {
                return new FilterComponent({
                    name: name,
                    type:"string",
                    component: <TextFilter label={model.getProperty(name).label} key={name} name={name} type={type} inputFieldOnChange={filterFieldOnChange} value={value}/>})
            }
            case "enum": {
                const propertyModel = model.getProperty(name);
                const {options} = propertyModel;

                return new FilterComponent({
                    name: name,
                    type:"enum",
                    component: <AutoCompleteFilter key={name} name={name}
                                                   inputFieldOnChange={filterFieldOnChange} options={options}
                                                   value={value}/>
                })
            }
            case "enum_multiple": {

                const propertyModel = model.getProperty(name);
                const {options} = propertyModel;

                return new FilterComponent({
                    name: name,
                    type:"enum_multiple",
                    component: <ReferenceMultipleFilter  key={name} text={name} modelItem={propertyModel}
                                                         inputFieldOnChange={filterFieldOnChange} options={options}
                                                         inheritedValue={value}/>
                })

            }
            case "order":{
                return new FilterComponent({
                    name,
                    type: "order",
                    isOrder: true
                })
            }
        }
    }

    return filters.map(filter => getFilter(filter.name, filter.type))
    //return (Object.keys(modelFilters).length!==0) ? Object.keys(modelFilters).map(filterKey => getFilter(filterKey, modelFilters[filterKey])) : [];
}
