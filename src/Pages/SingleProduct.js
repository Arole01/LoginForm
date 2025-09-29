import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./SingleProducts.css"
import RelatedProducts from './RelatedProducts'

export const SingleProduct = () => {
    const [product,setProduct] = useState({})
    const [related,setRelated] = useState([])
    const {id} = useParams()


    useEffect(()=>{
        const fetchProduct = async()=>{
            try {
                const response= await axios.get(`https://davidbackend-ts7d.onrender.com/api/products/${id}`)

                setProduct(response.data)

        const relatedResponse = await axios.get(
            `https://davidbackend-ts7d.onrender.com/api/products`
        )
        const filtered = relatedResponse.data.filter(
            (p) => p.category === response.data.category && p._id !== response.data._id
        )
        setRelated(filtered);
        console.log("Related products:", filtered)
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
                    <img src={product.imageUrl} alt=''/>
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <h3>${product.price}</h3>
                    <h3>{product.stock} Pieces Available</h3>
                    <button className='btn'>Buy</button>
                </div>
                
                </div>
                {related.length > 0 ? (
                        <RelatedProducts related={related}/>
                ) : (
                    <p>No related products found.</p>
                )}
                
                
            </section>


            
)
}


