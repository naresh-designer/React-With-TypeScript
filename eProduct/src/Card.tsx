
import { PRODUCT_API } from './api';
import Heading, { type HeadingProp } from './Heading'
import useFetchState from './Hook/useFetchState';

// Card Heading
const showHeading: HeadingProp = { 
    fName:"Card Listing",
}

// Card InterFace
interface Rating{
    rate:number;
    count:number
}
interface CardProp{
    id:number;
    title:string;
    price:number;
    rating:Rating
}

const Card = () => {
    const {data:items} = useFetchState<CardProp[]>(PRODUCT_API)
  return (
    <>
        {/* Card Heading */}
        <Heading fName={showHeading.fName}/>

        <div className='grid grid-cols-3 gap-5'>
            {
                items?.slice(0,3).map((curElm)=>{
                    return(
                        <div key={curElm.id} className='bg-gray-200 p-6'>
                            <h1>Title: {curElm.title}</h1>
                            <p>Price: ₹{curElm.price}</p>
                            <p>Rate: {curElm.rating.rate}</p>
                        </div>
                    )
                })
            }
        </div>
    </>
  )
}

export default Card