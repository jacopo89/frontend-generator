import * as ActionTypes from '../../actions/app/actions';
import _ from 'lodash';
import { LISTING_LOADING } from "../../actions/verbs/get_listing";
import { GET_LOADING, GET_SUCCESS } from "../../actions/verbs/get";
import { GET_ONE_LOADING, GET_ONE_SUCCESS } from "../../actions/verbs/get_one";
const initialState = { resource: null, statusBar: { message: undefined, severity: "info" }, resourceBuffer: new Map(), listings: new Map(), listingLoading: false, registry: [] };
const appReducer = (state = initialState, action) => {
    if (action) {
        switch (action.type) {
            case ActionTypes.CHANGE_RESOURCE: {
                return Object.assign(Object.assign({}, state), { resource: action.resource });
            }
            case ActionTypes.SWITCH_THEME: {
                return Object.assign(Object.assign({}, state), { theme: action.theme });
            }
            case ActionTypes.FEEDBACK_MESSAGE: {
                return Object.assign(Object.assign({}, state), { statusBar: { message: action.message, severity: action.severity } });
            }
            case ActionTypes.CHANGE_RESOURCE_BUFFER: {
                const newResouceBufferMap = updateResourceBufferMap(state.resourceBuffer, action.resource, action.dependencies);
                return Object.assign(Object.assign({}, state), { resourceBuffer: newResouceBufferMap });
            }
            case ActionTypes.RESET_RESOURCE_BUFFER: {
                return Object.assign(Object.assign({}, state), { resourceBuffer: new Set() });
            }
            case ActionTypes.UPDATE_RESOURCE_LISTINGS: {
                console.info("GET LISTINGS SUCCESS");
                return Object.assign(Object.assign({}, state), { listings: action.listingsMap, listingLoading: false });
            }
            case ActionTypes.SET_REGISTRY: {
                return Object.assign(Object.assign({}, state), { registry: action.registry });
            }
            case LISTING_LOADING: {
                console.info("GET LISTINGS STARTING");
                return Object.assign(Object.assign({}, state), { listingLoading: action.loading });
            }
            case GET_SUCCESS: {
                return state;
            }
            case GET_LOADING: {
                return state;
            }
            case GET_ONE_SUCCESS: {
                console.info("GET RESOURCE SUCCESS");
                return state;
            }
            case GET_ONE_LOADING: {
                console.info("GET RESOURCE LOADING", action.loading);
                return state;
            }
            default: return state;
        }
    }
    return state;
};
export default appReducer;
function updateResourceBufferMap(resourceBufferMap, changingResource, changingDependencies) {
    const newResourceBufferMap = _.clone(resourceBufferMap);
    newResourceBufferMap.set(changingResource, changingDependencies);
    return newResourceBufferMap;
}
