import {useEffect, useRef} from "react";

export function useCounter(variable, name){
    const ref = useRef(0);

    const count = () =>{
        ref.current = ref.current +1
    }

    useEffect(()=>{
        count()
    },[variable])

    useEffect(()=>{
        console.log(`Counter ${name}: ${ref.current}`,variable)
    },[ref.current])
}
