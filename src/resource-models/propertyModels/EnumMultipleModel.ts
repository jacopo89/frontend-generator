import {SinglePropertyInputFields, SinglePropertyModel} from "./SinglePropertyModel";
import {EnumInput, getAutocompleteValuePosition} from "../../generators/forms/inputs/EnumInput";
import chipGenerator from "../../generators/fields/outputs/chips/chipGenerator";

interface EnumMultipleInputFields extends SinglePropertyInputFields{
    options: any;
}

export class EnumMultipleModel extends SinglePropertyModel{
    setInputField(props: EnumMultipleInputFields): React.ReactElement<any, any> | null {
        const {formValue, setFormValue, errors, options, value} = props;
        const valuePositionInOptions = getAutocompleteValuePosition(value, options);
        const propsWithModel = {...props, model:this, inheritedValue:valuePositionInOptions, onChange:this.getInputOnChangeHandler({formValue, setFormValue})}
        return EnumInput(propsWithModel);
    }

    getInputOnChangeHandler({formValue, setFormValue}: any): (vars: any) => void {
        return (vars:any) =>{
            const [name, value] = vars;
            setFormValue({...formValue,[name]: value});
        }
    }

    getOutputField(props: any): React.ReactElement<any, any> | null {
        const {propertyRecord,} = props;
        const newProps = {propertyRecord, propertyModel:this};
        const record: any = Array.isArray(propertyRecord) ? propertyRecord : Object.keys(propertyRecord);
        return record.map((singleRecord:any) =>{
            const eachProp = {...props, propertyRecord: singleRecord }
            return chipGenerator(this.resourceName,eachProp );
        })
    }

}