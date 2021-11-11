import {PropertyModel} from "./PropertyModel";
import _ from 'lodash';
import {PropertyModelRegistry} from "./PropertyModelRegistry";
import {EmbeddedPropertyModel} from "./propertyModels/NestedPropertyModel";
import {DetailedReactHTMLElement, ReactElement} from "react";
import {PropertyFieldConfiguration} from "./configurations/PropertyFieldConfiguration";
import {ReferenceModel} from "./propertyModels/ReferenceModel";
import {ModelInputInterface} from "./interface/ModelInputInterface";
import {PropertyModelInputProps} from "./models/PropertyModelInputProps";

export interface Model{
    properties: PropertyModel[]
}

export class Model{
    constructor(properties: PropertyModel[]) {
        this.properties = properties;
    }


    /**
     * This method allows to fetch the property Model from the Model. It accepts a dotted name, as it can get inside nested properties.
     * @param name
     */
    getProperty(name:string): PropertyModel {
        const split = _.split(name, ".");
        const reducerModel = (accumulator:PropertyModel|Model, value:string):PropertyModel => {
            if(accumulator instanceof Model){
                const propertyModel = accumulator.properties.find((property)=> property.id === value);
                if(propertyModel) return propertyModel;
                throw new Error(`Undefined model for ${value} and name was ${name}`);
            }else{
                if(accumulator instanceof EmbeddedPropertyModel || accumulator instanceof ReferenceModel){
                    const propertyModel = accumulator.getResource().getModel().getProperty(value);
                    if(propertyModel) return propertyModel;
                    throw new Error(`Undefined model for ${value}`);
                }else{
                    throw new Error(`Undefined resource in ${accumulator}`);
                }
            }
        }
        // @ts-ignore
        return split.reduce(reducerModel, this);

    }

    getRecord(name:string, formValue:any){
        const split = _.split(name, ".");
        split.pop();
        const reducer = (start:any, value:any) => (start) ? start[value] : undefined;
        const record = split.reduce(reducer, formValue);
        const propertyModel = this.getProperty(name);
        return {propertyModel: propertyModel, record: record}
    }

    /**
     * Create a Model from a valid json Model.
     * @param jsonModel
     * @param resourceName
     */
    static createFromJson(jsonModel:any, resourceName:string):Model{
        const properties =  Object.entries(jsonModel).map(([key, value]) =>  {
            // @ts-ignore
            return PropertyModelRegistry.get(key, {...value, modelResourceName:resourceName})
        });
        return new Model(properties);
    }

    setFieldProps(requestedName:string, props:ModelInputInterface):PropertyModelInputProps{
        return PropertyModelInputProps.createFromFieldProps(requestedName,props);
    }

    /**
     * This method allows to get a input field of a requested attribute directly from the model.
     * @param requestedName
     * @param props
     * @param viewElement
     */
    getInputField(requestedName:string, props:ModelInputInterface, viewElement: DetailedReactHTMLElement<any, any>): ReactElement<any, any>|null{
        const newProps = this.setFieldProps(requestedName, props)
        return this.getProperty(requestedName).getInputField(newProps, new PropertyFieldConfiguration({viewElement:viewElement}));
    }

    getOutputField(requestedName:string, props: ModelInputInterface, viewElement:DetailedReactHTMLElement<any, any>, showLabel:boolean = true): ReactElement<any, any>|null{
        const newProps = this.setFieldProps(requestedName, props);
        return this.getProperty(requestedName).getOutputField(newProps,new PropertyFieldConfiguration({viewElement:viewElement, showLabel:showLabel}));
    }

    getAllPropertiesReadableNames(){
        return this.properties.filter((propertyModel)=> propertyModel).map((propertyModel) => {
            return {
                id: propertyModel.id,
                label:propertyModel.label
            }
        } );
    }
}





