import React from 'react'
import './ProductDisplay.css'
import star_icon from '../../assets/frontend_assets/star_icon.png'
import star_dull_icon from '../../assets/frontend_assets/star_dull_icon.png'


const ProductDisplay = (props) => {
    const {product}=props;
  return (
    <div className='productdisplay'>
      <div className="productdisplay-left">
        <div className="productdisplay-img">
            <img className='productdisplay-main-img' src={`http://localhost:4000/images/${product.image}`}  alt="" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-star">
             <img src={star_icon} alt="" />
             <img src={star_icon} alt="" />
             <img src={star_icon} alt="" />
             <img src={star_icon} alt="" />
             <img src={star_dull_icon} alt="" />
             <p>(122)</p>
        </div>
        <div className="productdisplay-right-description">
            <div className="productdisplay-right-description"><span>Description:</span><br />{product.description}</div>
            <div className="productdisplay-right-ingredients"><span>Category:</span><br />{product.category}</div>
            <div className="productdisplay-right-quantity"><span>Available pack size:</span><br /></div>{product.quantity}</div>
            <div className="productdisplay-right-medicalvalues"><span>Price(Rs):</span><br /> {product.price}/=</div>
           
        
        </div>
      </div>
    
  )
}

export default ProductDisplay
