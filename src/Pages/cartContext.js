import { createContext, useContext, useEffect, useState } from "react";
import axios  from "axios"
import { toast } from "react-toastify"
import { AppContext } from "./authContext";

export const CartContext = createContext()

export const CartProvider = ( {children} ) => {
    const [cart,setCart]= useState({ items: [] })
    const {user} = useContext(AppContext)
    const [message,setMessage]=useState("")
    const authToken =()=>(
        {
            headers:{Authorization : `Bearer ${localStorage.getItem("token")}`}
        }
    )
    useEffect(() => {
        if (!user) return;
    console.log(user)
        const fetchCart = async () => {
            try {
                const { data } = await axios.get("https://davidbackend-ts7d.onrender.com/api/cart", authToken())
                console.log(data)
                console.log("fact")
                setCart(data)
            } catch (error) {
                toast.error(error.response?.data?.message || "Failed to fetch cart")
            }
        }
        fetchCart()
    }, [user])
    // console.log(`Bearer ${localStorage.getItem("token")}`)
        const addToCart = async ( productId, quantity =1)=>{
            try {
                if(!localStorage.getItem("token")) {
                toast.error("kindly login to continue")
                return;
            }
            
            const { data } = await axios.post("https://davidbackend-ts7d.onrender.com/api/cart",{productId, quantity },authToken())

            setCart(data.data)
            setMessage(data?.message)
        toast.success(data?.message)
        } catch (error) {
            setMessage(error.response?.data?.message)
            console.log(error)
        }
    }

    return (
        <CartContext.Provider value={{addToCart,cart}}>
            {children}
        </CartContext.Provider>
    )
}