import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import "./SingleProducts.css"


export const SingleProduct = () => {
    const [product,setProduct] = useState({})
    const [related,setRelated] = useState([])
    const [getCategory, setGetCategory] = useState(true)
    const [loading, setLoading] = useState(true)
    const id = useParams()


    useEffect(()=>{
        const fetchProduct = async()=>{
            try {
                const response= await axios.get(`https://davidbackend-ts7d.onrender.com/api/products/${id.id}`)

                setProduct(response.data)

                if (!response.data.category || !response.data.category.name){
                    setGetCategory(false)
                    setRelated([])
                    return
                }

                setGetCategory(true)

        const categoryResponse = await axios.get(
            `https://davidbackend-ts7d.onrender.com/api/products?category=${response.data.category.name}`
        )

        const filter = categoryResponse.data.filter((allItems)=>allItems._id != response.data._id)
        console.log(categoryResponse)
        
        setRelated(filter);
        
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
                
                <h1>Related products</h1>
                <div className='related-products'>
                {!getCategory ? (
                    <p className="no-related">No related products</p>
                ) : related.length > 0 ? (
                related.map((items)=> (
                <div>
                    <Link to={`/${items._id}`}><img src={items.imageUrl} alt=''></img></Link>
                    <h2>{items.name}</h2>
                    <p>{items.description}</p>
                    <h3>${items.price}</h3>
                    <h3>{items.stock} Pieces Available</h3>
                    <button className='btnn'>Buy</button>
                    <br/><br/>
                </div>
                ))
            ):(
                <p className="no-related">No related products in this category</p>
                )}
                </div>
                
                
            </section>


            
)
}


