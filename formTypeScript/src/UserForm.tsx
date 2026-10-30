import React, { useState, type FormEvent } from "react";
import Button from "./Button"
import Lable from "./Lable"

// Create Reacord For Field String
type FormRole = Record<"fName" | "lName" | "email" | "password", string>


// Create FromProp Useing Interface
interface FormProp extends FormRole{
    phone:number;
}


// Create Partial for All Fields Partial
type PartialForm = Partial<FormProp>



const UserForm = () => {
    const[formItems,setFormItems]=useState<PartialForm>({
        fName:'',
        lName:'',
        email:'',
        password:'',
        phone:0,
    })

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const{name, value} = e.target

        setFormItems((prev)=>({
            ...prev, [name]:value
        }))
    }


    const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        console.log(formItems);
        
    }
  return (
    <>
        <form onSubmit={handleSubmit}>
            <Lable className="w-full">First Name</Lable>
            <input className="w-full border border-gray-300 py-3 px-3 my-3 rounded"
             type="text" 
             name="fName" 
             value={formItems.fName} 
             onChange={handleChange}
             placeholder="First Name" 
             required />
            <Lable className="w-full">Last Name</Lable>
            <input className="w-full border border-gray-300 py-3 px-3 my-3 rounded"
             type="text" 
             name="lName" 
             value={formItems.lName} 
             onChange={handleChange}
             placeholder="Last Name" 
             required />
            <Lable className="w-full">Email</Lable>
            <input className="w-full border border-gray-300 py-3 px-3 my-3 rounded"
             type="email" 
             name="email" 
             value={formItems.email} 
             onChange={handleChange}
             placeholder="Email" 
             required />
            <Lable className="w-full">Password</Lable>
            <input className="w-full border border-gray-300 py-3 px-3 my-3 rounded"
             type="password" 
             name="password" 
             value={formItems.password}
             onChange={handleChange}
             placeholder="Password" 
             required />
            <Lable className="w-full">Phone</Lable>
            <input className="w-full border border-gray-300 py-3 px-3 my-3 rounded"
             type="tel" 
             name="phone" 
             value={formItems.phone} 
             onChange={handleChange}
             placeholder="Phone" 
             required />
            <Button className="bg-blue-600 text-white py-3 px-6 rounded">Submit</Button>
        </form>
    </>
  )
}

export default UserForm