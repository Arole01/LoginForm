import React, {useContext} from 'react'
import { CartContext } from './cartContext'

export const Cart = () => {
    const { cart, updateQuantity, getTotal, removeCart } = useContext(CartContext)

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
        </div>
    )
}

