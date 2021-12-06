import {FilterValue} from "../generators/filters/TableFilters";

export function routeManipulatorWithFilters(route:string, filters:FilterValue[]):string{

    filters.forEach((filter:FilterValue, index:number) => {
        let suffix = (index===0)? "" : "&";
        if(filter.isOrder){
            route.concat(`${suffix}order[${filter.name}]=${filter.value}`)
        }else{
            if(Array.isArray(filter.value)){
                route.concat(`${suffix}${filter.name}[]=${filter.value}`)
            }else{
                route.concat(`${suffix}${filter.name}=${filter.value}`)
            }

        }

        if(suffix===""){
            suffix = "&";
        }
    })

    return route;
}
