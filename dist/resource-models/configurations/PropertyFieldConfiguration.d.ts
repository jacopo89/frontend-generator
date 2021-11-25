/// <reference types="react" />
export interface PropertyFieldConfigurationInterface {
    viewElement?: React.DetailedReactHTMLElement<any, any>;
    showLabel?: boolean;
    isEdit?: boolean;
    dependencies?: string[];
}
export declare class PropertyFieldConfiguration {
    viewElement?: React.DetailedReactHTMLElement<any, any>;
    showLabel: boolean;
    isEdit: boolean;
    dependencies: string[];
    constructor({ viewElement, showLabel, isEdit, dependencies }: PropertyFieldConfigurationInterface);
}
