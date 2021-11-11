import { jsx as _jsx } from "react/jsx-runtime";
// @ts-ignore
import MuiPhoneInput from 'material-ui-phone-number';
export default function ({ label, model, hasError, errorMessage, onClick, value, adornment }) {
    const localOnChange = (value) => {
        // @ts-ignore
        onClick([model.id, value]);
    };
    return _jsx(MuiPhoneInput, { defaultCountry: 'gb', variant: "outlined", value: value, fullWidth: true, onChange: localOnChange }, void 0);
}
