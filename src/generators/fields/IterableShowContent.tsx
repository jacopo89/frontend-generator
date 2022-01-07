import React, {DetailedReactHTMLElement} from "react";
import Grid from "@material-ui/core/Grid";
import {Divider, List, ListItem} from "@material-ui/core";
import {Model} from "../../resource-models/Model";
import {Record} from "../../resource-models/Record";
import {Form} from "../../resource-models/formvalue/Form";
import {Errors} from "../errors/Errors";
import {ShowContent} from "./ShowContent";

export interface IterableShowContentProps{
    model: Model,
    form: Form,
    record: Map<number, Record>;
    resourceName: string,
    setParentFormValue: (values:any) => void,
    formContent?:  React.DetailedReactHTMLElement<any, any>
    referencesMap: Map<string, any>
    refreshReferencesMap:()=>void
    formValueArray: Map<string,Form>,
    errors: Errors,
    label:string,
    submitHandler: (e:any) => Promise<any>;
    partialSubmitHandler: (e: any) => Promise<any>;
    loading:boolean
    inputElement?: DetailedReactHTMLElement<any, any>,
    refresh: () => void
    showElement?: React.DetailedReactHTMLElement<any, any>;

}

export const IterableShowContent: React.FC<IterableShowContentProps> = ({model,form, record, resourceName, setParentFormValue, formContent, referencesMap, refreshReferencesMap, formValueArray, label, partialSubmitHandler, submitHandler, errors, inputElement, refresh,showElement, loading}) => {

    const recordsList = record;
    if(recordsList.size===0){
        return <div>No elements found</div>
    }
    if(showElement){
        return  <List style={{width:"100%"}} >
            {
                Array.from(recordsList.values()).map((singleRecord:Record) => {

                    return <>
                        <ListItem alignItems="center">
                            {React.cloneElement(showElement, {...showElement?.props,record:singleRecord, model:model})}
                        </ListItem>
                        <Divider component="li" />
                    </>
                })
            }
        </List>

    }else{
        return <Grid container>
            {Array.from(recordsList.values()).map((singleRecord:Record) =>
                <Grid item xs={12} md={12}>
                    <Grid container spacing={2}>
                        {
                            model.properties.map((propertyModel, index) => {
                                // @ts-ignore
                                const formValue = formValueArray[index]

                                return <Grid item xs={12} md={6}>
                                    <ShowContent form={form} setForm={setParentFormValue} refresh={refresh} record={record.get(index) ?? new Record()} lockedFormValue={new Form()} formContent={inputElement} referencesMap={referencesMap} model={model} refreshReferencesMap={refreshReferencesMap} partialSubmitHandler={partialSubmitHandler} key={index} formValue={formValue} errors={errors} submitHandler={submitHandler} loading={loading}></ShowContent>
                                </Grid>
                            })
                        }
                    </Grid>
                </Grid>)}
        </Grid>
    };

}
