import React from 'react'
import { useState,useEffect,createContext } from 'react'
import { useNavigate } from 'react-router-dom'

export const AppContext = createContext ()


export const AuthContext = ({children}) => {
    const navigate = useNavigate()
    const [token,setToken] = useState(null)
    const [user,setUser] = useState(null)

    useEffect(()=> {
        const checkToken = localStorage.getItem("token")
        const checkUser = localStorage.getItem("user")

        if(checkToken && checkUser) {
            setToken(checkToken);
            setUser(JSON.parse(checkUser))
        }

    
    },[])
    const loginAuth = (data)=>{
        localStorage.setItem("token",data.token)
        localStorage.setItem("user",JSON.stringify(data.user))
    }

    const logout =()=>{
        localStorage.removeItem("token")
        setUser(null)
        localStorage.removeItem("user")
        setToken(null)
        navigate("/login")
    }

    return(
        <AppContext.Provider value={{token,user,loginAuth,logout}}>{children}
        </AppContext.Provider>
    )
}


