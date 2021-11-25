import _ from 'lodash';
import { PropertyModelRegistry } from "./PropertyModelRegistry";
import { EmbeddedPropertyModel } from "./propertyModels/NestedPropertyModel";
import { PropertyFieldConfiguration } from "./configurations/PropertyFieldConfiguration";
import { ReferenceModel } from "./propertyModels/ReferenceModel";
import { PropertyModelInputProps } from "./models/PropertyModelInputProps";
export class Model {
    constructor(properties) {
        this.properties = properties;
    }
    /**
     * This method allows to fetch the property Model from the Model. It accepts a dotted name, as it can get inside nested properties.
     * @param name
     */
    getProperty(name) {
        const split = _.split(name, ".");
        const reducerModel = (accumulator, value) => {
            if (accumulator instanceof Model) {
                const propertyModel = accumulator.properties.find((property) => property.id === value);
                if (propertyModel)
                    return propertyModel;
                throw new Error(`Undefined model for ${value} and name was ${name}`);
            }
            else {
                if (accumulator instanceof EmbeddedPropertyModel || accumulator instanceof ReferenceModel) {
                    const propertyModel = accumulator.getResource().getModel().getProperty(value);
                    if (propertyModel)
                        return propertyModel;
                    throw new Error(`Undefined model for ${value}`);
                }
                else {
                    throw new Error(`Undefined resource in ${accumulator}`);
                }
            }
        };
        // @ts-ignore
        return split.reduce(reducerModel, this);
    }
    getRecord(name, formValue) {
        const split = _.split(name, ".");
        split.pop();
        const reducer = (start, value) => (start) ? start[value] : undefined;
        const record = split.reduce(reducer, formValue);
        const propertyModel = this.getProperty(name);
        return { propertyModel: propertyModel, record: record };
    }
    /**
     * Create a Model from a valid json Model.
     * @param jsonModel
     * @param resourceName
     */
    static createFromJson(jsonModel, resourceName) {
        const properties = Object.entries(jsonModel).map(([key, value]) => {
            // @ts-ignore
            return PropertyModelRegistry.get(key, Object.assign(Object.assign({}, value), { modelResourceName: resourceName }));
        });
        return new Model(properties);
    }
    setFieldProps(requestedName, props) {
        return PropertyModelInputProps.createFromFieldProps(requestedName, props);
    }
    /**
     * This method allows to get a input field of a requested attribute directly from the model.
     * @param requestedName
     * @param props
     * @param viewElement
     */
    getInputField(requestedName, props, viewElement) {
        const newProps = this.setFieldProps(requestedName, props);
        return this.getProperty(requestedName).getInputField(newProps, new PropertyFieldConfiguration({ viewElement: viewElement }));
    }
    getOutputField(requestedName, props, viewElement, showLabel = true) {
        const newProps = this.setFieldProps(requestedName, props);
        return this.getProperty(requestedName).getOutputField(newProps, new PropertyFieldConfiguration({ viewElement: viewElement, showLabel: showLabel }));
    }
    getConfiguredInputField(requestedName, props, propertyFieldConfiguration) {
        const newProps = this.setFieldProps(requestedName, props);
        return this.getProperty(requestedName).getInputField(newProps, propertyFieldConfiguration);
    }
    getConfiguredOutputField(requestedName, props, propertyFieldConfiguration) {
        const newProps = this.setFieldProps(requestedName, props);
        return this.getProperty(requestedName).getOutputField(newProps, propertyFieldConfiguration);
    }
    getAllPropertiesReadableNames() {
        return this.properties.filter((propertyModel) => propertyModel).map((propertyModel) => {
            return {
                id: propertyModel.id,
                label: propertyModel.label
            };
        });
    }
}
