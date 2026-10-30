import { useEffect, useState } from "react"
import { FetchJson } from "../FetchJson"


interface FetchState<T>{
    data:T | null
}
function useFetchState<T>(url:string): FetchState<T>{

    const[items,setItems]=useState<FetchState<T>>({data:null})

    useEffect(()=>{
        const fetchData = async()=>{
            try {
                const data = await FetchJson<T>(url)
                setItems({data})
            } catch (error) {
                if(error instanceof Error){
                    console.error(`Show Error ${error.message}`);
                }
                throw Error
            }
        }
        fetchData()
    },[url])

  return items
}

export default useFetchState