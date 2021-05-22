import {InputFields, PropertyModel} from "../PropertyModel";
import {Errors} from "../../generators/errors/Errors";

export class IdModel extends PropertyModel{
    setInputField(props: InputFields): React.ReactElement<any, any> | null {
        return <></>
    }

    getInputOnChangeHandler({formValue, setFormValue}: any): (vars: any) => void {
        return function (p1: any) {
        };
    }

    setOutputField(props: any): React.ReactElement<any, any> | null {
        return <>{props.propertyRecord}</>;
    }

    manipulateErrors(errors: Errors): any {
    }

    getInputField(props: InputFields): React.ReactElement<any, any> | null {
        return null;
    }

    getOutputField(props: any): React.ReactElement<any, any> | null {
        return null;
    }

    getRecord(jsonValue: any): any {
        return jsonValue;
    }

    getFormValue(value: any): any {
        return value;
    }

    getJsonFormValue(value: any): any {
        return value;
    }

}