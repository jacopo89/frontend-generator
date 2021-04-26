import { fetch } from '../dataAccess';
import { useState } from "react";
import { useDispatch } from "react-redux";
export function error(error) {
    return { type: 'GET_ONE_ERROR', error };
}
export function loading(loading) {
    return { type: 'GET_ONE_LOADING', loading };
}
export function success(retrieved) {
    return { type: 'GET_ONE_SUCCESS', retrieved };
}
export function useGetOne() {
    const [data, setData] = useState();
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const getOne = (resourceName, id) => {
        setErrors({});
        fetch(`/api/${resourceName}/${id}`)
            .then(response => response
            .json()
            .then(retrieved => ({ retrieved })))
            .then(({ retrieved, hubURL }) => {
            dispatch(loading(false));
            dispatch(success(retrieved));
            setData(retrieved);
        })
            .catch(e => {
            dispatch(loading(false));
            dispatch(error(e.message));
            setErrors(e.errors);
        });
    };
    return { data, getOne };
}
