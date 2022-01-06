import {SinglePropertyModel} from "./SinglePropertyModel";
import {FloatInput} from "../../generators/forms/inputs/FloatInput";
import {FloatShow} from "../../generators/fields/outputs/FloatShow";
import {InputOnChangeHandler} from "../PropertyModel";
import {SingleSetInputFieldProps} from "../models/SetInputFieldProps";

export class FloatModel extends SinglePropertyModel{
    setInputField(props: SingleSetInputFieldProps): React.ReactElement<any, any> | null {
        const {inputHandler} = props;
        const propsWithModel = {...props, model:this, onClick:inputHandler}
        return FloatInput(propsWithModel);
    }

    getInputOnChangeHandler({formValue, setFormValue}: InputOnChangeHandler): any {
        return (vars:any) => {
            const [event] = vars;
            const target = event.target;
            let value = target.value;
            const name = target.id;
            setFormValue( formValue.set(name, parseFloat(value)));
        }
    }

    setOutputField(props: SingleSetInputFieldProps): React.ReactElement<any, any> | null {
        return FloatShow(props);
    }

    getRecord(jsonValue: any): any {
        return jsonValue;
    }
}
