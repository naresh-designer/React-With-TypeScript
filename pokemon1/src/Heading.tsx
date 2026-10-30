
interface HeadingProp{
    fName:string;
    lName:string
}

export type HeadingType = Partial<HeadingProp>


const Heading = ({fName,lName}:HeadingType) => {
  return (
    <>
    <div className="text-center text-4xl">
        <h3>{fName}</h3>
        <h4>{lName}</h4>
    </div>
    </>
  )
}

export default Heading