import { createContext, useState, useEffect } from "react";

export const AppContext = createContext()
export const AppProvider = ({children})=>{
    const [user,setUser]=useState(()=>{
        const check = localStorage.getItem("myLogin")
        if (!check || check === "undefined"){
            return null
        }else{
            return JSON.parse(check)
        }
    })
    const [err,setErr]=useState("")

    useEffect(()=>{
        localStorage.setItem("myLogin",JSON.stringify(user))
    },[user])

    const login =( email, password)=>{
        if(email==="aninku@gmail.com" && password==="Davids5@"){
            setUser("Mr David")
            
            
            return true
        }else{
            setErr("Invalid credentials")
        

            return false
        }
    }
    return (
        <AppContext.Provider value={{login,user,err}}>
        {children}
        </AppContext.Provider>
    )
}