import React from "react";
import { EmbeddedInputFields, EmbeddedOutputFields, EmbeddedPropertyModel } from "./NestedPropertyModel";
export declare class EmbeddedMultipleModel extends EmbeddedPropertyModel {
    setInputField(props: EmbeddedInputFields): React.ReactElement<any, any> | null;
    getInputOnChangeHandler({ formValue, setFormValue }: any): (vars: any) => void;
    setOutputField(props: EmbeddedOutputFields): React.ReactElement<any, any> | null;
}
