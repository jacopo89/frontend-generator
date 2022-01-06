import React from "react";
import {Grid} from "@material-ui/core";
import {PropertyModel} from "../../resource-models/PropertyModel";
import {Model} from "../../resource-models/Model";
import {Errors} from "../errors/Errors";
import {Form} from "../../resource-models/formvalue/Form";
import {Record} from "../../resource-models/Record";
import {InputProps} from "../../resource-models/models/InputProps";
import {PropertyFieldConfiguration} from "../../resource-models/configurations/PropertyFieldConfiguration";

interface FormContentProps {
    submitHandler: (e:any) => Promise<any>;
    loading: boolean,
    partialSubmitHandler: (e: any) => Promise<any>;
    model: Model;
    record?: Record;
    referencesMap: any;
    refreshReferencesMap: () => void;
    formValue: Form;
    form: Form;
    lockedFormValue:Form;
    errors: Errors;
    setFormValue: React.Dispatch<React.SetStateAction<Form>>;
    refresh:()=>void,
    configuration: PropertyFieldConfiguration
}

/**
 *
 * @constructor
 *
 * FormContent component is responsible for overriding the form, passing all the required props
 * @param props
 */
export const FormContent: React.FC<FormContentProps> = (props) => {

    const {partialSubmitHandler,loading, form, submitHandler, model, referencesMap ,refreshReferencesMap, formValue, lockedFormValue, setFormValue, errors, configuration, record, refresh}=props;
    if(configuration.viewElement){
        return React.cloneElement(configuration.viewElement, props);
    }

    return <Grid container spacing={2}>
        {model.properties
            .map((propertyModel:PropertyModel, index:number) => {
                const {xs,md} = propertyModel;
                const props = new InputProps({showLabel:true, model:propertyModel,partialSubmitHandler, submitHandler, loading, referencesMap ,refreshReferencesMap, formValue, record:record?.getPropertyRecord(propertyModel.id), recordValue:record?.getPropertyRecord(propertyModel.id), lockedFormValue, setFormValue, errors, refresh, form})
                return <Grid item xs={xs} md={md} key={index}>
                    {!lockedFormValue.has(propertyModel.id) && propertyModel.getPropertyField(props,configuration.isEdit)}
                </Grid>
            }
        )}
    </Grid>
}









