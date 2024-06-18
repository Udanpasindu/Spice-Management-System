import React, { useState } from 'react';
import Nav from '../Nav/Nav';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import '../AddMachanic/addMachanic.css';

export default function AddMachanic() {
  const history = useNavigate();
  const [inputs, setMachanicInput] = useState({
    name: '',
    age: '',
    phone: '',
    address: '',
  });

  const handleChange = (e) => {
    setMachanicInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Validate phone number length
    if (inputs.phone.length !== 10) {
      alert('Phone number must be 10 digits long.');
      return; 
    }
    
    console.log(inputs);
    sendRequest().then(() => history('/machineDetails'));
  };
  
  

  const sendRequest = async () => {
    await axios
      .post('http://localhost:4000/machanics', {
        name: String(inputs.name),
        age: String(inputs.age),
        phone: String(inputs.phone),
        address: String(inputs.address),
      })
      .then((res) => res.data);
  };

  return (
    <div>
      <Nav />
      <center>
        <br />
        <h1>ADD MACHANIC</h1>
        <br />
      </center>

      <div className='fd'>
      <form onSubmit={handleSubmit} className="form-container">
  <div style={{ marginBottom: '15px' }}>
    <label className="form-label">Name:</label>
    <input
    placeholder='Enter Name ...'
      type="text"
      name="name"
      onChange={handleChange}
      value={inputs.name}
      className="form-input"
      required
    />
  </div>
  <div style={{ marginBottom: '15px' }}>
    <label className="form-label">Age:</label>
    <input
     placeholder='Enter Age ...'
      type="text"
      name="age"
      onChange={handleChange}
      value={inputs.age}
      className="form-input"
      required
    />
  </div>
  <div style={{ marginBottom: '15px' }}>
    <label className="form-label">Phone:</label>
    <input
     placeholder='EnterPhone Number ...'
      type="text"
      name="phone"
      onChange={handleChange}
      value={inputs.phone}
      className="form-input"
      required
    />
  </div>
  <div style={{ marginBottom: '15px' }}>
    <label className="form-label">Address:</label>
    <input
     placeholder='Enter Address ...'
      type="text"
      name="address"
      onChange={handleChange}
      value={inputs.address}
      className="form-input"
      required
    />
  </div>
  <button className="form-button">
    Submit
  </button>
</form>

      </div>
    </div>
  );
}
//