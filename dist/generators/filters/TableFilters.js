import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import _ from "lodash";
import { FilterList } from "./FilterList";
import { useGetResourceModel } from "../../resource-models/modelsRegistry";
import { routeManipulatorWithFilters } from "../../utils/routeUtils";
export const useRouteFilters = (resourceNameToUse, operationName, presetFilters) => {
    const location = useLocation();
    const [routeFilters, setRouteFilters] = useState({});
    const [inheritedFilters, setInheritedFilters] = useState({});
    const [filterObject, setFilterObject] = useState({});
    const dispatch = useDispatch();
    const isEmbeddedTable = false;
    useEffect(() => { setFilterObject({}); }, [resourceNameToUse]);
    const getFiltersFromLocation = (location) => {
        const searchParams = new URLSearchParams(location.search);
        const routeFilters = {};
        // @ts-ignore
        for (let key of searchParams.keys()) {
            let value = searchParams.get(key);
            if (key.endsWith("[]")) {
                // @ts-ignore
                value = [value];
                key = key.substring(0, key.length - 2);
            }
            // @ts-ignore
            routeFilters[key] = value;
        }
        return routeFilters;
    };
    useEffect(() => {
        setInheritedFilters(presetFilters);
    }, [presetFilters]);
    useEffect(() => {
        if (inheritedFilters) {
            setFilterObject(inheritedFilters);
        }
    }, [inheritedFilters]);
    useEffect(() => {
        const filtersFromLocation = getFiltersFromLocation(location);
        if (!_.isEqual(routeFilters, filtersFromLocation)) {
            setRouteFilters(filtersFromLocation);
        }
    }, [location]);
    useEffect(() => {
        if (!isEmbeddedTable) {
            if (!_.isEqual(routeFilters, filterObject)) {
                setFilterObject(routeFilters);
            }
        }
    }, [routeFilters]);
    const checkIfFiltersEqualToRouteFilters = useCallback(() => {
        return _.isEqual(filterObject, routeFilters);
    }, [filterObject, routeFilters]);
    useEffect(() => {
        if (!isEmbeddedTable) {
            if (!checkIfFiltersEqualToRouteFilters()) {
                let route = location.pathname + "?";
                route = routeManipulatorWithFilters(route, filterObject);
                /*Object.keys(filterObject).forEach((key,index)=> {
                    if(index===0){
                        route = route.concat(`${key}=${filterObject[key]}`);
                    }else{
                        route = route.concat(`&${key}=${filterObject[key]}`);
                    }

                })*/
                window.location.href = route;
            }
        }
    }, [filterObject]);
    const clearFilters = () => setFilterObject({});
    const { operations, filters: modelFilters } = useGetResourceModel(resourceNameToUse);
    const model = operations.getOperationModel(operationName);
    const modelFi = getFinalFilters(modelFilters, {});
    const propsFiltersList = useMemo(() => { return { model: model, modelFilters: modelFi, filters: filterObject, setFilters: setFilterObject }; }, [model, modelFilters, filterObject]);
    const filterComponents = FilterList(propsFiltersList);
    return { filters: filterObject, components: filterComponents, clearFilters: clearFilters };
};
export const useTableFilters = (resourceName, operationName, propLockedFilters) => {
    const [filters, setFilters] = useState(propLockedFilters);
    const { filters: modelFilters, operations } = useGetResourceModel(resourceName);
    const model = operations.getOperationModel(operationName);
    const clearFilters = () => setFilters(propLockedFilters);
    const modelFi = getFinalFilters(modelFilters, propLockedFilters);
    const propsFiltersList = useMemo(() => { return { modelFilters: modelFi, filters: filters, setFilters: setFilters, model }; }, [modelFilters, model, filters, propLockedFilters]);
    const filterComponents = FilterList(propsFiltersList);
    return { filters: filters, components: filterComponents, clearFilters: clearFilters };
};
function removeLockedFiltersFromModelFilters(filters, lockedFilters) {
    Object.keys(lockedFilters).forEach(key => delete filters[key]);
    return filters;
}
function getFiltersAsKeyType(filters) {
    let finalFilters = {};
    if (filters) {
        Object.keys(filters).forEach(filterType => {
            const filterKeys = filters[filterType];
            filterKeys.forEach((filterKey) => {
                // @ts-ignore
                finalFilters[filterKey] = filterType;
            });
        });
    }
    return finalFilters;
}
function getFinalFilters(filters, lockedFilters) {
    const reorderedFilters = getFiltersAsKeyType(filters);
    return removeLockedFiltersFromModelFilters(reorderedFilters, lockedFilters);
}
