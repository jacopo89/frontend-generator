import { Resource } from "./Resource";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { updateRegistry } from "../redux/actions/app/actions";
import _ from 'lodash';
export function useGetResourceModel(resourceName) {
    var _a;
    const state = useSelector(state => state);
    // @ts-ignore
    return (_a = state.appReducer.registry.find(({ resource, name }) => name === resourceName)) === null || _a === void 0 ? void 0 : _a.resource;
}
/**
 * This method allows to fetch the model from the backend and put it the redux store.
 * @param overrideRegistry is a frontend override of the properties
 * @param route where to fetch the model.
 *
 * Returns true when the model has been fetched.
 */
export function useSetResourceModel(overrideRegistry, route = "/resources") {
    const [modelLoaded, setModelLoaded] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        fetch(route).then(response => response.json().then(retrieved => retrieved)).then(retrieved => {
            const registry = override(retrieved, overrideRegistry);
            const arrayRegistry = Object.keys(registry).map(resourceName => { return { name: resourceName, resource: new Resource(registry[resourceName]) }; });
            dispatch(updateRegistry(arrayRegistry));
            setModelLoaded(true);
        });
    }, []);
    return modelLoaded;
}
export function useSetRegistry(registry) {
    const [modelLoaded, setModelLoaded] = useState(false);
    const arrayRegistry = Object.keys(registry).map(resourceName => { return { name: resourceName, resource: new Resource(registry[resourceName]) }; });
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(updateRegistry(arrayRegistry));
        setModelLoaded(true);
    }, []);
    return modelLoaded;
}
export function override(original, overrideElement) {
    return _.merge(original, overrideElement);
}
