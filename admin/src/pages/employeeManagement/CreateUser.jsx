import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import '../employeeManagement/emp.css'

function CreateUser() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfPassword] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [jobroll, setJobRoll] = useState("");
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

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmpassword) {
            setError("Passwords do not match");
            return;
        }

        axios.post("http://localhost:4000/User/createUser", {
            name,
            password,
            confirmpassword,
            email,
            age,
            jobroll,
            bank,
            accountNumber
        })
        .then(result => {
            console.log(result);
            navigate('/employeeManagement');
        })
        .catch(err => {
            console.log(err);
            setError("Failed to create user");
        });
    }

    return (
        <div className='add-user-container'>
            <div className='add-user-content'>
                <form onSubmit={handleSubmit} className="form-container">
                    <h2 className="form-title">Add User</h2>
                    {error && <p className="text-danger">{error}</p>}
                    <div className='form-group mb-2'>
                        <label htmlFor='name'>Name</label>
                        <input id='name' type='text' placeholder='Enter Name' className='form-control'
                            onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className='form-group mb-2'>
                        <label htmlFor='password'>Password</label>
                        <input id='password' type='password' placeholder='Enter password' className='form-control'
                            onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className='form-group mb-2'>
                        <label htmlFor='confirmpassword'>Confirm Password</label>
                        <input id='confirmpassword' type='password' placeholder='Enter password' className='form-control'
                            onChange={(e) => setConfPassword(e.target.value)} required />
                    </div>
                    <div className='form-group mb-2'>
                        <label htmlFor='email'>Email</label>
                        <input id='email' type='email' placeholder='Enter Email' className='form-control'
                            onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className='form-group mb-2'>
                        <label htmlFor='age'>Age</label>
                        <input id='age' type="text" placeholder="Enter Age" className="form-control"
                            onChange={(e) => setAge(e.target.value)} required  />
                    </div>
                    <div className='form-group mb-2'>
                        <label htmlFor='jobroll'>Job Roll</label>
                        <select id='jobroll' className="form-control" onChange={(e) => setJobRoll(e.target.value)} required>
                            <option value="">Select Job Roll</option>
                            {jobRollOptions.map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                    <div className='form-group mb-2'>
                        <label htmlFor='bank'>Bank</label>
                        <select id='bank' className="form-control" onChange={(e) => setBank(e.target.value)} required>
                            <option value="">Select Bank</option>
                            {bankOptions.map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                    <div className='form-group mb-2'>
                        <label htmlFor='accountNumber'>Account Number</label>
                        <input id='accountNumber' type="text" placeholder="Enter Account Number" className="form-control"
                            onChange={(e) => setAccountNumber(e.target.value)} required />
                    </div>
                    <button className="submit-btn">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default CreateUser;
