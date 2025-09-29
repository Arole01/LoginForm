import React from 'react'

const RelatedProducts = ({related}) => {
    return (
    <div className="related-products">
        <h2>Related Products</h2>
        <div className="related-grid">
            {related.map((product) =>
            <div className="related-card" key={product._id}>
                <img src={product.imageUrl} alt=''></img>
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <h3>${product.price}</h3>
                    <h3>{product.stock} Pieces Available</h3>
                    <button className='btn'>Buy</button>
            </div>)}
        </div>
        
    </div>
    )
}

export default RelatedProducts
