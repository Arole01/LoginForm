import React, { useContext } from 'react'
import { AppContext } from './authContext'
import { useNavigate } from 'react-router-dom'
// import validator
import * as Yup from "yup"
//import hook form
import {useForm} from "react-hook-form"
// import resolver
import {yupResolver} from "@hookform/resolvers/yup"
import axios from 'axios'
import {toast} from 'react-toastify'
import "./Login.css"


export const Login = () => {
    const navigate = useNavigate()
    const {loginAuth} = useContext(AppContext)

    const schema =Yup.object(
    {
        email:Yup.string().required().trim().email(),
        password:Yup.string().required().min(3).max(10)
        .matches( /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,10}$/,
            "Password should contain Capital letter,small letter and a number")
    }
)

const {handleSubmit,register,formState:{errors}

} = useForm({resolver:yupResolver(schema)})


    // const [typeName, setTypeName] = useState("")
    // const [typedPassword, setTypedPassword] = useState("")
    // console.log ("data")
    const Submit = async (data) => {
        try {

            const response= await axios.post("https://davidbackend-ts7d.onrender.com/api/auth/login", data)
            console.log(response)
            loginAuth(response.data)
            toast.success("Login successful")
            navigate("/")
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message)
        }
    }

    return (
    
        <div>
            <form className="form-container" onSubmit={handleSubmit(Submit)}>
                <input className="user" type='text' placeholder='email' {...register("email")}/>
                {errors.email && <p style={{color:"red"}}>{errors.email.message}</p>}
                <input className="pass" type='password' placeholder='password' {...register("password")}/>
                {errors.password && <p style={{color:"red"}}>{errors.password.message}</p>}
                <button className='submit' type='submit'>Login</button>
            </form>

    
        </div>
    )
}

export default Login