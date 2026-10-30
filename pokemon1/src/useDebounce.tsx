import { useEffect, useState } from "react";

interface DebounceProp{
    value:string;
    delay:number;
}

const useDebounce = ({value,delay}:DebounceProp) => {
    const[debounce,setDebounce]=useState(value)

    useEffect(()=>{
        const timer = setTimeout(()=>{
            setDebounce(value)
        },delay)

        return ()=> clearTimeout(timer)
    },[value,delay])

  return {debounce}
}

export default useDebounce


