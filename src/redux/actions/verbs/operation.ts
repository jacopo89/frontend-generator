import { SubmissionError } from 'redux-form';
import { fetch } from '../dataAccess';
import {useState} from "react";
import {useDispatch} from "react-redux";
import {FEEDBACK_MESSAGE} from "../app/actions";
import {FormValue} from "../../../resource-models/formvalue/FormValue";
import {Operation} from "../../../resource-models/actions/Operation";
import any = jasmine.any;

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

export function useOperation(resourceName:string, operation:Operation) {

    const [data, setData] = useState([]);
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    let action;
    const parameters = (operation.path) ? operation.path.parameters : null;
    const parametersString = (parameters!==null) ? eval(parameters.join(",")): eval("id");
    const operationsRoute = (operation.path) ? eval(operation.path.path) : eval("`/api/${resourceName}/${id}`");
    switch (operation.operationType){
        case "item":{
            action= (parametersString:any) => async (parametersString:any,values:any, sendDispatch:boolean = true) => {
                setErrors({});
                setLoading(true);
                return fetch(operationsRoute, { method: operation.method, body: JSON.stringify(values) })
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
        }
        break;
        case "collection":{
            action = (parametersString:any) => async (values:any, sendDispatch:boolean = true) => {
                setErrors({});
                setLoading(true);
                return fetch(`/api/${resourceName}/`, { method: operation.method, body: JSON.stringify(values) })
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
        }
        break;
        default: throw new Error("This operation is neither item nor collection")
    }


    const finalAction = action(parametersString);
    return {data, finalAction, errors, loading};
}
