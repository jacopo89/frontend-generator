import { SubmissionError } from 'redux-form';
import { fetch } from '../dataAccess';
import {useState} from "react";
import {useDispatch} from "react-redux";
import {FEEDBACK_MESSAGE} from "../app/actions";
import {Operation} from "../../../resource-models/actions/Operation";

export function genericError(message:string) {
    return { type: FEEDBACK_MESSAGE, message:message, severity:"error"};
}

export function genericSuccess() {
    return { type: FEEDBACK_MESSAGE, message:"Edit Success", severity:"success"};
}

export function loadingMessage(resource:string, loading:boolean) {
    return { type: 'PATCH_LOADING', resource:resource, loading:loading };
}

export function success(resource:string,created:boolean) {
    return { type: 'PATCH_SUCCESS', resource:resource, created: created };
}

export function useItemOperation(resourceName:string, operation:Operation) {

    const [data, setData] = useState([]);
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);


    // @ts-ignore
    const operationsRoute = (operation.path) ? (id) => operation.path.path(id) : (id) => `/api/${resourceName}/${id}`;

    const sendDispatch = (operation.method !== "GET");
    const action= async (propId:number, values:any) => {
                    setErrors({});
                    setLoading(true);
                    return fetch(operationsRoute(propId), { method: operation.method, body: JSON.stringify(values) })
                        .then(response => {
                            if(sendDispatch)dispatch(loadingMessage(resourceName,false));
                            setLoading(false);
                            return response.json();
                        })
                        .then(retrieved => {
                            setData(retrieved);
                            if(sendDispatch)dispatch(genericSuccess())
                            return retrieved;
                        })
                        .catch(e => {
                            setLoading(false);
                            if(e instanceof SubmissionError){
                                if(sendDispatch)dispatch(genericError(e.message))
                                setErrors(e.errors);

                            }else{
                                if(sendDispatch)dispatch(genericError(e.message))
                            }
                            throw new Error(e.message);
                        });
                }

    return {data, action, errors, loading};
}


interface CollectionResponseInterface {
    totalItems: number;
    list: any[]
}

class CollectionResponse {
    totalItems: number;
    list: any[]

    constructor({ totalItems, list }:CollectionResponseInterface) {
        this.totalItems= totalItems
        this.list = list
    }

}

export function useCollectionOperation(resourceName:string, operation:Operation) {

    const [data, setData] = useState<CollectionResponse>(new CollectionResponse({totalItems:0, list:[]}));
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);


    // @ts-ignore
    const operationsRoute: () => string = (operation.path) ? () => operation.path.path() : () => `/api/${resourceName}/`;

    const sendDispatch = (operation.method !== "GET");

    const action = async (...values:any[]) => {
        setErrors({});
        setLoading(true);
        if(operation.method === "GET"){
            const [page, filters] = values
            return fetch(operationsRoute(), { method: operation.method})
                .then(response => response.json())
                .then(retrieved =>{return ({data: retrieved["hydra:member"], totalItems: retrieved["hydra:totalItems"]})})
                .then(({ data, totalItems }) => {
                    setData(new CollectionResponse({list:data, totalItems:totalItems}));
                    setLoading(false);
                    return {data, totalItems}
                })
                .catch(e => {
                    setLoading(false);
                    if(e instanceof SubmissionError){
                        if(sendDispatch)dispatch(genericError(e.message))
                        setErrors(e.errors);

                    }else{
                        if(sendDispatch)dispatch(genericError(e.message))
                    }
                    throw new Error(e.message);
                });
        }else if(operation.method === "PATCH" || operation.method === "PUT"){

        }else if(operation.method === "POST"){

        }


    }
    return {data, action, errors, loading};
}
