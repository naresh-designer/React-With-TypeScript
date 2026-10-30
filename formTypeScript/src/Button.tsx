
interface ButtonProp{
    children:React.ReactNode;
    className:string;
}
const Button = ({children,className}:ButtonProp) => {
  return (
    <>
        <button type='submit' className={className}>{children}</button>
    </>
  )
}

export default Button