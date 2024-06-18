import React from 'react'
import './Add.css'
import upload_area from '../../assets/upload_area.svg'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import spice from '../../assets/spices.png'
import quantity from '../../assets/delivery.png'
import description from '../../assets/description.png'
import category from '../../assets/categories.png'
import pricetag from '../../assets/pricetag.png'
import { useRef } from 'react'

const Add = ({url}) => {

  const [image, setImage] = useState(false);
  const [data, setData]= useState({
    name: "",
    description: "",
    quantity:"",
    price: "",
    category : "Powder"
  })

  const fileInputRef = useRef(null);

  const onChangeHandler = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const onSubmitHandler = async (event) =>{
    event.preventDefault();
    const formData = new FormData();
    formData.append( "name", data.name)
    formData.append( "description", data.description)
    formData.append( "quantity", data.quantity)
    formData.append( "price", Number(data.price))
    formData.append( "category", data.category)
    formData.append( "image", image)
    const response = await axios.post(`${url}/api/food/add`,formData);
    if(response.data.success){
      setData({
        name: "",
        description: "",
        quantity:"",
        price: "",
        category : "Powder"
      })
      setImage(false)
      toast.success(response.data.message)
    }else{
      toast.error(response.data.message)
    } 
  }

  useEffect(()=>{
    console.log(data); //checking data in console
  },[data])

  ////
  const handleUploadAreaClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className='add-product'>
      <h1>Add Product</h1>
      <br />
      <form  onSubmit={onSubmitHandler}> 
          <div className="addproduct-itemfield">
          <label>Product Name:</label>
            <img src={spice} alt="" className='name' /> 
          <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here'required/>
          </div>

          <div className="addproduct-itemfield">
          <label htmlFor="quantity">Product Quantity:</label>
          <img src={quantity} alt="" className='quant'/>
          <input onChange={onChangeHandler} value={data.quantity} type="text" name='quantity' placeholder='Type here'required/>
          </div>

          <div className="addproduct-itemfield">
          <label htmlFor="description">Product Description:</label>
          <img src={description} alt="" className='descri'/>
          <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here' required></textarea>
          </div>
          
            <div className="addproduct-itemfield">
            <label>Product category:</label> 
            <img src={category} alt="" className='cat' />
            <select onChange={onChangeHandler} name="category">
                <option value="Powder">Powder</option>
                <option value="Pieces">Pieces</option>
                <option value="Flour">Flour</option>
                <option value="Oil">Oil</option>
                <option value="Seeds">Seeds</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="addproduct-itemfield">
            <label>Product Price:</label>
            <img src={pricetag} alt=""  className='pricetag'/>
              <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='LKR'/>
            </div>
          
          <div className="addproduct-itemfieldd" onClick={handleUploadAreaClick}>
            <label htmlFor="image">Product Image:</label>
            <br />
              <img className='uploaded-image'src={image?URL.createObjectURL(image):upload_area} alt="" />
          
            <input ref={fileInputRef} onChange={(e)=>setImage(e.target. files[0])}type="file" id='image' hidden required/>
          </div>
          
          <div className="addproduct-btn">
          <button type='submit'>ADD</button>
          </div>
      </form>
    </div>
    
  )
}

export default Add



