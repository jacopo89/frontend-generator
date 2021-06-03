import React, {useEffect, useRef} from "react";
import {Button} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {ValidatorForm} from "react-material-ui-form-validator";
import {FormGeneratorProps} from "./FormGeneratorProps";
import {FormContent} from "./FormContent";
import {useFormStyles} from "../../rendering/styles/formStyles";
import ButtonsHorizontalList from "../../rendering/components/buttons/ButtonsHorizontalList";
import {genericError} from "../../redux/actions/verbs/edit";


export const FormGenerator: React.FC<FormGeneratorProps> = (props) => {

    const {submitHandler, formContent,partialSubmitHandler, model, referencesMap, refreshReferencesMap, formValue, record, lockedFormValue, setFormValue,  errors, text= "Salva", showButton=true } = props
    const classes = useFormStyles();
    const dispatch = useDispatch();
    const ref= useRef(null);

    // validation use effect
    useEffect(()=>{
        ValidatorForm.addValidationRule('isUrl', (value:string) => {
            const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
                '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
                '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
                '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
            return !!pattern.test(value);

        });

        console.log("formvalue", formValue);
        },[formValue])

    const validationSubmitHandler = (e:any) => {
        submitHandler(e)
    }

    const onClickHandler = (e: any) => {
        if(ref!==null && ref.current!==null){
            // @ts-ignore
            ref.current.submit(e);
        }
    }

    return <ValidatorForm ref={ref} className={classes.form} onSubmit={validationSubmitHandler} onError={()=>dispatch(genericError("Validation Error"))}>
        <FormContent formContent={formContent} model={model} referencesMap={referencesMap} refreshReferencesMap={refreshReferencesMap} setFormValue={setFormValue} formValue={formValue} record={record} lockedFormValue={lockedFormValue}  errors={errors} partialSubmitHandler={partialSubmitHandler} submitHandler={submitHandler}/>
        {!formContent && <div style={{margin: "10px 0"}}>
            <ButtonsHorizontalList>
                <Button variant="contained" color="secondary" onClick={onClickHandler}>{text}</Button>
            </ButtonsHorizontalList>
        </div>}
    </ValidatorForm>

}