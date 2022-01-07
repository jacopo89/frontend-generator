import {
    BOOLEAN,
    DATE, EMBEDDED_MULTIPLE, EMBEDDED_SINGLE, ENUM, FILE_MULTIPLE, FILE_SINGLE,
    FLOAT,
    INTEGER, MONEY, PHONE,
    REFERENCE
} from "./inputs/InputTypes";



const fileOnChange = ({formValue, setForm, vars}) => {

    const [name, value] = vars;
    setForm({...formValue, [name]: value});

}

const controlledOnChange = ( {formValue, setForm, vars}) =>{
    const [event] = vars;
    const target = event.target;
    let value = target.value;
    const name = target.id;

    setForm({...formValue, [name]:value});
}

const numberOnChange = ( {formValue, setForm, vars}) =>{
    const [event] = vars;
    const target = event.target;
    let value = target.value;
    const name = target.id;


    setForm({...formValue, [name]: parseInt(value)});
}

const floatOnChange = ( {formValue, setForm, vars}) =>{
    const [event] = vars;
    const target = event.target;
    let value = target.value;
    const name = target.id;

    setForm({...formValue, [name]: parseFloat(value)});
}

const phoneOnChange = ({formValue, setForm, vars}) =>{
    const [name, value] = vars;
    setForm({...formValue, [name]: value});
}
const moneyOnChange = ({formValue, setForm, vars}) =>{
    const [name, value] = vars;
    setForm({...formValue, [name]: value});
}

const checkboxOnChange = ( {formValue, setForm, vars}) =>{
    const [event] = vars;
    const target = event.target;
    console.log(target.checked);
    console.log(target.id);
    console.log(target.name);
    let value =  target.checked;
    const name = target.id;

    setForm({...formValue, [name]: value});
}

const autoCompleteOnchange = ( {formValue, setForm, vars}) => {
    const [name, value] = vars;
    setForm({...formValue,[name]: value});
}

const dateOnChange = ( {formValue, setForm, vars}) => {
    const [name, value] = vars;

    setForm({...formValue,[name]: value});
}

const embeddedOnChange = (vars)=> {};

export function onChangeHandler({type, formValue, setForm, vars}){

    const props = {vars:vars, formValue:formValue, setForm:setForm}

    switch (type){

        case REFERENCE:{
            return autoCompleteOnchange(props);
        }
        case ENUM:{
            return autoCompleteOnchange(props);
        }
        case EMBEDDED_SINGLE:{
            return embeddedOnChange(props);
        }
        case EMBEDDED_MULTIPLE:{
            return embeddedOnChange(props);
        }
        case FILE_SINGLE:{
            return fileOnChange(props);
        }
        case FILE_MULTIPLE:{
            return fileOnChange(props);
        }
        case BOOLEAN:{
            return checkboxOnChange(props);
        }
        case INTEGER:{
            return numberOnChange(props);
        }
        case FLOAT:{
            return floatOnChange(props);
        }
        case DATE:{
            return dateOnChange(props);
        }
        case PHONE: {
            return phoneOnChange(props);
        }
        case MONEY: {
            return moneyOnChange(props);
        }
        default:{
            return controlledOnChange(props);
        }
    }
}
