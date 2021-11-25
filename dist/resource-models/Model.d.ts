import { PropertyModel } from "./PropertyModel";
import { DetailedReactHTMLElement, ReactElement } from "react";
import { PropertyFieldConfiguration } from "./configurations/PropertyFieldConfiguration";
import { ModelInputInterface } from "./interface/ModelInputInterface";
import { PropertyModelInputProps } from "./models/PropertyModelInputProps";
export interface Model {
    properties: PropertyModel[];
}
export declare class Model {
    constructor(properties: PropertyModel[]);
    /**
     * This method allows to fetch the property Model from the Model. It accepts a dotted name, as it can get inside nested properties.
     * @param name
     */
    getProperty(name: string): PropertyModel;
    getRecord(name: string, formValue: any): {
        propertyModel: PropertyModel;
        record: any;
    };
    /**
     * Create a Model from a valid json Model.
     * @param jsonModel
     * @param resourceName
     */
    static createFromJson(jsonModel: any, resourceName: string): Model;
    setFieldProps(requestedName: string, props: ModelInputInterface): PropertyModelInputProps;
    /**
     * This method allows to get a input field of a requested attribute directly from the model.
     * @param requestedName
     * @param props
     * @param viewElement
     */
    getInputField(requestedName: string, props: ModelInputInterface, viewElement: DetailedReactHTMLElement<any, any>): ReactElement<any, any> | null;
    getOutputField(requestedName: string, props: ModelInputInterface, viewElement: DetailedReactHTMLElement<any, any>, showLabel?: boolean): ReactElement<any, any> | null;
    getConfiguredInputField(requestedName: string, props: ModelInputInterface, propertyFieldConfiguration: PropertyFieldConfiguration): ReactElement<any, any> | null;
    getConfiguredOutputField(requestedName: string, props: ModelInputInterface, propertyFieldConfiguration: PropertyFieldConfiguration): ReactElement<any, any> | null;
    getAllPropertiesReadableNames(): {
        id: string;
        label: string;
    }[];
}
