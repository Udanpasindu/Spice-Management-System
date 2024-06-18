import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router';

function UpdateMachine() {
  const [inputs, setMachineInput] = useState({});
  const history = useNavigate();
  const id = useParams().id;

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:4000/machins/${id}`)
        .then((res) => res.data)
        .then((data) => setMachineInput(data.machin)); //******//
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    await axios.put(`http://localhost:4000/machins/${id}`, {
      mType: String(inputs.mType),
      mRapiredDate: String(inputs.mRapiredDate),
      efficiency: String(inputs.efficiency),
    });
  };

  const handleChange = (e) => {
    setMachineInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendRequest();
    history("/mDetails");
  };

  return (
    <div>
      <br></br><br></br><br></br>
      <div style={{marginLeft:'450px'}}>
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto', border: '2px solid #007bff', borderRadius: '10px', padding: '20px' }}>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="mType">Machine Type:</label><br />
          <input
            type='text'
            name="mType"
            onChange={handleChange}
            required
            value={inputs.mType || ''}
            style={{ width: '100%', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="mRapiredDate">Machine Repaired Date:</label><br />
          <input
            type='date'
            name="mRapiredDate"
            onChange={handleChange}
            required
            value={inputs.mRapiredDate || ''}
            style={{ width: '100%', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="efficiency">Machine Efficiency:</label><br />
          <input
            type='text'
            name="efficiency"
            onChange={handleChange}
            required
            value={inputs.efficiency || ''}
            style={{ width: '100%', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>

        <button style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', borderRadius: '5px', border: 'none' }}>Submit</button>
      </form>
      </div>
    </div>
  );
}

export default UpdateMachine;
