import { URL_API } from "./api"
import useFetch from "./Hook/useFetch"

// Create Interface For Rating
interface Rating{
    rate:number;
    count:number;
}

// Using Utility Type Reacod for Create String
type StringRole = Record<"title" | "description" | "category", string>
type NumberRole = Record<"id" | "price", number>

// Create Interface Card Data
interface CardProp extends StringRole, NumberRole{
    rating:Rating
}

// Using Utility Type Partial For Create Card Data
type ParticalData = Partial<CardProp>

const Card = () => {
    const {items,loading:isLoading,error} = useFetch<ParticalData[]>(URL_API)
    
  return (
    <>
        <div className="grid grid-cols-3 gap-3">

            {
                error && (
                    <div className="col-span-3 text-center">
                        <h1 className="text-2xl font-bold">{error}</h1>
                    </div>
                )
            }

            {isLoading && (
                <div className="col-span-3 text-center">
                    <h1 className="text-2xl font-bold">Loading...</h1>
                </div>
            )}

            {
                items?.map((curElm)=>{
                    return(
                        <div key={curElm.id} className="bg-gray-300 p-5">
                            <p>{curElm.title}</p>
                            <p>{curElm.description}</p>
                            <p>{curElm.price}</p>
                            <p>{curElm.rating?.rate}</p>
                        </div>
                    )
                })
            }
        </div>
    </>
  )
}

export default Card