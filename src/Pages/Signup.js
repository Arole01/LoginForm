import { useForm } from "react-hook-form"
import * as Yup from "yup"
import { useState,useEffect } from "react"
import {yupResolver} from "@hookform/resolvers/yup"
import { toast } from 'react-toastify'
import axios from 'axios'
import { Link } from "react-router-dom"

const schema = Yup.object({
    name:Yup.string().required().trim(),
    email:Yup.string().email().required(),
    password:Yup.string().required().min(3).max(10)
        // .matches( /^(?=.[A-Z])(?=.[a-z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,10}$/,
        //     "Password should contain Capital letter,small letter and a number")
})

const Signup = () => {
const [loading,setLoading] = useState(false)
const {handleSubmit,register,formState:{errors}

} = useForm({resolver:yupResolver(schema)})
const submit = async (data)=> {
    try {
        setLoading(true)
        const response = await axios.post("https://davidbackend-ts7d.onrender.com/api/auth/register", data)
        toast.success(response?.data?.message || "Signup successful")
    } catch (error) {
        toast.error(error.response.data.message)
    }finally{
        setLoading(false)
    }
}
    return (
        <div>
            <h1>Welcome, kindly provide your information here</h1>
        <form onSubmit={handleSubmit(submit)}>
            <input type="text" placeholder="Your name" {...register("name")}/>
            {errors.name && <p style={{color:"red"}}>{errors.name.message}</p>}
            <input type="email" placeholder="your email" {...register("email")}/>
            {errors.email && <p style={{color:"red"}}>{errors.email.message}</p>}
            <input type="text" placeholder="your password" {...register("password")}/>
            {errors.password && <p style={{color:"red"}}>{errors.password.message}</p>}
            
            <button disabled={loading}>{loading? "Signing up": "Sign up"}</button>
            </form>

            <p>Already have an account?<Link to="/login"> <button>Login</button></Link></p>
        </div>
    )
}

export default Signup