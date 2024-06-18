import React, { useEffect, useState } from 'react';
import './PlaceOrder.css';
import axios from 'axios';
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';


const PlaceOrder = ({ setShowLogin }) => {

  const{getTotalCartAmount, token, food_list, cartItems,promotion, url} = useContext(StoreContext);

  const[data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data =>({...data,[name]:value}))
  }

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item)=>{
      if (cartItems[item._id] > 0 ) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    console.log(orderItems);//testing
    let orderData={
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+200-promotion(),
      promotion: promotion()
    }

    let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}});

    if (response.data.success) {
      const {session_url}= response.data;
      window.location.replace(session_url);
    }
    else{
      alert("Error");
    }
  }

  const navigate = useNavigate();

  useEffect(()=>{
    if(!token) {
      setShowLogin(true);
      navigate('/cart')
    }
    else if(getTotalCartAmount() === 0)
    {
      navigate('/cart')
    }
  },[token])

  useEffect(() => {
    console.log(data); // testing entered data in console
  },[data])

  return (
      <form onSubmit={placeOrder} className='place-order'>


      <div className="place-order-left">
        <p className='title'>Delivery Information</p>

        <div className="multi-fields">
          <input type="text" name='firstName' onChange={onChangeHandler} value={data.firstName} placeholder='First Name' required/>
          <input type="text" name='lastName' onChange={onChangeHandler} value={data.lastName} placeholder='Last Name' required/>
        </div>
        <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Email Name' required/>
        <input type="text" name='street' onChange={onChangeHandler} value={data.street} placeholder='Street' required/>
        <div className="multi-fields">
          <input type="text" name='city' onChange={onChangeHandler} value={data.city} placeholder='City' required/>
          <input type="text" name='state' onChange={onChangeHandler} value={data.state} placeholder='State' required/>
        </div>
        <div className="multi-fields">
          <input type="text" name='zipcode' onChange={onChangeHandler} value={data.zipcode} placeholder='Zip code' required/>
          <input type="text" name='country' onChange={onChangeHandler} value={data.country} placeholder='Country' required/>
        </div>
        <input type="text" name='phone' onChange={onChangeHandler} value={data.phone} pattern="[0-9]{10}" placeholder='Phone' required/>
      </div>


      <div className="place-order-right">

      <div className="cart-total">
        <h2>Cart Totals</h2>
        <div>

        <div className="cart-total-details">
              <p>Subtotal</p>
              <p>LKR {getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>LKR {getTotalCartAmount()===0?0:200}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Discount</p>
              <p>LKR {promotion()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>LKR {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 200-promotion()}</b>
            </div>
        </div>

        <button type='submit'>PROCEED TO PAYMENT</button>

      </div>
      </div>
      </form>
  )
}

export default PlaceOrder
