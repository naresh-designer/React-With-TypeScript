import { useCallback, useEffect, useState } from "react";
import { FetchJson } from "../FetchJson";

interface FetchProp<T>{
    items: T | null;
    loading:boolean;
    error:string | null;
}

const useFetch = <T,>(url:string): FetchProp<T> => {

    const[items,setItems]=useState<T | null>(null)
    const[isLoading,setIsLoading]= useState<boolean>(false)
    const[error,setError]=useState<string | null>(null)

    const fetchData = useCallback(async()=>{
        setIsLoading(true)
        try {
            const data = await FetchJson<T>(url)
            setItems(data)
        } catch (error) {
            if(error instanceof Error){
                setError(error.message);
            }else{
                setError('Someting Want Error')
            }
        }finally{
            setIsLoading(false)
        }
    },[])

    useEffect(()=>{
        fetchData()
    },[url])

  return {items,loading:isLoading,error}
}

export default useFetch