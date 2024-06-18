import React, { useState, useEffect } from "react";
import axios from 'axios'; 
import { Link } from "react-router-dom"; 
import '../employeeManagement/emp.css'

function Users() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get('http://localhost:4000/User/users')  
      .then(response => {
        setUsers(response.data);
        setFilteredUsers(response.data); 
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);
  
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Make sure the update employee termination table before delete, do you want to delete?");
    if (confirmDelete) {
        axios.delete(`http://localhost:4000/User/deleteUser/${id}`)
            .then(res => {
                console.log(res);
                setUsers(users.filter(user => user._id !== id));
                setFilteredUsers(filteredUsers.filter(user => user._id !== id)); 
            })
            .catch(err => console.log(err))
    }
  }

  const handleSearch = () => {
    const newFilteredUsers = users.filter(user => {
      return (
        user._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.age.toString().includes(searchTerm.toLowerCase()) ||
        user.jobroll.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.bank.toString().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredUsers(newFilteredUsers);
  }

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === "") {
      setFilteredUsers(users); 
    } else {
      handleSearch(); 
    }
  }

  return (
    <div className="employee-summary-container">
      <div className="employee-summary-content">
        <h1 className="employee-summary-heading">Employee Summary</h1>
        <Link to="/empcreate" className='btn btn-success'>Add Employee</Link>
        <Link to="/salaryy" className='btn btn-warning'>Salary Page</Link>
        <div className="search-container">
          <input
            type="text"
            value={searchTerm}
            onChange={handleChange}
            placeholder="Search by Name, Email, Age, Job Role"
            className="search-input"
          />
          <button
            onClick={handleSearch}
            className='search-btn'
          >
            Search
          </button>
        </div>

        <div className="user-card-container">
          {filteredUsers.map((user, index) => (
            <div key={index} className="user-card">
              <h3>{user.name}</h3>
              <p>Password: {user.password}</p>
              <p>EmpID: {user._id}</p>
              <p>Email: {user.email}</p>
              <p>Age: {user.age}</p>
              <p>Job Role: {user.jobroll}</p>
              <p>Bank: {user.bank}</p>
              <p>Account Number: {user.accountNumber}</p>
              <div className="user-actions">
                <Link to={`/empupdate/${user._id}`} className='btn btn-success'>Update</Link>
                <button onClick={() => handleDelete(user._id)} className='btn btn-danger'>Delete</button>
              </div>
            </div>
          ))}
        </div>
        
        
      </div>
    </div>
  );
}

export default Users;
