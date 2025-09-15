import { createContext, useState, useEffect } from "react";

export const AppContext = createContext()
export const AppProvider = ({children})=>{
    const [user,setUser]=useState(null)
    const [err,setErr]=useState(()=>{
        const check = localStorage.getItem("myLogin")
        if (!check || check === "undefined"){
            return""
        }else{
            return JSON.parse(check)
        }
    })

    useEffect(()=>{
        localStorage.setItem("myLogin",JSON.stringify(err))
    },[err])

    const login =( username, password)=>{
        if(username==="aninku" && password==="1234"){
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