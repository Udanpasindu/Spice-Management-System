import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router';
import '../UpdateUtility/upCss.css';

function UpdateUtility() {
  const [inputs, setUtilityInput] = useState({});
  const history = useNavigate();
  const id = useParams().id;

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:4000/utilitis/${id}`)
        .then((res) => res.data)
        .then((data) => setUtilityInput(data.utility));
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    await axios.put(`http://localhost:4000/utilitis/${id}`, {
      uDate: String(inputs.uDate),
      uWater: String(inputs.uWater),
      uElectricity: String(inputs.uElectricity),
      uMachanic_01_Name: String(inputs.uMachanic_01_Name),
      uMachanic_01_Amount: String(inputs.uMachanic_01_Amount),
      uMachanic_01_bankD: String(inputs.uMachanic_01_bankD),
      uMachanic_01_accNo: String(inputs.uMachanic_01_accNo),
    });
  };

  const handleChange = (e) => {
    setUtilityInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendRequest();
    history('/uDetails');
  };

  return (
    <div >
      <br></br> <br></br>
      <div>
        <div className='c' style={{marginLeft:'390px'}}>
          <form className='form' onSubmit={handleSubmit}>
            <h1 className='h1'>Update Utility</h1>
            <table style={{ width: '30%' }}>
              <tbody>
                <tr>
                  <td>DATE:</td>
                  <td>
                    <input
                      type='text'
                      onChange={handleChange}
                      name='uDate'
                      value={inputs.uDate}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Water Bill:</td>
                  <td>
                    <input
                      type='text'
                      onChange={handleChange}
                      name='uWater'
                      value={inputs.uWater}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Electricity Bill:</td>
                  <td>
                    <input
                      type='text'
                      onChange={handleChange}
                      name='uElectricity'
                      value={inputs.uElectricity}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Mechanic Name:</td>
                  <td>
                    <input
                      type='text'
                      onChange={handleChange}
                      name='uMachanic_01_Name'
                      value={inputs.uMachanic_01_Name}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Amount:</td>
                  <td>
                    <input
                      type='text'
                      onChange={handleChange}
                      name='uMachanic_01_Amount'
                      value={inputs.uMachanic_01_Amount}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Bank & Branch:</td>
                  <td>
                    <input
                      type='text'
                      onChange={handleChange}
                      name='uMachanic_01_bankD'
                      value={inputs.uMachanic_01_bankD}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Account No:</td>
                  <td>
                    <input
                      type='text'
                      onChange={handleChange}
                      name='uMachanic_01_accNo'
                      value={inputs.uMachanic_01_accNo}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
            <button style={{backgroundColor:'#F05D3C',fontSize:'18px',marginLeft:'150px',borderRadius:'5px'}} type='submit'>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateUtility;
