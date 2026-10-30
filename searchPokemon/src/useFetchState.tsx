import { useEffect, useMemo, useState } from "react";
import { FetchJson } from "./FetchJson";
import useDebounce from "./useDebounce";

// Pokemon Data
interface Pokemon{
    id:number;
    name:string;
    height:number;
    weight:number
}

interface PokemonResult{
    name:string;
    url:string
}

interface ShowPokemonResult{
    results:PokemonResult[]
}

const useFetchState = (url:string) => {
    const [pokemon,setPokemon] = useState<Pokemon[]>([])
    const [search,setSearch]=useState<string>('')
    const debounce = useDebounce({value:search,delay:300})

    const fetchData = async()=>{
        try {

            const data: ShowPokemonResult = await FetchJson(url)

            const shwoResults = data.results.map(async(curElm)=>{
                const shwoData: Pokemon = await FetchJson(curElm.url)
                return shwoData
            })

            const promises = await Promise.all(shwoResults)
            setPokemon(promises)

        } catch (error) {
            if(error instanceof Error){
                console.error(error.message);
            }else{
                throw Error
            }
        }
    }

    useEffect(()=>{
        fetchData()
    },[url])

    // Search Filter
    const searhFilter = useMemo(()=>{
        return pokemon.filter((curFilter)=>{
            return curFilter.name.toLowerCase().includes(debounce.toLowerCase())
        })
    },[debounce,pokemon])

  return {searhFilter,search,setSearch}
}

export default useFetchState