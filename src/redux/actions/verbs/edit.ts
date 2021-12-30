import { SubmissionError } from 'redux-form';
import { fetch } from '../dataAccess';
import {useState} from "react";
import {useDispatch} from "react-redux";
import {FEEDBACK_MESSAGE} from "../app/actions";
import {Form} from "../../../resource-models/formvalue/Form";

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

export function useEdit() {

    const [data, setData] = useState([]);
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const edit = async (resource:string,id:number,values:any, sendDispatch:boolean = true) => {
        setErrors({});
        setLoading(true);
        return fetch(`/api/${resource}/${id}`, { method: 'PATCH', body: JSON.stringify(values) })
            .then(response => {
                if(sendDispatch)dispatch(loadingMessage(resource,false));
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
    return {data, edit, errors, loading};
}
