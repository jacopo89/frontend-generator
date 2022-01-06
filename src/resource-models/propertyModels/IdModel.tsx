import {PropertyModel} from "../PropertyModel";
import {Errors} from "../../generators/errors/Errors";
import {PropertyFieldConfiguration} from "../configurations/PropertyFieldConfiguration";
import React from "react";
import {SingleSetInputFieldProps} from "../models/SetInputFieldProps";
import {SingleInputPropsInterface} from "../models/InputProps";

export class IdModel extends PropertyModel{
    setInputField(props: SingleSetInputFieldProps,configuration?:PropertyFieldConfiguration): React.ReactElement<any, any> | null {
        return <></>
    }

    getInputOnChangeHandler({formValue, setFormValue}: any): (vars: any) => void {
        return function (p1: any) {
        };
    }

    setOutputField(props: any): React.ReactElement<any, any> | null {
        return <>{props.record}</>;
    }

    manipulateErrors(errors: Errors): any {
    }

    getInputField(props: SingleInputPropsInterface, configuration?:PropertyFieldConfiguration): React.ReactElement<any, any> | null {
        return null;
    }

    getOutputField(props: any, {viewElement}: PropertyFieldConfiguration): React.ReactElement<any, any> | null {
        if(viewElement){
            return React.cloneElement(viewElement, props)
        }
        return this.setOutputField(props);
    }

    getRecord(jsonValue: any): any {
        return jsonValue;
    }

    getFormValue(value: any): any {
        return value;
    }

    getJsonFormValue(value: any): any {
        return value;
    }

}
