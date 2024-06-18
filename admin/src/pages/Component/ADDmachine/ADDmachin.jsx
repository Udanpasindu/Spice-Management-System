import React, { useState } from 'react';
import Nav from '../Nav/Nav';
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router v6
import axios from 'axios';

export default function ADDmachin() {
  const history = useNavigate();
  const [inputs, setMachineInput] = useState({
    mType: '',
    mRapiredDate: '',
    efficiency: '',
  });

  const handleChange = (e) => {
    setMachineInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const efficiency = parseFloat(inputs.efficiency); // Convert efficiency to a float value

  // Check if efficiency is a number and within the range of 0 to 100
  if (isNaN(efficiency) || efficiency < 0 || efficiency > 100) {
    alert('Efficiency must be a number between 0 and 100.');
    return;
  }


    console.log(inputs);
    sendRequest().then(() => history('/mDetails'));
  };

  const sendRequest = async () => {
    await axios
      .post('http://localhost:4000/machins', {
        mType: String(inputs.mType),
        mRapiredDate: String(inputs.mRapiredDate),
        efficiency: String(inputs.efficiency),
      })
      .then((res) => res.data);
  };

  return (
    <div>
      <Nav />
      <center>
        <h1>ADD MACHINE</h1>
        <br></br>
        <form
          onSubmit={handleSubmit}
          style={{
            maxWidth: '400px',
            margin: 'auto',
            border: '2px solid #007bff',
            borderRadius: '10px',
            padding: '20px',
          }}
        >
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="mType">Machine Type:</label>
            <br />

            <select
    name="mType"
    onChange={handleChange}
    required
    value={inputs.mType}
    style={{
        width: '100%',
        padding: '5px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    }}
>
    <option value="">Select Machine Type</option>
    <option value="Cleaning Machines">Cleaning Machines</option>
    <option value="Sorting Machines">Sorting Machines</option>
    <option value="Grinding Machines">Grinding Machines</option>
    <option value="Packaging Machines">Packaging Machines</option>
    <option value="Labeling Machines">Labeling Machines</option>
    <option value="Quality Control Machines">Quality Control Machines</option>
</select>

            
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="mRapiredDate">Date:</label>
            <br />
            <input
              type="date"
              name="mRapiredDate"
              onChange={handleChange}
              required
              value={inputs.mRapiredDate}
              style={{
                width: '100%',
                padding: '5px',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
              
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="efficiency">Machine Efficiency(%):</label>
            <br />
            <input
              type="text"
              name="efficiency"
              placeholder='input pracentage'
              onChange={handleChange}
              required
              value={inputs.efficiency}
              style={{
                width: '100%',
                padding: '5px',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
            />
          </div>

          <button
            style={{
              backgroundColor: '#007bff',
              color: '#fff',
              padding: '10px 20px',
              borderRadius: '5px',
              border: 'none',
            }}
          >
            Submit
          </button>
        </form>
      </center>
    </div>
  );
}
