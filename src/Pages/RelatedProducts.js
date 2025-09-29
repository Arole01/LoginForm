import React from 'react'

const RelatedProducts = ({related}) => {
    return (
    <div className="related-products">
        <h2>Related Products</h2>
        <div className="related-grid">
            {related.map((item) =>
            <div className="related-card" key={item._id}>
                <img src={item.imageUrl}></img>
                    <h2>{item.name}</h2>
                    <p>{item.description}</p>
                    <h3>${item.price}</h3>
                    <h3>{item.stock} Pieces Available</h3>
                    <button className='btn'>Buy</button>
            </div>)}
        </div>
        
    </div>
    )
}

export default RelatedProducts
