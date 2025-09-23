// import React from 'react'
// import { AppContext } from './Context'
// import { useContext } from 'react'
// import { Link } from 'react-router-dom'


// export const Home = () => {
//     const { user} = useContext(AppContext)
//     if(!user){
//         return (
//             <div className="link-container">
//                 <h1>
//                     Welcome Visitor,kindly 
//                     <Link to ="/login">Login</Link> to use our services better
//                 </h1>
//             </div>
//         )
//     }

//     return(
//         <div>
//             <h1>Welcome <b>{user},</b>please go ahead to use our services</h1>
//         </div>
//     )
// }

import React, { useState } from 'react'
import "./Home.css"
import {useEffect} from 'react'
import axios from 'axios'


export const Home = () => {
    const [products,SetProduct] =useState ([])
    const [category,SetCategory] =useState("")
    const [err,setErr] =useState("")
    const [loading,setLoading] =useState(true)

    useEffect(()=>{
        
            const fetchProduct=async()=>{

                try {
            const url = `https://davidbackend-ts7d.onrender.com/api/products?category=${category}`
            
            // const response = await fetch("https://davidbackend-ts7d.onrender.com/api/products")
            // const data = await response.json()
            // console.log(data)
            //setProduct(data)

            const response = await axios.get(`https://davidbackend-ts7d.onrender.com/api/products?category=${category}`)
            console.log(response.data)
            SetProduct(response.data)
        } catch (error) {
        SetProduct([])
        setErr(error.response?.data?.message)
    } finally {
        setLoading(false)
    }
    }
        fetchProduct()
    },[category])
        
    return (
        <div>
            <section className='hero-container'>
                <div className='hero-content'>
                <h1>Welcome to our Ecommerce App</h1>
                <p>A place where you can get all affordable products</p>
                <button className='hero-button'>Explore</button>
                </div>
            </section>

            <section>
                <div className='categories'>
                <h1>Products Categories</h1>
            <div className='allcategories'>
                <p className='category-items' onClick={()=>
                    SetCategory("phones")
                }>Phones</p>
                <p className='category-items' onClick={()=>
                    SetCategory("electronics")}>
                        Electronics</p>
                <p className='category-items' onClick={()=>
                    SetCategory("furnitures")}>
                        Accessories</p>
                <p className='category-items'onClick={()=>
                    SetCategory("cloths")}>
                        Clothings</p>
                <p className='category-items'onClick={()=>
                    SetCategory("")}>
                        All Products</p>
                </div>
                </div>
                </section>

                <section>

                <h1>Browse through our available products</h1>
                    <div className='allproducts'>
                {products.map((items)=>
                
                <div className='products' key = {items._id}>
                    <img src={items.imageUrl}></img>
                    <h2>{items.name}</h2>
                    <p>{items.description}</p>
                    <h3>${items.price}</h3>
                    <h3>{items.stock} Pieces Available</h3>
                    <button className='btn'>Buy</button>
                </div>
                
                
                )}
                </div>

            </section>
            {products.length === 0 && <h1>{err}</h1>}
            {products.length < 1 && loading && <h1>Product Loading!!!</h1>}
        </div>
    )
}