export const CHANGE_RESOURCE: "CHANGE_RESOURCE";
export const CHANGE_RESOURCE_BUFFER: "CHANGE_RESOURCE_BUFFER";
export const SWITCH_THEME: "SWITCH_THEME";
export const FEEDBACK_MESSAGE: "FEEDBACK_MESSAGE";
export const RESET_RESOURCE_BUFFER: "RESET_RESOURCE_BUFFER";
export const UPDATE_RESOURCE_LISTINGS: "UPDATE_RESOURCE_LISTINGS";
export const SET_REGISTRY: "SET_REGISTRY";
export function changeResource(resource: any): {
    type: string;
    resource: any;
};
export function changeResourceBuffer(resource: any, dependencies: any): {
    type: string;
    resource: any;
    dependencies: any;
};
export function resetResourceBuffer(): {
    type: string;
};
export function updateResourceListings(listings: any): {
    type: string;
    listingsMap: any;
};
export function updateRegistry(registry: any): {
    type: string;
    registry: any;
};
