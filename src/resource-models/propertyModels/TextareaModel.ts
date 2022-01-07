import {SinglePropertyModel} from "./SinglePropertyModel";
import {TextareaInput} from "../../generators/forms/inputs/TextareaInput";
import TextareaShow from "../../generators/fields/outputs/TextareaShow";
import {InputOnChangeHandler} from "../PropertyModel";
import {SingleSetInputFieldProps} from "../models/SetInputFieldProps";

export class TextareaModel extends SinglePropertyModel{
    setInputField(props: SingleSetInputFieldProps): React.ReactElement<any, any> | null {
        const {formValue, inputHandler} = props;
        const propsWithModel = {...props, model:this, onClick:inputHandler}
        return TextareaInput(propsWithModel);
    }

    getInputOnChangeHandler({formValue, setForm}: InputOnChangeHandler): any {
        return (vars:any)=>{
            const target = vars.target;
            let value = target.value;
            const name = target.id;
            setForm( formValue.set(name, value));
        }
    }

    setOutputField(props: any): React.ReactElement<any, any> | null {
        return TextareaShow(props);
    }

    getRecord(jsonValue: any): any {
        return jsonValue
    }

}
