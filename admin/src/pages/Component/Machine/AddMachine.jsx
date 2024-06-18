import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router';

function AddMachine(props) {
  const { _id, mType, mRapiredDate, efficiency } = props.machin;
  const history = useNavigate();

  const deleteHandler = async () => {
    await axios.delete(`http://localhost:4000/machins/${_id}`)
      .then(() => {
        window.location.reload();
      })
      .catch(error => {
        console.error('Error deleting item:', error);
      });
  };
  

  return (
    <div>
      <center>
        <table style={{ borderCollapse: 'collapse', width: '50%', border: '1px solid #ccc', borderRadius: '5px' }}>
          <tbody>
            <tr style={{backgroundColor:'#DBDEE5'}}>
              <td style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>Machine ID</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>{_id}</td>
            </tr>
            <tr>
              <td style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>Machine Type</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>{mType}</td>
            </tr>
            <tr style={{backgroundColor:'#DBDEE5'}}>
              <td style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>Repaired Date</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>{mRapiredDate}</td>
            </tr>
            <tr>
              <td style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>Machine Efficiency</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>{efficiency}</td>
            </tr>
            <tr>
              <td colSpan="2" style={{ textAlign: 'center', paddingTop: '20px' ,backgroundColor:'#DBDEE5'}}>
                <Link to={`/mDetails/${_id}`}>
                  <button style={{ backgroundColor: 'blue', color: 'white', padding: '8px 16px', borderRadius: '5px', marginRight: '10px' }}>Update</button>
                </Link>
                <button onClick={deleteHandler} style={{ backgroundColor: 'red', color: 'white', padding: '8px 16px', borderRadius: '5px' }}>Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
        <br /><br /><br />
      </center>
    </div>
  

    
  );
}

export default AddMachine;

//
