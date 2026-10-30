import { useEffect, useState } from "react"
import type { HeadingProp } from "./Heading"
import Heading from "./Heading"
import { USER_API } from "./api";

// Card Heading
const showHeading: HeadingProp = { 
    fName:"User Listing",
}

// User Listing
interface loaction{
    lat:string;
}
interface address{
    city:string;
    street:string
    geolocation:loaction
}
interface name{
    firstname:string;
    lastname:string
}
interface UserProp{
    id:number;
    name:name
    address:address
}

const User = () => {
    const[user,setUser]=useState<UserProp[]>([])

    useEffect(()=>{
        const fetchData = async() =>{
            try {
                const res = await fetch(USER_API)
                if(!res.ok){
                    throw new Error(`Faild To Fetch ${res.status} or ${res.statusText}`)
                }
                const data: UserProp[] = await res.json() 
                setUser(data)
                
            } catch (error) {
                if(error instanceof Error){
                    console.error(`Show Error ${error.message}`);
                }
                throw Error
            }
        }
        fetchData()
    },[])

  return (
    <>
        <Heading fName={showHeading.fName}/>
        <div className="grid grid-cols-3 gap-5">
            {
                user.map((curElm)=>{
                    return(
                        <div key={curElm.id} className="bg-gray-200 p-8">
                            <h3>First Name: {curElm.name.firstname}</h3>
                            <p>City: {curElm.address.city}</p>
                            <p>Location: {curElm.address.geolocation.lat}</p>
                        </div>
                    )
                })
            }
        </div>
    </>
  )
}

export default User