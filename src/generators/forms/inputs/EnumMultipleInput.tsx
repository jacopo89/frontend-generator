import React, {useMemo, useState} from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {CustomTextValidator} from "../formHelpers";
import {Form} from "../../../resource-models/formvalue/Form";
import {EnumMultipleModel, JsonEnumOption} from "../../../resource-models/propertyModels/EnumMultipleModel";
import {Option} from "../../../resource-models/PropertyModel";

interface EnumMultipleInput{
    model: EnumMultipleModel,
    formValue: Form,
    options: Option[],
    value:string[],
    hasError?:boolean,
    errorMessage?:string,
    onChange:any
}

export default function ({model, value:values, onChange, hasError, errorMessage}:EnumMultipleInput){

    const {id, label, options} = useMemo(()=>{return model},[model]);


    const [inputValue, setInputValue] = useState("");

    console.log("values", values)
    console.log("options", options)

    const autocompleteOnChange = (items:JsonEnumOption[]) => {
        console.log("items", items)
        onChange([id, items.map(item => item.id)])
    }

    return <>
        <Autocomplete
            multiple
            value={getAutocompleteValuePosition(values, options)}

            inputValue={inputValue}
            disableClearable
            options={options}
            onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
            onChange={(event, newInputvalue) => autocompleteOnChange(newInputvalue)}
            getOptionLabel={(option) => option.label}
            renderOption={(option) => <div>{option.label}</div>}
            style={{ width: "100%" }}
            renderInput={({...params}) =>
                <CustomTextValidator {...params}
                                     error={hasError}
                                     errorMessage={errorMessage}
                                     id={model.id}
                                     name={model.id}
                                     variant="outlined" value={getAutocompleteValuePosition(values, options)}
                                     label={label}
                                     style={{width: "100%"}}
                                     autoComplete="nope"
                />
            }
        />
    </>

}

export function getAutocompleteValuePosition(values:any[],options:Option[]){
    const indexes = values.map((selectedOption:string|number) => options.findIndex((option)=>option.id === selectedOption) );
    const selectedValues =  indexes.map((indexValue) => options[indexValue]);
    return selectedValues
}
