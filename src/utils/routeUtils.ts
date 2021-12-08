import {FilterValue} from "../generators/filters/TableFilters";


export const routeManipulatorWithFilters = (route:string, filters:any) => {
    const urlSearchParams = new URLSearchParams();

    filters.forEach((filter:FilterValue, index:number) => {
        debugger;
        if(filter.isOrder){
            urlSearchParams.append(`order[${filter.name}]`,filter.value)
        }else{
            if(Array.isArray(filter.value)){
                filter.value.forEach(value => urlSearchParams.append(`${filter.name}[]`,value) )
            }else{
                urlSearchParams.append(filter.name,filter.value)
            }
        }
    })

    return urlSearchParams;
}
