import { FilterValue } from "../filters/TableFilters";
import { BOOLEAN, EMBEDDED_MULTIPLE, EMBEDDED_SINGLE, ENUM_SINGLE, FILE_MULTIPLE, FILE_SINGLE, PHONE, REFERENCE } from "./inputs/InputTypes";
export function onFilterChange(type, setFilterValues, filterValues, vars) {
    const changeFilterValue = (name, value) => {
        const filterValue = filterValues.find((filterValue) => filterValue.name === name && !filterValue.isOrder);
        // @ts-ignore
        const oldIndex = filterValues === null || filterValues === void 0 ? void 0 : filterValues.indexOf(filterValue);
        const newFilterValues = [...filterValues];
        // @ts-ignore
        newFilterValues.splice(oldIndex, 1, new FilterValue({ name, value }));
        setFilterValues(newFilterValues);
    };
    const fileOnChange = (vars) => {
        const [name, value] = vars;
        changeFilterValue(name, value);
    };
    const controlledOnChange = (vars) => {
        const [event] = vars;
        const target = event.target;
        let value = target.value;
        const name = target.name;
        changeFilterValue(name, value);
    };
    const checkboxOnChange = (vars) => {
        const [name, value] = vars;
        changeFilterValue(name, value);
    };
    const autoCompleteOnchange = (vars) => {
        const [name, value] = vars;
        changeFilterValue(name, value);
    };
    const phoneOnChange = (vars) => {
    };
    const embeddedOnChange = (vars) => { };
    switch (type) {
        case REFERENCE: {
            return autoCompleteOnchange(vars);
        }
        case EMBEDDED_MULTIPLE: {
            return embeddedOnChange(vars);
        }
        case EMBEDDED_SINGLE: {
            return embeddedOnChange(vars);
        }
        case ENUM_SINGLE: {
            return autoCompleteOnchange(vars);
        }
        case FILE_SINGLE: {
            return fileOnChange(vars);
        }
        case FILE_MULTIPLE: {
            return fileOnChange(vars);
        }
        case BOOLEAN: {
            return checkboxOnChange(vars);
        }
        case PHONE: {
            return phoneOnChange(vars);
        }
        default: {
            return controlledOnChange(vars);
        }
    }
}
