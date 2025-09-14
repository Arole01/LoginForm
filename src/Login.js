import React, { useState } from 'react'

export const Login = () => {

    const handleSubmit =(e)=>{
        e.preventDefault()
        Login()
    }
    const [typeName, setTypeName] = useState("")
    const [typedPassword, setTypedPassword] = useState("")
    return (
    <div>
        <form onSubmit={{handleSubmit}}>
            <input type='text' placeholder='username' onChange={(u)=>{
                setTypeName(u.target.value)
            }}/>
            <input type='password' placeholder='password' onChange={(p)=>{
                setTypedPassword(p.target.value)
            }}/>
            <button type='submit'>Login</button>
        </form>
    </div>
    )
}

export default Login
