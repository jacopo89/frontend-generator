import React from "react";
import {Grid} from "@material-ui/core";
import {PropertyModel} from "../../resource-models/PropertyModel";
import {Model} from "../../resource-models/Model";
import {Errors} from "../errors/Errors";
import {Form} from "../../resource-models/formvalue/Form";
import {Record} from "../../resource-models/Record";
import {PropertyFieldConfiguration} from "../../resource-models/configurations/PropertyFieldConfiguration";

interface FormContentInterface {
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
    setForm: React.Dispatch<React.SetStateAction<Form>>;
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
export const FormContent: React.FC<FormContentInterface> = (props) => {

    const { model, lockedFormValue, configuration}=props;
    if(configuration.viewElement){
        return React.cloneElement(configuration.viewElement, props);
    }

    return <Grid container spacing={2}>
        {model.properties.map((propertyModel:PropertyModel, index:number) => {
                const xs = 12; const md = 6;
                return <Grid item xs={xs} md={md} key={index}>
                    {!lockedFormValue.has(propertyModel.id) && model.getInputField(propertyModel.id,props)}
                </Grid>
            }
        )}
    </Grid>
}









