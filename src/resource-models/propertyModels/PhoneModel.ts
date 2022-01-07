import {SinglePropertyModel} from "./SinglePropertyModel";
import PhoneInput from "../../generators/forms/inputs/PhoneInput";
import PhoneShow from "../../generators/fields/outputs/PhoneShow";
import {InputOnChangeHandler} from "../PropertyModel";
import {SingleSetInputFieldProps} from "../models/SetInputFieldProps";

export class PhoneModel extends SinglePropertyModel{
    setInputField(props: SingleSetInputFieldProps): React.ReactElement<any, any> | null {
        const {inputHandler} = props;
        const propsWithModel = {...props, model:this, onClick:inputHandler}
        return PhoneInput(propsWithModel);
    }

    getInputOnChangeHandler({formValue, setForm}: InputOnChangeHandler): any {
        return (vars:any) =>{
            const [name, value] = vars;
            setForm( formValue.set(name, value));
        }
    }

    setOutputField(props: any): React.ReactElement<any, any> | null {
        return PhoneShow(props);
    }

    getRecord(jsonValue: any): any {
        return jsonValue
    }
}
