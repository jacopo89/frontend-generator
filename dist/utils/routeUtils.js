export function routeManipulatorWithFilters(route, filters) {
    filters.forEach((filter, index) => {
        let suffix = (index === 0) ? "" : "&";
        if (filter.isOrder) {
            route.concat(`${suffix}order[${filter.name}]=${filter.value}`);
        }
        else {
            if (Array.isArray(filter.value)) {
                route.concat(`${suffix}${filter.name}[]=${filter.value}`);
            }
            else {
                route.concat(`${suffix}${filter.name}=${filter.value}`);
            }
        }
        if (suffix === "") {
            suffix = "&";
        }
    });
    return route;
}
