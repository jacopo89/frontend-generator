import { jsx as _jsx } from "react/jsx-runtime";
import { GetListingsMap } from "../../utils/referenceFieldUtils";
import BooleanFilter from "./inputs/BooleanFilter";
import ReferenceFilter from "./inputs/ReferenceFilter";
import TextFilter from "./inputs/TextFilter";
import { AutoCompleteFilter } from "./inputs/AutoCompleteFilter";
import ReferenceMultipleFilter from "./inputs/ReferenceMultipleFilter";
import { FilterComponent } from "./FilterComponent";
import { onFilterChange } from "../forms/FilterFormHelpers";
export function getFilterComponents({ model, filters, filterValues, setFilterValues }) {
    const { referencesMap } = GetListingsMap(model);
    const filterFieldOnChange = (type) => {
        return (...vars) => onFilterChange(type, setFilterValues, filterValues, vars);
    };
    const getFilter = (name, type) => {
        var _a;
        const value = (_a = filterValues.find((filterValue) => filterValue.name === name && !filterValue.isOrder)) === null || _a === void 0 ? void 0 : _a.value;
        switch (type) {
            case "boolean": {
                return new FilterComponent({
                    name,
                    type: "boolean",
                    component: _jsx(BooleanFilter, { name: name, type: type, inputFieldOnChange: filterFieldOnChange, value: value }, void 0)
                });
            }
            case "reference": {
                const propertyModel = model.getProperty(name);
                const options = referencesMap.get(propertyModel.resourceName);
                return new FilterComponent({
                    name: name,
                    type: "reference",
                    component: _jsx(ReferenceFilter, { inputFieldOnChange: filterFieldOnChange, text: name, modelItem: propertyModel, options: options, inheritedValue: value }, name)
                });
            }
            case "string": {
                return new FilterComponent({
                    name: name,
                    type: "string",
                    component: _jsx(TextFilter, { label: model.getProperty(name).label, name: name, type: type, inputFieldOnChange: filterFieldOnChange, value: value }, name)
                });
            }
            case "enum": {
                const propertyModel = model.getProperty(name);
                const { options } = propertyModel;
                return new FilterComponent({
                    name: name,
                    type: "enum",
                    component: _jsx(AutoCompleteFilter, { name: name, inputFieldOnChange: filterFieldOnChange, options: options, value: value }, name)
                });
            }
            case "enum_multiple": {
                const propertyModel = model.getProperty(name);
                const { options } = propertyModel;
                return new FilterComponent({
                    name: name,
                    type: "enum_multiple",
                    component: _jsx(ReferenceMultipleFilter, { text: name, modelItem: propertyModel, inputFieldOnChange: filterFieldOnChange, options: options, inheritedValue: value }, name)
                });
            }
            case "order": {
                return new FilterComponent({
                    name,
                    type: "order",
                    isOrder: true
                });
            }
        }
    };
    return filters.map(filter => getFilter(filter.name, filter.type));
    //return (Object.keys(modelFilters).length!==0) ? Object.keys(modelFilters).map(filterKey => getFilter(filterKey, modelFilters[filterKey])) : [];
}
