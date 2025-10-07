import { createContext, useContext, useState, useEffect } from "react";
import axios  from "axios"
import { toast } from "react-toastify"

export const CartContext = createContext()

export const CartProvider = ( {children} ) => {
    const [cart,setCart]= useState(null)
    const [message,setMessage]=useState("")
    const addToCart = async (productId, quantity=1)=>{
        try {
    const authToken =()=>(
        {
            headers:{Authorization : `Bearer ${localStorage.getItem("token")}`}
        }
    )
    // console.log(`Bearer ${localStorage.getItem("token")}`)
            if(!localStorage.getItem("token")) {
                toast.error("kindly login to continue")
                return;
            }
            const response = await axios.post("https://davidbackend-ts7d.onrender.com/api/cart",{productId, quantity },authToken())

            setCart(response.data)
            setMessage(response.data?.message)
        toast(message)
        } catch (error) {
            setMessage(error.response?.data?.message)
            console.log(error)
        }
    }

    return (
        <CartContext.Provider value={{addToCart}}>
            {children}
        </CartContext.Provider>
    )
}