export const CHANGE_RESOURCE = "CHANGE_RESOURCE";
export const CHANGE_RESOURCE_BUFFER = "CHANGE_RESOURCE_BUFFER";
export const SWITCH_THEME = "SWITCH_THEME";
export const FEEDBACK_MESSAGE = "FEEDBACK_MESSAGE";
export const RESET_RESOURCE_BUFFER = "RESET_RESOURCE_BUFFER";
export const UPDATE_RESOURCE_LISTINGS = "UPDATE_RESOURCE_LISTINGS";
export const SET_REGISTRY = "SET_REGISTRY";

export const changeResource = (resource) =>{
    return {
        type: CHANGE_RESOURCE,
        resource: resource
    }
}

export const changeResourceBuffer = (resource, dependencies) => {
    return {
        type: CHANGE_RESOURCE_BUFFER,
        resource: resource,
        dependencies: dependencies
    }
}

export const resetResourceBuffer = () => {
    return {
        type: RESET_RESOURCE_BUFFER,
    }
}

export const updateResourceListings = (listings) => {
    return {
        type: UPDATE_RESOURCE_LISTINGS,
        listingsMap: listings
    }
}

export const updateRegistry = (registry) => {
    return {
        type: SET_REGISTRY,
        registry: registry
    }
}
