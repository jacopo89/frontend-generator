import {
    fetch
} from '../dataAccess';
import {useState} from "react";
import {useDispatch} from "react-redux";

export const LISTING_LOADING = "LISTING_LOADING"

export function error(error) {
    return { type: 'GET_LISTING_ERROR', error };
}

export function loading(loading) {
    return { type: LISTING_LOADING, loading };
}

export function success(retrieved) {
    return { type: 'GET_LISTING_SUCCESS', retrieved };
}

function resolveAfter2Seconds() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('resolved');
        }, 2000);
    });
}

export function useGetListingGroup() {
    const [data, setData] = useState([]);
    const dispatch = useDispatch();

    const getListingGroup = async (resources) => {
        dispatch(loading(true));
        return fetch(`/api/resources/listings`, { method: 'POST', body: JSON.stringify(resources) })
            .then(response =>
                response
                    .json()
                    .then(retrieved => ({ retrieved }))
            )
            .then(({ retrieved, hubURL }) => {

                //dispatch(loading(false));
                dispatch(success(retrieved));
                setData(retrieved);
                return retrieved;
            })
            .catch(e => {
                dispatch(loading(false));
                dispatch(error(e.message));
            });
    }


    return {data, getListingGroup,loading};
}

