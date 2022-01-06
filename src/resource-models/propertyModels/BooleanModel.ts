import {SinglePropertyModel} from "./SinglePropertyModel";
import BooleanInput from "../../generators/forms/inputs/BooleanInput";
import React from "react";
import BooleanShow from "../../generators/fields/outputs/BooleanShow";
import {InputOnChangeHandler} from "../PropertyModel";
import {SingleSetInputFieldProps} from "../models/SetInputFieldProps";

export class BooleanModel extends SinglePropertyModel {
    setInputField(props: SingleSetInputFieldProps): React.ReactElement<any, any> | null {
      const {inputHandler, formValue} = props;
      // @ts-ignore
        const propsWithModel = {...props, onClick:inputHandler,checked:formValue[this.id] ?? false}
      return BooleanInput(propsWithModel)
    }

    getInputOnChangeHandler({formValue, setFormValue}: InputOnChangeHandler): any {
        return (event:any) => {
            const target = event.target;
            let value =  target.checked;
            const name = target.id;
            setFormValue( formValue.set(name, value));
        }
    }

    setOutputField(props: SingleSetInputFieldProps): React.ReactElement<any, any> | null {
        return BooleanShow(props);
    }

    getRecord(jsonValue: any): any {
        return jsonValue;
    }

}
