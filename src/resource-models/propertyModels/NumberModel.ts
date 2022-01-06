import {SinglePropertyModel} from "./SinglePropertyModel";
import NumberShow from "../../generators/fields/outputs/NumberShow";
import NumberInput from "../../generators/forms/inputs/NumberInput";
import {InputOnChangeHandler} from "../PropertyModel";
import {SingleSetInputFieldProps} from "../models/SetInputFieldProps";

export class NumberModel extends SinglePropertyModel{

    setInputField(props: SingleSetInputFieldProps): React.ReactElement<any, any> | null {
        return NumberInput({...props, onClick:props.inputHandler});
    }

    getInputOnChangeHandler({formValue, setFormValue}: InputOnChangeHandler): (vars: any) => void {
        return (vars:any) => {
            const target = vars.target;
            let value = target.value;
            const name = target.name;
            console.log("formvalue in input", formValue)
            setFormValue( formValue.set(name, parseInt(value)));
        }
    }

    setOutputField(props: SingleSetInputFieldProps): React.ReactElement<any, any> | null {
        return NumberShow(props);
    }

    getRecord(jsonValue: any): any {
        return jsonValue
    }


}
