import React, {useContext} from 'react'
import { CartContext } from './cartContext'

export const Cart = () => {
    const { cart } = useContext(CartContext)

    if (!cart || !cart.items || cart.items.length === 0)
        return <h2>Your cart is currently empty</h2>

    return (
    <div>
        <h2>Your cart</h2>
        <div>
        {cart.items.map((item, index) => (
            <div key={index}>
                <h3>{item.product.name}</h3>
                <p>Quantity: {item.quantity}</p>
                <p>Price: {item.product.price}</p>
            </div>
        ))}
        </div>
        </div>
    )
}

