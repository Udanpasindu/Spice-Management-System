import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../../context/AdminContext.jsx';
import '../../pages/AdminLoging/adminADD.css';
import { assets } from '../../assets/assets.js';

const AddAdminForm = () => {
  const { token, role, setToken } = useContext(AdminContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newRole, setNewRole] = useState('');
  const [admins, setAdmins] = useState([]);
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = () => {
    axios.get('http://localhost:4000/api/admin/details')
      .then(response => {
        console.log(response.data);
        setAdmins(response.data);
      })
      .catch(error => console.error('Error fetching admin Details:', error));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/admin/adding', { username, password, role: newRole });
      if (response.data.success) {
        alert('Admin added successfully');
        navigate('/');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error adding admin:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this admin?")) {
      try {
        const response = await axios.delete(`http://localhost:4000/api/admin/delete/${id}`);
        if (response.data.success) {
          alert('Admin deleted successfully');
          fetchAdmins(); 
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.error('Error deleting admin:', error);
        alert('Failed to delete admin.');
      }
    } else {
      console.log("Deletion cancelled by user.");
    }
  };
  

  return (
    <div>
      <div className='wwwww'>
        <div className="header-ad">
        <h2 className='ad-heading'>Managers</h2>       
        {role && <button className='ad-button' onClick={() => setShowForm(true)}>Add Manager +</button>}
         
        </div>
        <hr/>
        <div className="admins">
          <table className='admin-table'>
            <tbody className='ad-tbody'>
              {admins.map(admin => (
                <tr className='ad-tr' key={admin._id}>
                  <td className='ad-td'>{admin.username}</td>
                  <td className='ad-td'>{admin.role}</td>
                  {role && <td><a onClick={() => handleDelete(admin._id)}><img src={assets.admin_delete} alt="" width={30} /></a>
                  </td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

     

     {showForm && (
        <div className="modal">
          <div className="modal-content">
            <h1>Add Manager</h1>
            <span className="close" onClick={() => setShowForm(false)}>&times;</span>
            <form className='ad-form' onSubmit={handleSubmit}>


              <input className='ad-input' type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' required /><br />


              <input className='ad-input' type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' required /><br />

              <select className='ad-select' value={newRole} onChange={(e) => setNewRole(e.target.value)} required>
                <option value="">Select Role</option>
                <option value="payment manager">Payment Manager</option>
                <option value="promotion manager">Promotion Manager</option>
                <option value="supplier manager">Supplier Manager</option>
                <option value="employee manager">Employee Manager</option>
                <option value="customer manager">Customer Manager</option>
                <option value="factory manager">Factory Manager</option>
                <option value="order manager">Order Manager</option>
                <option value="product manager">Product Manager</option>
                <option value="Admin">Admin</option>
              </select>
              <br />
              <button className='ad-add-but' type="submit">Add Manager</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddAdminForm;
