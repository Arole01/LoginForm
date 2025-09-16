import React, { useState, useContext } from 'react'
import { AppContext } from './Context'
import { useNavigate, Link } from 'react-router-dom'
// import validator
import * as Yup from "yup"
//import hook form
import {useForm} from "react-hook-form"
// import resolver
import {yupResolver} from "@hookform/resolvers/yup"



export const Login = () => {

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

    const { login, err, user } = useContext(AppContext)
    const navigate = useNavigate()

    // const [typeName, setTypeName] = useState("")
    // const [typedPassword, setTypedPassword] = useState("")

    const Submit =(e) => {
        const checkLogin =login(e.email,e.password)
        if (checkLogin) {
            navigate("/")
        }
    }

    return (
    
        <div>
            <form className="form-container" onSubmit={handleSubmit(Submit)}>
                <input className="user" type='text' placeholder='email' {...register("email")}/>
                {errors.email && <p style={{color:"red"}}>{errors.email.message}</p>}
                <input className="pass" type='password' placeholder='password' {...register("password")}/>
                {errors.password && <p style={{color:"red"}}>{errors.password.message}</p>}
                <button type='submit'>Login</button>
            </form>
            {err && <p style={{ color: "red" }}>{err}</p>}
            {user && <p style={{color: "blue"}}>Login successful</p>}

    
        </div>
    )
}

export default Login