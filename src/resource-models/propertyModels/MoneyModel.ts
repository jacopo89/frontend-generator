import {SinglePropertyModel} from "./SinglePropertyModel";
import MoneyShow from "../../generators/fields/outputs/MoneyShow";
import MoneyInput from "../../generators/forms/inputs/MoneyInput";
import {InputOnChangeHandler} from "../PropertyModel";
import {SingleSetInputFieldProps} from "../models/SetInputFieldProps";

export class MoneyModel extends SinglePropertyModel{
    setInputField(props: SingleSetInputFieldProps): React.ReactElement<any, any> | null {
        const {inputHandler} = props;
        const propsWithModel = {...props, model:this, onClick:inputHandler}
        return MoneyInput(propsWithModel)
    }

    getInputOnChangeHandler({formValue, setFormValue}: InputOnChangeHandler): (vars: any) => void {return (vars:any) =>{
            const [name, value] = vars;
            setFormValue( formValue.set(name, value));
        }
    }

    setOutputField(props: SingleSetInputFieldProps): React.ReactElement<any, any> | null {
        return MoneyShow(props);
    }

    getRecord(jsonValue: any): any {
        return jsonValue;
    }


}
