import { fetch } from '../dataAccess';
import { useState } from "react";
import { useDispatch } from "react-redux";
export function error(error) {
    return { type: 'GET_ERROR', error };
}
export function loading(loading) {
    return { type: GET_LOADING, loading };
}
export const GET_LOADING = "GET_LOADING";
export const GET_SUCCESS = "GET_SUCCESS";
export function success(retrieved) {
    return { type: GET_SUCCESS, retrieved };
}
export function useGet() {
    const [data, setData] = useState();
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const get = (route) => {
        dispatch(loading(true));
        setErrors({});
        return fetch(`${route}`)
            .then(response => response.json())
            .then(retrieved => ({ retrieved }))
            .then(({ retrieved, hubURL }) => {
            dispatch(loading(false));
            dispatch(success(retrieved));
            setData(retrieved);
            return retrieved;
        })
            .catch(e => {
            dispatch(loading(false));
            dispatch(error(e.message));
            setErrors(e.errors);
            throw new Error(e.message());
        });
    };
    return { data, get };
}
