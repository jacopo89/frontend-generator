import { SinglePropertyModel } from "./SinglePropertyModel";
import MultipleFileShow from "../../generators/fields/outputs/MultipleFileShow";
import { Record } from "../Record";
import { ImagesGrid } from "../../generators/forms/inputs/Files/ImagesGrid";
export class MultipleImageModel extends SinglePropertyModel {
    setInputField(props) {
        const { formValue, setFormValue, errors } = props;
        // @ts-ignore
        const propsWithModel = Object.assign(Object.assign({}, props), { model: this, resourceId: formValue.id, modelResourceName: this.modelResourceName, onChange: this.getInputOnChangeHandler({ formValue, setFormValue }), files: formValue[this.id] });
        // @ts-ignore
        return ImagesGrid(propsWithModel);
    }
    getInputOnChangeHandler({ formValue, setFormValue }) {
        return (vars) => {
            const [name, value] = vars;
            setFormValue(formValue.updateFormValue(name, value));
        };
    }
    setOutputField(props) {
        var _a;
        return MultipleFileShow(Object.assign(Object.assign({}, props), { record: (_a = props.record) !== null && _a !== void 0 ? _a : new Map() }));
    }
    getRecord(jsonValue) {
        return Record.createFromJsonNoModel(jsonValue);
    }
}
