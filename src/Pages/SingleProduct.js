import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./SingleProducts.css"

export const SingleProduct = () => {
    const [product,setProduct] = useState([])
    const id = useParams()

    useEffect(()=>{
        const fetchProduct = async()=>{
            try {
                const response= await axios.get(`https://davidbackend-ts7d.onrender.com/api/products/${id.id}`)
                setProduct(response.data)
            } catch (error) {
                console.log("errorsssssss",error)
            }
        }
        fetchProduct()
    },[id])
return (
    <section>

                <h1>Browse through our available products</h1>
                    <div className='allproducts'>
                
                <div className='product-card' key = {product._id}>
                    <img src={product.imageUrl}></img>
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <h3>${product.price}</h3>
                    <h3>{product.stock} Pieces Available</h3>
                    <button className='btn'>Buy</button>
                </div>
                
                </div>

            </section>
            
)
}


