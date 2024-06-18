import React, { useState } from 'react'
import './AddPaymentRequest.css'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';


const AddPaymentRequest = () => {

  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    section: "",
    role: "",
    description: "",
    amount: "",
    status: "",
  });

  const handleChange =(e) =>{
    setInputs((prevState)=>({
        ...prevState,
        [e.target.name]: e.target.value,
        status:"Pending",
        role:"Manager"
    }))
  };

  const handleSubmit =(e)=>{
    e.preventDefault();
    console.log(inputs);
    sendRequeset().then(()=>navigate('/paymentRequests'))
  }

  const sendRequeset = async()=>{
    await axios.post("http://localhost:4000/api/paymentRequest/add",{
      section: String (inputs.section),
      role: String (inputs.role),
      description: String (inputs.description),
        amount: Number (inputs.amount),
        status: String (inputs.status),
    })
    .then(()=>{
      toast.success(`Request added succedssfully`)
    })
    .catch(error => console.log(error))
  }
  
  return (
    <div className='ppayment-request-container'>
      <h1>Payment Request Form</h1>
      <form onSubmit={handleSubmit} autoComplete="off">
      <div className='pform-input'>
          
          <select id="section" name="section" onChange={handleChange} required>
              <option value="">Select your Section</option>
              <option value="Supply">Supply</option>
              <option value="Factory">Factory</option>
              <option value="Employee">Employee</option>
              <option value="Payment">Payment</option>
              <option value="Promotion & Marcketing">Promotion & Marcketing</option>
          </select>
        </div>
        <div className='pform-input'>
          <label>Your Role:</label>
          <select id="role" name="role" onChange={handleChange} required>
              <option value="Manager">Manager</option>
          </select>
        </div>
        <div className='pform-input'>
          <label >Description:</label>
          <textarea id="description" name="description" onChange={handleChange} required></textarea>
        </div>
        <div className='pform-input'>
          <label >Amount:</label>
          <input type="number" id="amount" name="amount" onChange={handleChange} required />
        </div>
        <div className='pform-input'>
          <label >Status:</label>
          <select id="status" name="status" onChange={handleChange} required>
              <option value="Pending">Pending</option>
          </select>
        </div>
        <button  type="submit">Add</button>
      </form>
    </div>
  )
}

export default AddPaymentRequest
