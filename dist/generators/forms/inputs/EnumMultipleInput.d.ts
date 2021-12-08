/// <reference types="react" />
import { FormValue } from "../../../resource-models/formvalue/FormValue";
import { EnumMultipleModel } from "../../../resource-models/propertyModels/EnumMultipleModel";
import { Option } from "../../../resource-models/PropertyModel";
interface EnumMultipleInput {
    model: EnumMultipleModel;
    formValue: FormValue;
    options: Option[];
    value: string[];
    hasError?: boolean;
    errorMessage?: string;
    onChange: any;
}
export default function ({ model, value: values, onChange, hasError, errorMessage }: EnumMultipleInput): JSX.Element;
export declare function getAutocompleteValuePosition(values: any[], options: Option[]): Option[];
export {};
