import React, {useContext, useState} from 'react'
import { CartContext } from './cartContext'
import axios from 'axios'
import { AppContext } from './authContext'

export const Cart = () => {
    const [loading,setLoading] = useState(false)
    const { cart, updateQuantity, getTotal, removeCart, clearCart } = useContext(CartContext)

        const {user}=useContext(AppContext)
    const authToken =()=>(
        {
            headers:{Authorization : `Bearer ${localStorage.getItem("token")}`}
        }
    )

    const handleCheckout = async ()=> {
        try {

            const orderRes = await axios.post("https://davidbackend-ts7d.onrender.com/api/orders",{
                items:cart.items,
                totalAmount:getTotal()
            },authToken())
                setLoading(true)
            const orderId = orderRes.data._id

            const payment = await axios.post("https://davidbackend-ts7d.onrender.com/api/payments/init",{orderId,customerEmail:user.email},authToken())

            window.location.href=payment.data.data.checkout_url
            clearCart()
            
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    if (!cart || !cart.items || cart.items.length === 0)
        return <h2>Your cart is currently empty</h2>

    return (
    <div>
        <h2>Your cart</h2>
        <div>
        {cart.items.map((item, index) => (
            <div key={index}>
                <h3>{item.product.name}</h3>
                <p>Quantity: <button onClick={()=>{updateQuantity(item.product._id,item.quantity-1)}}>-</button>
                {item.quantity}
                <button onClick={()=>{updateQuantity(item.product._id,item.quantity +1)}}>+</button>
                </p>
                <p>Price: {item.product.price}</p>
                <p>Item total:{Math.round(item.product.price*item.quantity)}</p>
                <button onClick={()=>{removeCart(item.product._id)}}>Delete</button>
            </div>
        ))}
        </div>
        <h2>
            totalprice:{Math.round(getTotal())}
        </h2>

        <button onClick={handleCheckout} disabled={loading}>{loading? "Proceeding": "Proceed to checkout"}</button>
        </div>
    )
}

