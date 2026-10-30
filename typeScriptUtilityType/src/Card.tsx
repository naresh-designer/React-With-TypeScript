import { useCallback, useEffect, useMemo, useState } from "react";
import type { OptHeading } from "./Heading"
import Heading from "./Heading"
import { FetchJson } from "./FetchJson";
import { URL_API } from "./Api";
import useDebounce from "./useDebounce";

// Heading
const CardHeading: OptHeading={
    fName:'Card Listing'
}

// Create Interface For Ability
interface Ability{
    ability:{
        name:string;
    }
}

// Create Interface For Image
interface Image{
    other:{
        dream_world:{
            front_default:string;
        }
    }
}

// Create Record For Number
type NumberRole = Record<"id" | "height" | "weight", number>

// Create Interface For Pokemon
interface Pokemon extends NumberRole{
    name:string;
    sprites:Image;
    abilities:Ability[];
}

// Create Interface For Pokmeon Result
interface PokemonReslut{
    name:string;
    url:string;
}

// Create Interface For ShowPokemonResult
interface ShowPokemonResult{
    results:PokemonReslut[]
}

const Card = () => {
    const[pokemon,setPokemon]=useState<Pokemon[]>([])
    const[loading,setLoading]=useState<boolean>(false)
    const[error,setError]=useState<string | null>(null)
    const[input,setInput]=useState<string>('')
    const debounce = useDebounce({value:input,delay:300})

    const fetchData = useCallback(async()=>{
        setLoading(true)
        try {
            const data = await FetchJson<ShowPokemonResult>(URL_API)

            const resResult = data.results.map(async(curUrl)=>{
                const dataResult = await FetchJson<Pokemon>(curUrl.url)
                return dataResult
            })

            const promises = await Promise.all(resResult)
            setPokemon(promises)

        } catch (error) {
            if(error instanceof Error){
                setError(error.message);
            }else{
                console.error('Someting Mistake');
                
            }
        }finally{
            setLoading(false)
        }
    },[])

    // Filter Search
    const filterSearch = useMemo(()=>{
        return pokemon.filter((curElm)=>{
            return curElm.name.toLowerCase().includes(debounce)
        })
    },[debounce,pokemon])


    useEffect(()=>{
        fetchData()
    },[fetchData])

  return (
    <>
        <Heading {...CardHeading}/>

        {/* Search Input */}
        <form className="mt-10">
            <input type="text"
             placeholder="Search Pokmeon" 
             className="border-1 border-gray-300 w-full py-3 px-2" 
             value={input} 
             onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setInput(e.target.value)} />
        </form>

        <table className="w-full border-gray-200 border-1">
            <thead>
                <tr>
                    <th className="w-[20%] bg-gray-200 py-5">Image</th>
                    <th className="w-[20%] bg-gray-200 py-5">Name</th>
                    <th className="w-[20%] bg-gray-200 py-5">Height</th>
                    <th className="w-[20%] bg-gray-200 py-5">weight</th>
                    <th className="w-[20%] bg-gray-200 py-5">Ablity</th>
                </tr>
            </thead>
            <tbody>

                <tr>
                    <td colSpan={5} className="p-5 text-center">{error && <p>Someting Want Wrong.......</p>}</td>
                </tr>
                
                {
                    filterSearch.length === 0 && (
                        <tr>
                            <td colSpan={5} className="p-5 text-center">No Data Found</td>
                        </tr>
                    )
                }
        
                {
                  loading ? 
                  (<p>Loading.....</p>) :
                    (
                        filterSearch.map((curElm)=>{
                        const images = curElm.sprites.other.dream_world.front_default
                        const abilitys = curElm.abilities.map((elm)=> elm.ability.name).join(', ')
                        return(
                            <tr key={curElm.id}>
                                <td className="text-center border-b border-b-gray-200 py-5 snap-center pl-5"><img src={images} alt={curElm.name} className="h-20 snap-center" /></td>
                                <td className="text-center border-b border-b-gray-200 py-5 text-center">{curElm.name}</td>
                                <td className="text-center border-b border-b-gray-200 py-5 text-center">{curElm.height}</td>
                                <td className="text-center border-b border-b-gray-200 py-5 text-center">{curElm.weight}</td>
                                <td className="text-center border-b border-b-gray-200 py-5 text-center">{abilitys}</td>
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