
interface HeadingProp{
    fName:string;
    lName:string;
}

export type OptHeading = Partial<HeadingProp>

const Heading = ({fName,lName}: OptHeading) => {
  return (
    <>
    <div className="text-center">
        <h2 className="text-3xl tracking-[2px]">{fName}</h2>
        <h3 className="text-2xl">{lName}</h3>
    </div>
    </>
  )
}

export default Heading