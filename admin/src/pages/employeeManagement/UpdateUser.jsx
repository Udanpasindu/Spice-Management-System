import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import '../employeeManagement/emp.css'

function UpdateUser() {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfPassword] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [jobRoll, setJobRoll] = useState("");
    const [bank, setBank] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const jobRollOptions = [
        "Production Manager",
        "Quality Control Inspector",
        "Packaging Supervisor",
        "Supply Chain Manager",
        "Marketing Manager",
        "Quality Assurance Manager",
        "Human Resources Manager",
        "Driver",
        "Clark",
        "Assistant"
    ];

    const bankOptions = [
        "Bank of Ceylon",
        "People's Bank",
        "Commercial Bank of Ceylon",
        "Hatton National Bank",
        "Sampath Bank",
        "Nations Trust Bank",
        "DFCC Bank",
        "Seylan Bank"
    ];

    useEffect(() => {
        axios.get(`http://localhost:4000/User/getEmpuser/${id}`)
            .then(result => {
                console.log(result);
                setName(result.data.name);
                setEmail(result.data.email);
                setAge(result.data.age);
                setJobRoll(result.data.jobroll);
                setBank(result.data.bank);
                setAccountNumber(result.data.accountNumber);
                setPassword(result.data.password);
                setConfPassword(result.data.confirmpassword);
            })
            .catch(error => {
                console.error('Error fetching user:', error);
            });
    }, [id]);

    const update = (e) => {
        e.preventDefault();

        if (password !== confirmpassword) {
            setError("Passwords do not match");
            return;
        }

        axios.put(`http://localhost:4000/User/updateUser/${id}`, { name, email, password, confirmpassword, age, jobroll: jobRoll, bank, accountNumber })
            .then(result => {
                console.log(result);
                navigate('/employeeManagement');
            })
            .catch(err => {
                console.log(err);
                setError("Failed to update user");
            });
    };

    return (
        <div className='update-user-container'>
          <div className='update-user-content'>
            <form onSubmit={update} className="form-container">
              <h2 className="form-title">Update User</h2>
              {error && <p className="text-danger">{error}</p>}
              <div className='form-group'>
                <label htmlFor='name'>Name</label>
                <input id='name' type='text' placeholder='Enter Name' className='form-control'
                  value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <input id='password' type='password' placeholder='Enter password' className='form-control'
                  value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className='form-group'>
                <label htmlFor='confirmpassword'>Confirm Password</label>
                <input id='confirmpassword' type='password' placeholder='Enter password' className='form-control'
                  value={confirmpassword} onChange={(e) => setConfPassword(e.target.value)} />
              </div>
              <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <input id='email' type='email' placeholder='Enter Email' className='form-control'
                  value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className='form-group'>
                <label htmlFor='age'>Age</label>
                <input id='age' type="text" placeholder="Enter Age" className="form-control"
                  value={age} onChange={(e) => setAge(e.target.value)} />
              </div>
              <div className='form-group'>
                <label htmlFor='jobroll'>Job Roll</label>
                <select id='jobroll' className="form-control" value={jobRoll} onChange={(e) => setJobRoll(e.target.value)}>
                    <option value="">Select Job Roll</option>
                    {jobRollOptions.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                    ))}
                </select>
              </div>
              <div className='form-group'>
                <label htmlFor='bank'>Bank</label>
                <select id='bank' className="form-control" value={bank} onChange={(e) => setBank(e.target.value)}>
                    <option value="">Select Bank</option>
                    {bankOptions.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                    ))}
                </select>
              </div>
              <div className='form-group'>
                <label htmlFor='accountNumber'>Account Number</label>
                <input id='accountNumber' type="text" placeholder="Enter Account Number" className="form-control"
                  value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
              </div>
              <button className="submit-btn">Update</button>
            </form>
          </div>
        </div>
      );
      
}

export default UpdateUser;
