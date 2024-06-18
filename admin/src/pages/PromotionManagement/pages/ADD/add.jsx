import React from 'react'
import './Add.css'
import { Link } from 'react-router-dom';
import { assets } from '../../../../assets/assets'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const add = ({ url }) => {

  const [promoimage, setImage] = useState(false);
  const [itemSuggestions, setItemSuggestions] = useState([]);
  const [data, setData] = useState({
    name: "",
    itemName: "",
    description: "",
    discount: "",
    validDate: "",
    quantity: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData(prevData => ({ ...prevData, [name]: value }));
    if (name === 'itemName') {
      fetchItemSuggestions(value);
    }
  }

  const fetchItemSuggestions = async (itemName) => {
    try {
      if (!itemName.trim()) {
        // If input field is empty, hide the item list
        setItemSuggestions([]);
        return;
      }
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        const filteredItems = response.data.data.filter(item => {
          // Assuming item has a property `name` that holds the name of the item
          return item.name.toLowerCase().includes(itemName.toLowerCase());
        });
        setItemSuggestions(filteredItems);
      } else {
        setItemSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching item suggestions", error);
      setItemSuggestions([]);
    }
  };

  const selectItem = (itemName) => {
    setData(prevData => ({ ...prevData, itemName }));
    setItemSuggestions([]);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name)
    formData.append("itemName", data.itemName)
    formData.append("description", data.description)
    formData.append("discount", Number(data.discount))
    formData.append("validDate", data.validDate)
    formData.append("quantity", data.quantity)
    formData.append("promoimage", promoimage)
    const response = await axios.post(`${url}/api/promotion/addpromotion`, formData);
    if (response.data.success) {
      setData({
        name: "",
        itemName: "",
        description: "",
        discount: "",
        validDate: "",
        quantity: ""
      })
      setImage(false)
      toast.success(response.data.message)
    } else {
      toast.error(response.data.message)
    }
  }

  useEffect(() => {
    console.log(data); //checking data in console
  }, [data])

  return (
    <div className='promotion-add'>
      <h1>Promotion Add</h1>
      <div className='promotion-request-head-line'>
        <Link to='/PromotionList'>
          <button className='promoaddbutton1'>Promotion List</button>
        </Link>
      </div>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="promotion-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="promoimage">
            <img src={promoimage ? URL.createObjectURL(promoimage) : assets.upload_area} alt="" />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id='promoimage' hidden required />
        </div>
        <div className="add-promotion-name flex-col">
          <p>Promotion name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' />
        </div>
        <div className="add-promotion-description flex-col">
          <p>Promotion description</p>
          <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here' required></textarea>
        </div>
        <div className="add-product-name flex-col">
          <p>Item name</p>
          <input onChange={onChangeHandler} value={data.itemName} type="text" name='itemName' placeholder='Type here' />
          <div className="suggestions">
            {itemSuggestions.length > 0 && (
              <ul className="item-suggestions_promo">
                {itemSuggestions.map((item, index) => (
                  <li key={index} onClick={() => selectItem(item.name)}>
                    {item.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="add-categoryp">
          <div className="add-valid-date flex-col">
            <p>Product valid date</p>
            <input onChange={onChangeHandler} value={data.validDate} type="date" name='validDate' placeholder='Type here' />
          </div>
          <div className="add-discount flex-col">
            <p>Discount</p>
            <input onChange={onChangeHandler} value={data.discount} type="Number" name='discount' placeholder='%' />
          </div>
          <div className="add-product-terms flex-col">
            <p>Quantity</p>
            <input onChange={onChangeHandler} value={data.quantity} type="Number" name="quantity" placeholder='Write content here' required />
          </div>
        </div>
        <button type='submit' className='add-btnp'>ADD</button>
      </form>
    </div>
  )
}

export default add