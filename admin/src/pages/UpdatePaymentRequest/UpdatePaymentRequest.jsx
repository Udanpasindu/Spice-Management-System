import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import './UpdatePaymentRequest.css'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function UpdatePaymentRequest()  {

  const navigate = useNavigate();
  
  const {id} = useParams();
  const [section, setSection] = useState("");
  const [role, setRole] = useState("");
  const [description, setDescription] = useState(""); 
  const [amount, setAmount] = useState(""); 
  const [status, setStatus] = useState("");

  useEffect(() => {
     axios.get(`http://localhost:4000/api/paymentRequest/list/${id}`)
    .then(result =>{
      console.log('Fetched data:', result.data);
      console.log('Fetched data:', result.data);
      const requestData = result.data.paymentRequest;
      setSection(requestData.section);
      setRole(requestData.role);
      setDescription(requestData.description);
      setAmount(requestData.amount);
      setStatus(requestData.status);
    })
    .catch(error =>{
      console.error("error fetching Payment requests :",error);
    });
  }, [id]);


  const UpdateSalary =(e)=>{
    e.preventDefault();
    axios.put(`http://localhost:4000/api/paymentRequest/list/${id}`,{section, role, description, amount, status})
    .then(result => {
      console.log(result);
      toast.success(`Request Updated succedssfully`)
      navigate('/paymentRequests');
    })
    .catch(err => console.log(err));
  };
 
  return (
    <div className='ppayment-request-container'>
      <h1>Update Payment Request Form</h1>
      <form onSubmit={UpdateSalary} autoComplete="off" >
      <div className='pform-input'>
          <label >Request ID:</label>
          <input type="text"  name="id"  value={id} disabled/>
        </div>
        <div className='pform-input'>
          <label >Section:</label>
          <select id="section" name="section" value={section} onChange={(e) => setSection(e.target.value)} required>
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
          <select id="role" name="role" value={role} onChange={(e) => setRole(e.target.value)} required>
              <option value="Manager">Manager</option>
          </select>
        </div>
        <div className='pform-input'>
          <label >Description:</label>
          <textarea id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
        </div>
        <div className='pform-input'>
          <label >Amount:</label>
          <input type="number" id="amount" name="amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        </div>
        <div className='pform-input'>
          <label >Status:</label>
          <select id="status" name="status" value={status} onChange={(e) => setStatus(e.target.value)} required>
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
          </select>
        </div>
        <button  type="submit">Update</button>
      </form>
    </div>
  )
}

export default UpdatePaymentRequest