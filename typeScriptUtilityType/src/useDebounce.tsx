import { useEffect, useState } from "react";

interface Debounce{
    value:string;
    delay:number;
}

const useDebounce = ({value,delay}:Debounce) => {
    const[debounce,setDebounce]=useState(value)
    
    useEffect(()=>{
        const timeId = setTimeout(() => {
            setDebounce(value)
        }, delay);
        return()=>clearTimeout(timeId)
    },[value,delay])

  return debounce
}

export default useDebounce