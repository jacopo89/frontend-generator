var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { SubmissionError } from 'redux-form';
import { fetch, ldfetch } from '../dataAccess';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { FEEDBACK_MESSAGE } from "../app/actions";
import { CollectionResponse } from "./CollectionResponse";
import { ItemResponse } from "./ItemResponse";
export function genericError(message) {
    return { type: FEEDBACK_MESSAGE, message: message, severity: "error" };
}
export function genericSuccess() {
    return { type: FEEDBACK_MESSAGE, message: "Edit Success", severity: "success" };
}
export function loadingMessage(resource, loading) {
    return { type: 'PATCH_LOADING', resource: resource, loading: loading };
}
export function success(resource, created) {
    return { type: 'PATCH_SUCCESS', resource: resource, created: created };
}
export function useItemOperation(resourceName, operation) {
    const [data, setData] = useState([]);
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    // @ts-ignore
    const operationsRoute = (operation.path) ? (id) => operation.path.path(id) : (id) => `/api/${resourceName}/${id}`;
    const sendDispatch = (operation.method !== "GET");
    const action = (propId, values) => __awaiter(this, void 0, void 0, function* () {
        setErrors({});
        setLoading(true);
        return fetch(operationsRoute(propId), { method: operation.method, body: JSON.stringify(values) })
            .then(response => {
            if (sendDispatch)
                dispatch(loadingMessage(resourceName, false));
            setLoading(false);
            return response.json();
        })
            .then(retrieved => {
            setData(retrieved);
            if (sendDispatch)
                dispatch(genericSuccess());
            return retrieved;
        })
            .catch(e => {
            setLoading(false);
            if (e instanceof SubmissionError) {
                if (sendDispatch)
                    dispatch(genericError(e.message));
                setErrors(e.errors);
            }
            else {
                if (sendDispatch)
                    dispatch(genericError(e.message));
            }
            throw new Error(e.message);
        });
    });
    return { data, action, errors, loading };
}
export function useCollectionOperation(resourceName, operation) {
    const [data, setData] = useState(new CollectionResponse({ totalItems: 0, list: [] }));
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    // @ts-ignore
    const operationsRoute = (operation.path) ? () => operation.path.path() : () => `/api/${resourceName}`;
    const sendDispatch = (operation.method !== "GET");
    const action = (...values) => __awaiter(this, void 0, void 0, function* () {
        setErrors({});
        setLoading(true);
        if (operation.method === "GET") {
            let route = operationsRoute();
            return ldfetch(route, { method: operation.method })
                .then(response => response.json())
                .then(retrieved => { return ({ data: retrieved["hydra:member"], totalItems: retrieved["hydra:totalItems"] }); })
                .then(({ data, totalItems }) => {
                setData(new CollectionResponse({ list: data, totalItems: totalItems }));
                setLoading(false);
                return { data, totalItems };
            })
                .catch(e => {
                setLoading(false);
                if (e instanceof SubmissionError) {
                    if (sendDispatch)
                        dispatch(genericError(e.message));
                    setErrors(e.errors);
                }
                else {
                    if (sendDispatch)
                        dispatch(genericError(e.message));
                }
                throw new Error(e.message);
            });
        }
        else if (operation.method === "PATCH" || operation.method === "PUT") {
        }
        else if (operation.method === "POST") {
        }
    });
    return { data, action, errors, loading };
}
export function useOperation(resourceName, operation) {
    const initializedResponse = operation.responseType === "item" ? new ItemResponse({}) : new CollectionResponse({ totalItems: 0, list: [] });
    const [data, setData] = useState(initializedResponse);
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const sendDispatch = (operation.method !== "GET");
    const action = (...values) => __awaiter(this, void 0, void 0, function* () {
        setErrors({});
        setLoading(true);
        let route;
        if (operation.method === "GET") {
            if (operation.operationType === "item") {
                // @ts-ignore
                let operationRoute = (operation.path) ? (id) => `/api${operation.path.path(id)}` : (id) => `/api/${resourceName}/${id}`;
                const [id] = values;
                route = operationRoute(id);
            }
            else {
                // @ts-ignore
                let operationRoute = (operation.path) ? () => operation.path.path() : () => `/api/${resourceName}`;
                const [page, filters] = values;
                route = operationRoute();
                const urlSearchParams = filterManipulator(filters);
                urlSearchParams.append("page", page);
                route = route + "?" + urlSearchParams.toString();
            }
            // @ts-ignore
            return ldfetch(route, { method: operation.method })
                .then(response => response.json())
                .then((response) => {
                if (operation.responseType === "collection") {
                    const list = response["hydra:member"];
                    const totalItems = response["hydra:totalItems"];
                    setData(new CollectionResponse({ list: list, totalItems: totalItems }));
                }
                else {
                    setData(new ItemResponse(response));
                }
                setLoading(false);
                return data;
            })
                .catch(e => {
                setLoading(false);
                if (e instanceof SubmissionError) {
                    if (sendDispatch)
                        dispatch(genericError(e.message));
                    setErrors(e.errors);
                }
                else {
                    if (sendDispatch)
                        dispatch(genericError(e.message));
                }
                throw new Error(e.message);
            });
        }
        else if (operation.method === "PATCH" || operation.method === "PUT") {
            const [id] = values;
            // @ts-ignore
            let operationRoute = (operation.path) ? (id) => operation.path.path(id) : (id) => `/api/${resourceName}/${id}`;
            return ldfetch(operationRoute(id), { method: operation.method })
                .then(response => response.json())
                .then((response) => {
                setData(new ItemResponse(response));
                setLoading(false);
                return data;
            })
                .catch(e => {
                setLoading(false);
                if (e instanceof SubmissionError) {
                    if (sendDispatch)
                        dispatch(genericError(e.message));
                    setErrors(e.errors);
                }
                else {
                    if (sendDispatch)
                        dispatch(genericError(e.message));
                }
                throw new Error(e.message);
            });
        }
        else if (operation.method === "POST") {
            const [id] = values;
            // @ts-ignore
            let operationRoute = (operation.path) ? (id) => operation.path.path(id) : (id) => `/api/${resourceName}/${id}`;
            return ldfetch(operationRoute(id), { method: operation.method })
                .then(response => response.json())
                .then((response) => {
                if (operation.responseType === "collection") {
                    const list = response["hydra:member"];
                    const totalItems = response["hydra:totalItems"];
                    setData(new CollectionResponse({ list: list, totalItems: totalItems }));
                }
                else {
                    setData(new ItemResponse(response));
                }
                setLoading(false);
                return data;
            })
                .catch(e => {
                setLoading(false);
                if (e instanceof SubmissionError) {
                    if (sendDispatch)
                        dispatch(genericError(e.message));
                    setErrors(e.errors);
                }
                else {
                    if (sendDispatch)
                        dispatch(genericError(e.message));
                }
                throw new Error(e.message);
            });
        }
    });
    return { data, action, errors, loading };
}
function filterManipulator(filters) {
    const urlSearchParams = new URLSearchParams();
    filters.forEach((filter, index) => {
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
}
