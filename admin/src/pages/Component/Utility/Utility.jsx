import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Utility/uD.css';

function Utility(props) {
  const {
    _id,
    uDate,
    uWater,
    uElectricity,
    uMachanic_01_Name,
    uMachanic_01_Amount,
    uMachanic_01_bankD,
    uMachanic_01_accNo,
  } = props.utility;

  const history = useNavigate();

  const deleteHandler = async () => {
    await axios.delete(`http://localhost:4000/utilitis/${_id}`)
      .then(() => {
        window.location.reload(); // Refresh the page after deletion
      })
      .catch(error => {
        console.error('Error deleting item:', error);
      });
  };
  

  return (
    <div>
      <div>
        <center>
          <table style={{ borderCollapse: 'collapse', width: '50%', border: '1px solid #ccc', borderRadius: '5px' }}>
            <tbody>
              <tr style={{ backgroundColor: '#f0f0f0' }}>
                <td style={{ padding: '5px 10px', backgroundColor: '#BFEBF0' }}>DATE:</td>
                <td style={{ padding: '5px 10px', backgroundColor: '#BFEBF0' }}>{uDate}</td>
              </tr>
              <tr style={{ backgroundColor: '#ffffff' }}>
                <td style={{ padding: '5px 10px' }}>Water Bill:</td>
                <td style={{ padding: '5px 10px' }}>{uWater}</td>
              </tr>
              <tr style={{ backgroundColor: '#f0f0f0' }}>
                <td style={{ padding: '5px 10px', backgroundColor: '#BFEBF0' }}>Electricity Bill:</td>
                <td style={{ padding: '5px 10px', backgroundColor: '#BFEBF0' }}>{uElectricity}</td>
              </tr>
              <tr style={{ backgroundColor: '#ffffff' }}>
                <td style={{ padding: '5px 10px', backgroundColor: '#f0f0f0' }}>MechanicName:</td>
                <td style={{ padding: '5px 10px' }}>{uMachanic_01_Name}</td>
              </tr>
              <tr style={{ backgroundColor: '#f0f0f0' }}>
                <td style={{ padding: '5px 10px', backgroundColor: '#BFEBF0' }}>Mechanic Amount:</td>
                <td style={{ padding: '5px 10px', backgroundColor: '#BFEBF0' }}>{uMachanic_01_Amount}</td>
              </tr>
              <tr style={{ backgroundColor: '#ffffff' }}>
                <td style={{ padding: '5px 10px' }}> Bank & Branch:</td>
                <td style={{ padding: '5px 10px' }}>{uMachanic_01_bankD}</td>
              </tr>
              <tr style={{ backgroundColor: '#f0f0f0' }}>
                <td style={{ padding: '5px 10px', backgroundColor: '#BFEBF0' }}>Mechanic AccNo:</td>
                <td style={{ padding: '5px 10px', backgroundColor: '#BFEBF0' }}>{uMachanic_01_accNo}</td>
              </tr>
            </tbody>
          </table>
          <div>
            <Link to={`/uDetails/${_id}`}>
              <button style={{ marginRight: '10px', padding: '5px 10px', backgroundColor: 'blue', color: 'white', border: 'none' }}>Update</button>
            </Link>
            <button onClick={deleteHandler} style={{ padding: '5px 10px', backgroundColor: 'red', color: 'white', border: 'none' }}>Delete</button>
          </div>
        </center>
      </div>
    </div>
  );
}

export default Utility;
