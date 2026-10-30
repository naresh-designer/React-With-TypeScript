import React, { useEffect, useState } from "react"
import { FetchJson } from "./FetchJson";
import { API_URL } from "./api";

interface Ablities{
    ability:{
        name:string;
    };

}

interface Pokemon{
    id:number;
    name:string;
    abilities:Ablities[];
}

interface PokemonReslut{
    name:string;
    url:string
}

interface ShowPokemonResult{
    results:PokemonReslut[]
}

const Select = () => {
    const[select,setSelect]=useState<PokemonReslut[]>([])
    const[shwoData,setShowData]=useState<Pokemon | null>(null)
    const[isLoading,setIsLoading]=useState<boolean>(false)

    useEffect(()=>{
        const fetchData = async()=>{
            try {
                const data = await FetchJson<ShowPokemonResult>(API_URL)
                setSelect(data.results)
            } catch (error) {
                if(error instanceof Error){
                    console.error(`Show Error Message ${error.message}`);
                }else{
                    throw Error
                }
            }
        }
        fetchData()
    },[])


    const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) =>{
        const value = e.target.value 
        setIsLoading(true)
        try {
            const data = await FetchJson<Pokemon>(value)
            setShowData(data)
        } catch (error) {
            if(error instanceof Error){
                console.error(`Show Error Message ${error.message}`);
            }else{
                throw Error
            }
        }finally{
            setIsLoading(false)
        }
    }


  return (
    <>
        <form>
            <select onChange={handleChange} className="border-1 w-full border-gray-300 h-12 px-2 text-gray-600 tracking-(--letter-trak) my-6">
                <option>select Pokemon</option>

                {
                    select.map((curUrl)=>{
                        return(
                            <option key={curUrl.name} value={curUrl.url}>{curUrl.name}</option>
                        )
                    })
                }
            </select>
        </form>


        <table className="w-full">
            <thead>
                <tr>
                    <th className="w-[33.33%] bg-gray-600 py-4 text-white">Id</th>
                    <th className="w-[33.33%] bg-gray-600 py-4 text-white">Name</th>
                    <th className="w-[33.33%] bg-gray-600 py-4 text-white">Abilities</th>
                </tr>
            </thead>
            <tbody>

                {
                    isLoading && 
                    <tr>
                        <td colSpan={3}>Loading</td>
                    </tr>
                }
                {
                    shwoData && (
                        <tr>
                            <td className="bg-gray-400 py-4 text-white text-center">{shwoData.id}</td>
                            <td className="bg-gray-400 py-4 text-white text-center">{shwoData.name}</td>
                            <td className="bg-gray-400 py-4 text-white text-center">{shwoData.abilities.map((curElm)=>curElm.ability.name).join(', ')}</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    </>
  )
}

export default Select