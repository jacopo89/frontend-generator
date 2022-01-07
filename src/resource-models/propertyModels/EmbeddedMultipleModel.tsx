import React from "react";
import {EmbeddedPropertyModel} from "./NestedPropertyModel";
import {IterableFormContent} from "../../generators/forms/IterableFormContent";
import {IterableShowContent} from "../../generators/fields/IterableShowContent";
import {Record} from "../Record";
import {Form} from "../formvalue/Form";
import {EmbeddedMultipleInputProps, EmbeddedMultipleInputPropsInterface} from "../models/InputProps";
import {EmbeddedMultipleSetInputFieldProps} from "../models/SetInputFieldProps";
import {PropertyFieldConfigurationInterface} from "../configurations/PropertyFieldConfiguration";
import {Typography} from "@material-ui/core";
import _ from "lodash";


export class EmbeddedMultipleModel extends EmbeddedPropertyModel{

    setInputField(props: EmbeddedMultipleSetInputFieldProps, configuration?: PropertyFieldConfigurationInterface): React.ReactElement<any, any> | null {

        const {formValue, recordValue, form, setFormValue, refreshReferencesMap, referencesMap, errors, partialSubmitHandler, submitHandler, loading, record, refresh} =  props;
        const setParentFormValue = (values:any) => {
            setFormValue( formValue.set(props.model.id, values));
        }
        const newErrors = this.manipulateErrors(errors);

        // @ts-ignore
        const formValueArray = (formValue) ? formValue[this.id] : [];
        // @ts-ignore
        const recordMap = (record) ? record : new Map();

        return IterableFormContent({
            model:this.getResource().getModel(),
            resourceName:this.resourceName,
            setParentFormValue:setParentFormValue,
            formContent: configuration?.viewElement,
            referencesMap:referencesMap,
            refreshReferencesMap:refreshReferencesMap,
            errors:newErrors,
            formValueArray: formValueArray,
            formValue: formValue,
            form: form,
            label:this.label,
            partialSubmitHandler:partialSubmitHandler,
            submitHandler:submitHandler,
            record: recordMap,
            recordValue: recordMap,
            refresh:refresh,
            loading:loading
        })
    }

    getInputField(props: EmbeddedMultipleInputPropsInterface, configuration?: PropertyFieldConfigurationInterface): React.ReactElement<any, any> | null {
        const newProps = new EmbeddedMultipleInputProps(props)
        return this.setInputField(newProps.handleForSet(), configuration);
    }

    getInputOnChangeHandler({formValue, setFormValue}: any): (vars: any) => void {
        return function (p1: any) {
        };
    }

    getOutputField(props:EmbeddedMultipleInputPropsInterface, configuration?: PropertyFieldConfigurationInterface): React.ReactElement<any, any> | null {
        const {showLabel} = props;
        return <>
            {showLabel && <Typography>{_.startCase(this.label)}</Typography>}
        {this.setOutputField(props,configuration )}
        </>
    }

    setOutputField({record, form, model, setFormValue, loading, formValue, errors, referencesMap, refreshReferencesMap, refresh, partialSubmitHandler, submitHandler  }: EmbeddedMultipleInputPropsInterface, configuration?:PropertyFieldConfigurationInterface): React.ReactElement<any, any> | null {
        const setParentFormValue = (values:any) => {setFormValue( formValue.set(model.id, values));}

        const newErrors = this.manipulateErrors(errors);
        // @ts-ignore
        const formValueArray = (formValue) ? formValue[this.id] : [];
        // @ts-ignore
        const recordMap = (record) ? record : new Map();

        return<>
            {/*{(configuration?.showLabel?? true)  && <Typography>{_.startCase(this.label)}</Typography>}*/}
            {IterableShowContent({
                model:this.getResource().getModel(),
                resourceName:this.resourceName,
                setParentFormValue:setParentFormValue,
                formContent: configuration?.viewElement,
                referencesMap:referencesMap,
                refreshReferencesMap:refreshReferencesMap,
                errors:newErrors,
                form: form,
                formValueArray: formValueArray,
                label:this.label,
                partialSubmitHandler:partialSubmitHandler,
                submitHandler:submitHandler,
                inputElement:configuration?.viewElement,
                showElement: configuration?.viewElement,
                record: recordMap,
                refresh:refresh,
                loading:loading
            })}
        </>



    }

    getRecord(jsonValue: any[]): Map<number, Record> {
        const map = new Map<number,Record>();
        jsonValue.forEach((element:any, index:number) => {
            if(typeof element === "object"){
                map.set(index, Record.createFromJson(element,this.getResource().getModel()))
            }else{
                map.set(index, element)
            }
        })
        return map;
    }

    getFormValue(value: Map<string, Record>): any {
        const map = new Map();
        const nestedEntries = Array.from(value.entries());
        nestedEntries.forEach(([nestedKey, nestedValue], nestedIndex) =>{
            if(typeof nestedValue === "object"){
                map.set(nestedKey, Form.createFromRecord(nestedValue, this.getResource().getModel()))
            }else{
                map.set(nestedKey, nestedValue)
            }
        })
        return map;
    }
}
