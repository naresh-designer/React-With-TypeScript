import React, { useEffect, useMemo, useState } from "react"
import type { HeadingType } from "./Heading"
import Heading from "./Heading"
import { FetchJson } from "./FetchJson";
import { API_URL } from "./api";
import useDebounce from "./useDebounce";

let limit:number = 30





// Heading Prop
const CardProp: HeadingType = {
    fName:"Pokemon Listing"
}

// Pokemon InterFace
interface Ability{
    ability:{
        name:string
    }
}

interface PokemonList{
    id:number;
    name:string;
    abilities:Ability[]
}





interface PokemonResult{
    name:string;
    url:string
}

interface ShowPokemonResult{
    results:PokemonResult[]
}



const Card = () => {
    const[pokemon,setPokemon]=useState<PokemonList[]>([])
    const[search,setSearch]=useState<string>('')
    const[isLoading,setIsLoading]=useState<boolean>(false)
    const{debounce}=useDebounce({value:search,delay:500})

    const fetchData = async()=>{
        setIsLoading(true)
        try {
            const pokemonData:ShowPokemonResult = await FetchJson(`${API_URL}?limit=${limit}`)

            const promiseResult = pokemonData.results.map(async(curUrl)=>{
                const promiseData:PokemonList = await FetchJson(curUrl.url)
                return promiseData
            })

            const promises = await Promise.all(promiseResult) 
            setPokemon(promises)
        } catch (error) {
            if(error instanceof Error){
                console.error(error.message);
            }
        }finally{
            setIsLoading(false)
        }
    }


    useEffect(()=>{
        fetchData()
    },[])


    // Filter Search
    const filterSearch = useMemo(()=>{
        return pokemon.filter((curFilter)=>{
            return curFilter.name.includes(debounce.toLowerCase())
        })
    },[pokemon,debounce])

  return (
    <>

        
    <Heading fName={CardProp.fName}/>

    <form>
        <input type="text" placeholder="Pokemon Search" value={search} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setSearch(e.target.value)} className="border-1 border-gray-300 h-13 w-full mt-10 px-4"/>
    </form>

    <table className=" w-full mt-3 text-white">
        <thead>
            <tr>
                <th className="p-4 bg-gray-500">Id</th>
                <th className="p-4 bg-gray-500">Name</th>
                <th className="p-4 bg-gray-500">Abilities</th>
            </tr>
        </thead>

            <tbody>
                {
                    isLoading ? (
                        <tr>
                        <td colSpan={3} className="text-center text-2xl">
                            Loading...
                        </td>
                        </tr>
                    )  :
                    (
                        filterSearch.map((item)=>{
                            return(
                                <tr key={item.id}>
                                    <td className="p-4 bg-gray-300 text-center text-black border-1 border-gray-200">
                                        {item.id}
                                    </td>
                                    <td className="p-4 bg-gray-300 text-center text-black border-1 border-gray-200">
                                        {item.name}
                                    </td>
                                    <td className="p-4 bg-gray-300 text-center text-black border-1 border-gray-200">
                                        {item.abilities.map((curAb)=>curAb.ability.name).join(', ')}
                                    </td>
                                </tr>
                            )
                        })
                    )
                }
            </tbody>
    </table>
    </>
  )
}

export default Card