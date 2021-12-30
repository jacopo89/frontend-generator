import React, {useCallback, useEffect, useMemo, useState} from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";
import {changeResourceBuffer} from "../../../redux/actions/app/actions";
import {ReferenceModel} from "../../../resource-models/propertyModels/ReferenceModel";
import {ListingOption} from "../../../resource-models/listings/Listing";
import ReferenceInputModal from "./ReferenceInputModal/ReferenceInputModal";
import {CustomTextValidator} from "../formHelpers";
import {Form} from "../../../resource-models/formvalue/Form";
import _ from 'lodash';
import list from "../../../redux/reducers/verbs/list";

interface ReferenceInput{
    model: ReferenceModel,
    formValue: Form,
    refreshReferencesMap: any,
    value:ListingOption|undefined,
    hasError?:boolean,
    errorMessage?:string,
    createNew?:boolean,
    onChange:any,
    dependencies: string[]
}

const LISTING_OPTION_UNDEFINED = -1;
const LISTING_OPTION_NOT_PRESENT = -2;

class ReferenceInputOption{
    id:number
    label:string
    button?:any

    constructor(id:number,label:string, button?:any) {
        this.id= id;
        this.label = label;
        this.button = button
    }

    static createFromListingOption(listingOption:ListingOption){
        return new ReferenceInputOption(listingOption.id,listingOption.label);
    }
    toMap(){
        return new Map().set('id',this.id).set('label', this.label);
    }
}

export default function ({model,formValue, refreshReferencesMap, value:listOption, createNew=true, onChange, hasError, errorMessage, dependencies}:ReferenceInput){
    const inheritedValue = useMemo(()=>{return (listOption) ? (typeof listOption === "number" ? new ListingOption(listOption, "")  : new ListingOption(listOption["id"], "")): undefined},[listOption])
    const {id, label, resourceName} = useMemo(()=>{return model},[model]);
    const [open, setOpen] = React.useState(false);

    //useCounter(inheritedValue, `Inherited value ${id}`)

    const handleOpen = (e:any) => {
        e.stopPropagation();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        refreshReferencesMap()
    };

    const [localOptions, setLocalOptions] = useState<ReferenceInputOption[]>( createNew? [new ReferenceInputOption(0,"",<Button style={{width:"100%"}} onClick={handleOpen}>Add a new one</Button>)]: []);
    const expectedIntialOptionsLocations = createNew ? 1 : 0;
    // @ts-ignore
    const [value, setValue] = useState<ReferenceInputOption>(null);
    const [inputValue, setInputValue] = useState("");
    // @ts-ignore
    const {listings,listingLoading} = useSelector(({appReducer})=>appReducer);

    const map = new Map(dependencies.map((dependencyName:string)=>{return [dependencyName,undefined]}) );

    const [dependenciesValues, setDependenciesValues] = useState(map);
    const isDisabled = dependencies.length === 0 ? false : Array.from(dependenciesValues.entries()).some(([id,value]) => value===undefined)

    const updateDependecies = useCallback(()=>{
        let changes = 0;

        const newDependenciesValues = _.clone(dependenciesValues);
        dependencies.forEach((dependencyName:string) =>{
            // @ts-ignore
            const formValueDependencyValue = formValue[dependencyName]
            // @ts-ignore

            if(dependenciesValues.get(dependencyName)!==formValueDependencyValue){
                // @ts-ignore
                newDependenciesValues.set(dependencyName, formValue[dependencyName]);
                changes++;
            }
        })
        if(changes > 0){
            setDependenciesValues(newDependenciesValues)
        }
    },[formValue, dependenciesValues,dependenciesValues,dependencies])


    useEffect(()=>{
        if(!listingLoading){
            updateDependecies()
        }
    },[formValue,listingLoading])

    const dispatch = useDispatch();
    useEffect(()=>{
        if(resourceName){
            dispatch(changeResourceBuffer(resourceName, dependenciesValues))
        }
    },[dependenciesValues])



    useEffect(()=>{
        if(!listingLoading && listings.size !== 0){
            const options  = listings.get(model.resourceName)?.options ?? [];
            const referenceOptions = options.map((option:ListingOption) => ReferenceInputOption.createFromListingOption(option))
            setLocalOptions((value)=> (createNew)? [new ReferenceInputOption(0,"",<Button style={{width:"100%"}} onClick={handleOpen}>Add a new one</Button>), ...referenceOptions] : [...referenceOptions] )
        }
    }, [listings,listingLoading])


    const refreshList = useCallback(()=>{

        const valuePositionInOptions = getAutocompleteValuePosition(inheritedValue, localOptions);
        const localOptionsLengthCondition = localOptions.length!==expectedIntialOptionsLocations;
        const truePosition = (createNew) ? valuePositionInOptions : valuePositionInOptions-1;

        const isPositionValid = valuePositionInOptions!==LISTING_OPTION_NOT_PRESENT && valuePositionInOptions!==LISTING_OPTION_UNDEFINED;

        if(isPositionValid && localOptionsLengthCondition){
            setValue(localOptions[truePosition]);
        }else if(valuePositionInOptions===LISTING_OPTION_NOT_PRESENT ){
            onChange([id, undefined ])
            setInputValue("")
        }
    },[localOptions, inheritedValue])


    useEffect(()=>{
        if(!listingLoading)refreshList()
    },[listingLoading, inheritedValue])

    useEffect(()=>refreshList(),[localOptions])


    const autocompleteOnChange = (item:any) => {
        onChange([id, item])
    }

    return <>
        <Autocomplete
            value={value}
            disabled={isDisabled}
            inputValue={inputValue}
            disableClearable
            options={localOptions}
            onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
            onChange={(event, newInputvalue) => autocompleteOnChange(newInputvalue)}
            getOptionLabel={(option) => option.label}
            renderOption={(option) => (option.button) ? option.button :  <div>{option.label}</div>}
            style={{ width: "100%" }}
            renderInput={({...params}) =>
                <CustomTextValidator {...params}
                   error={hasError}
                   errorMessage={errorMessage}
                   id={model.id}
                   name={model.id}
                   variant="outlined" value={value}
                   label={label}
                   style={{width: "100%"}}
                   autoComplete="nope"
                />
            }
        />
        <ReferenceInputModal open={open} handleClose={handleClose} resourceName={resourceName} />
    </>

}






/**
 * @param {int} value
 * @param {array} options
 * @returns {int}
 */
export function getAutocompleteValuePosition(value:ListingOption|undefined,options:ReferenceInputOption[]){
    if(value){
        // @ts-ignore
        const correctOption = options.find((option) => option.id === value.id)
        return (correctOption) ? options.indexOf(correctOption): LISTING_OPTION_NOT_PRESENT;
    }else{
        return LISTING_OPTION_UNDEFINED
    }

}
