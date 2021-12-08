export const routeManipulatorWithFilters = (route, filters) => {
    const urlSearchParams = new URLSearchParams();
    filters.forEach((filter, index) => {
        debugger;
        if (filter.isOrder) {
            urlSearchParams.append(`order[${filter.name}]`, filter.value);
        }
        else {
            if (Array.isArray(filter.value)) {
                filter.value.forEach(value => urlSearchParams.append(`${filter.name}[]`, value));
            }
            else {
                urlSearchParams.append(filter.name, filter.value);
            }
        }
    });
    return urlSearchParams;
};
