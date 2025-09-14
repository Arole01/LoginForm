import React, { useState, useContext } from 'react'
import { AppContext } from './Context'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
    const { login, err, user } = useContext(AppContext)
    const navigate = useNavigate()

    const [typeName, setTypeName] = useState("")
    const [typedPassword, setTypedPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        // Assuming login returns a promise or boolean
        const checkLogin = await login(typeName, typedPassword)
        if (checkLogin) {
            navigate("/")
        }
    }

    return (
        <div className="login-form">
            <form className="form-container" onSubmit={handleSubmit}>
                <input className="user"
                    type='text'
                    placeholder='username'
                    onChange={(u) => setTypeName(u.target.value)}
                />
                <input className="pass"
                    type='password'
                    placeholder='password'
                    onChange={(p) => setTypedPassword(p.target.value)}
                />
                <button type='submit'>Login</button>
            </form>
            {err && <p style={{ color: "red" }}>{err}</p>}
            {user && <p>Login successful</p>}
        </div>
    )
}

export default Login