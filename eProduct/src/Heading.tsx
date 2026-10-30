
export interface HeadingProp{
    fName:string;
    lName?:string
}

const Heading = ({fName,lName}: HeadingProp) => {
  return (
    <>
        <div className="text-center py-5 text-4xl">
            <h2>{fName}</h2>
            <h3>{lName}</h3>
        </div>
    </>
  )
}

export default Heading