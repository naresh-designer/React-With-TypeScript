import { URL_API } from "./api"
import useFetchState from "./useFetchState"


const SearhCard = () => {
    const {searhFilter,search,setSearch} = useFetchState(URL_API)
  return (
    <>

    <form>
        <input
         type="text"
         placeholder="Search Pokemon"
         value={search}
         onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setSearch(e.target.value)}
         className="border-1 border-gray-300 h-12 px-4 w-full my-8"  />
    </form>
    
        <div className="grid grid-cols-3 gap-5">
            {
                searhFilter.map((curElm)=>{
                    return(
                        <div key={curElm.id} className="bg-gray-200 p-8">
                            <p>id: {curElm.id}</p>
                            <p>Name: {curElm.name}</p>
                            <p>Height: {curElm.height}</p>
                            <p>Weight: {curElm.weight}</p>
                        </div>
                    )
                })
            }
        </div>
    </>
  )
}

export default SearhCard