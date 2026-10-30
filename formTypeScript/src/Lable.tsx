import type React from "react";

interface LableProp{
    children:React.ReactNode;
    className:string;
}

const Lable = ({children,className}:LableProp) => {
  return (
    <>
        <label className={className}>{children}</label>
    </>
  )
}

export default Lable