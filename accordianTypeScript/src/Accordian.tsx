import { useCallback, useEffect, useState } from "react"
import { FetchJson } from "./FetchJson";
import { URL_API } from "./api";


type role = Record<"title" | "description", string>

interface Accordian extends role{
    id:number;
}

const Accordian = () => {

    const[faq,setFaq]=useState<Accordian[]>([])
    const[show,setShow]=useState<number | null>(null)

    const fetchData = useCallback(async()=>{
        try {
            const data = await FetchJson<Accordian[]>(URL_API)
            setFaq(data)
        } catch (error) {
            if(error instanceof Error){
                console.error(error.message);   
            }
        }
    },[faq])

    useEffect(()=>{
        fetchData()
    },[])

    const hancleClick = (i:number) =>{
       
            setShow((curElm)=>
                curElm === i ? null : i
            )
        
    }
  return (
    <>
        <ul>
            {
                faq.map((curElm,i)=>{
                    return(
                        <li key={curElm.id} className="border-1 border-gray-300 mb-10 transition">
                            <p className={`${show === i ? 'bg-gray-800 px-5 py-2 text-white transition' : 'bg-gray-300 px-5 py-2'}`} 
                            onClick={()=>hancleClick(i)}>{curElm.title}</p>
                            {
                                show === i && (
                                    <p className="p-5">{curElm.description}</p>
                                )
                            }
                            
                        </li>
                    )
                })
            }
        </ul>
    </>
  )
}

export default Accordian