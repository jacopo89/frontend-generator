import { Resource } from "./Resource";
import React from "react";
import { GridRange, InputType, Option } from "./PropertyModel";
export interface PropertyModelCore {
    type: InputType;
    label: string;
    validators?: string[];
    errorMessages?: string[];
    resourceName: string;
    optionText: string;
    single?: boolean;
    resource?: any;
    form: React.DetailedReactHTMLElement<any, any>;
    options?: Option[];
    xs?: GridRange;
    md?: GridRange;
    adornment?: string;
    showElement?: React.DetailedReactHTMLElement<any, any>;
    modifyOnlyLastElement?: boolean;
    editabilityRule?: () => void;
}
export interface EmbeddedPropertyModelCore extends PropertyModelCore {
    resource: Resource;
}
/**
 * this class maps ALL attributes the set of property Models might need and are generated by the JSON object
 */
export declare class PropertyModelCore {
    type: InputType;
    label: string;
    validators?: string[];
    errorMessages?: string[];
    resourceName: string;
    optionText: string;
    single?: boolean;
    resource?: any;
    form: React.DetailedReactHTMLElement<any, any>;
    options?: Option[];
    xs?: GridRange;
    md?: GridRange;
    adornment?: string;
    showElement?: React.DetailedReactHTMLElement<any, any>;
    modifyOnlyLastElement?: boolean;
    editabilityRule?: () => void;
    constructor({ type, label, validators, errorMessages, resourceName, optionText, single, resource, form, options, xs, md, adornment, showElement, modifyOnlyLastElement, editabilityRule }: any);
}
