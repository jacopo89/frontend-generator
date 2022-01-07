import {PropertyModel} from "../PropertyModel";
import {Errors} from "../../generators/errors/Errors";
import {Typography} from "@material-ui/core";
import React from "react";
import _ from 'lodash'
import {SingleInputProps, SingleInputPropsInterface} from "../models/InputProps";
import {PropertyFieldConfiguration} from "../configurations/PropertyFieldConfiguration";

interface SingleErrors{
    hasError:boolean,
    errorMessage?: string
}

export abstract class SinglePropertyModel extends PropertyModel{

    manipulateErrors(errors:Errors): SingleErrors {
        const errorMessage = errors.returnMessageByName(this.id);
        const hasError = errors.containsError(this.id);
        return {errorMessage, hasError};
    }

    getInputField(props: SingleInputPropsInterface, configuration?:PropertyFieldConfiguration): React.ReactElement<any, any> | null {
        const inputProps = new SingleInputProps(props);
        return this.setInputField(inputProps.handleForSet(), configuration);
    }

    getOutputField(props:SingleInputPropsInterface, configuration?:PropertyFieldConfiguration): React.ReactElement<any, any> | null {
        const inputProps = new SingleInputProps(props);
        if(configuration?.viewElement){
            return React.cloneElement(configuration.viewElement, props);
        }
        return <>
            {(configuration?.showLabel?? true)  && <Typography>{_.startCase(this.label)}</Typography>}
            {this.setOutputField(inputProps.handleForSet(), configuration)}
        </>
    }

    getFormValue(value:any){
        return value;
    }
}
