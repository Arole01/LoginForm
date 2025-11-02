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
            toast(message)
        }
    }

    const updateQuantity = async (productId, quantity)=> {
        try {
            if (quantity <1) {
                toast.error("Quantity cannot be less than 1")
                return
            }
            console.log(productId)
            const {data} = await axios.put(`https://davidbackend-ts7d.onrender.com/api/cart/${productId}`,{quantity}, authToken())
            
            console.log("datasss".data);
        setCart(data)
        toast.success(data?.message)

        const response = await axios.get("https://davidbackend-ts7d.onrender.com/api/cart", authToken());
        } catch (error) {
            setMessage(error.response?.data?.message)
            toast(message)
        }
    
        
    }

    const getTotal =()=> {
        return cart.items.reduce((cur,acc)=>(cur + acc.product.price* acc.quantity),0)
    }
    const removeCart = async (productId)=>{
        try {
            const {data} = await axios.delete(`https://davidbackend-ts7d.onrender.com/api/cart/${productId}`, authToken());
            setCart(data)
            toast.success("cart removed")
        } catch (error) {
            setMessage(error.response?.data?.message)
            toast(error.response?.data?.message)
        }
    }
        const clearCart =async ()=>{
            try {
                await axios.delete (`https://davidbackend-ts7d.onrender.com/api/cart`)
                toast.success('cart cleared')
            } catch (error) {
                toast(error.response?.data?.message)
            }
        }
    return (
        <CartContext.Provider value={{addToCart,cart,getTotal,updateQuantity,removeCart,clearCart}}>
            {children}
        </CartContext.Provider>
    )
}