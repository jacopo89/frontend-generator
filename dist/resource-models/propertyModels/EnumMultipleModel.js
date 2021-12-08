import { jsx as _jsx } from "react/jsx-runtime";
import { SinglePropertyModel } from "./SinglePropertyModel";
import ChipGenerator from "../../generators/fields/outputs/chips/chipGenerator";
import { Record } from "../Record";
import ButtonsHorizontalList from "../../rendering/components/buttons/ButtonsHorizontalList";
import EnumMultipleInput from "../../generators/forms/inputs/EnumMultipleInput";
export class EnumMultipleModel extends SinglePropertyModel {
    constructor(id, others) {
        super(id, others);
        this.options = others.options;
        this.colorMap = others.colorMap;
    }
    setInputField(props) {
        const { formValue, setFormValue, value } = props;
        const propsWithModel = Object.assign(Object.assign({}, props), { model: this, value: value !== null && value !== void 0 ? value : [], onChange: this.getInputOnChangeHandler({ formValue, setFormValue }) });
        return EnumMultipleInput(propsWithModel);
    }
    getInputOnChangeHandler({ formValue, setFormValue }) {
        return (vars) => {
            const [name, value] = vars;
            setFormValue(formValue.updateFormValue(name, value));
        };
    }
    setOutputField(props) {
        const { record } = props;
        const newrecord = (record === undefined) ? [] : (Array.isArray(record) ? record : Object.keys(record));
        return _jsx(ButtonsHorizontalList, { children: newrecord.map((singleRecord, index) => {
                return _jsx(ChipGenerator, { propertyModel: this, propertyRecord: singleRecord, colorMap: this.colorMap }, index);
            }) }, void 0);
    }
    getRecord(jsonValue) {
        return Record.createFromJsonNoModel(jsonValue);
    }
}
