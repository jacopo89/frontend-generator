/// <reference types="react" />
import { ReferenceModel } from "../../../resource-models/propertyModels/ReferenceModel";
import { ListingOption } from "../../../resource-models/listings/Listing";
import { FormValue } from "../../../resource-models/formvalue/FormValue";
interface ReferenceInput {
    model: ReferenceModel;
    formValue: FormValue;
    refreshReferencesMap: any;
    value: ListingOption | undefined;
    hasError?: boolean;
    errorMessage?: string;
    createNew?: boolean;
    onChange: any;
    dependencies: string[];
}
declare class ReferenceInputOption {
    id: number;
    label: string;
    button?: any;
    constructor(id: number, label: string, button?: any);
    static createFromListingOption(listingOption: ListingOption): ReferenceInputOption;
    toMap(): Map<any, any>;
}
export default function ({ model, formValue, refreshReferencesMap, value: listOption, createNew, onChange, hasError, errorMessage, dependencies }: ReferenceInput): JSX.Element;
/**
 * @param {int} value
 * @param {array} options
 * @returns {int}
 */
export declare function getAutocompleteValuePosition(value: ListingOption | undefined, options: ReferenceInputOption[]): number;
export {};
