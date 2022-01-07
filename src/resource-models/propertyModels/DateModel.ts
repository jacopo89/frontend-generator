import {SinglePropertyModel} from "./SinglePropertyModel";
import DateInput from "../../generators/forms/inputs/DateInput";
import DateShow from "../../generators/fields/outputs/DateShow";
import {InputOnChangeHandler} from "../PropertyModel";
import {SingleSetInputFieldProps} from "../models/SetInputFieldProps";

export class DateModel extends SinglePropertyModel{
    setInputField(props: SingleSetInputFieldProps): React.ReactElement<any, any> | null {
        const {inputHandler} = props;
        const propsWithModel = {...props, model:this, onClick:inputHandler}
        return DateInput(propsWithModel);
    }

    getInputOnChangeHandler({formValue, setForm}: InputOnChangeHandler): any {
        return (event :any) => {
            const target = event.target;
            let value = target.value;
            const name = target.name;
            setForm( formValue.set(name, value));
        }
    }

    setOutputField(props: SingleSetInputFieldProps): React.ReactElement<any, any> | null {
        return DateShow(props);
    }

    getRecord(jsonValue: any): any {
        return jsonValue;
    }
}
