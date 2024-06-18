import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function CreateSalary() {
    const [empID, setEmpID] = useState("");
    const [month, setMonth] = useState("");
    const [basicSalary, setBasicSalary] = useState("");
    const [totalOTHours, setTotalOTHours] = useState("");
    const [otRate, setOtRate] = useState("");
    const [bonus, setBonus] = useState("");
    const [totalSalary, setTotalSalary] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [bank, setBank] = useState("");
    const [empName, setEmpName] = useState("");
    const [empUsers, setEmpUsers] = useState([]); //  store the list of employee users
    const navigate = useNavigate();

    useEffect(() => {
       
        axios.get("http://localhost:4000/User/users")
            .then(result => {
                setEmpUsers(result.data);
            })
            .catch(error => {
                console.error('Error fetching employee users:', error);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const calculatedTotalSalary = parseFloat(basicSalary) + (parseFloat(totalOTHours) * parseFloat(otRate)) + parseFloat(bonus);

        axios.post("http://localhost:4000/Salary/CreateSalary", { empID, month, basicSalary, totalOTHours, otRate, bonus, totalSalary: calculatedTotalSalary, accountNumber,  bank})
            .then(result => {
                console.log(result);
                navigate('/salaryy');
            })
            .catch(err => console.log(err));
    };

    const handleOKClick = () => {
        const selectedEmpUser = empUsers.find(empUser => empUser._id === empID);
        if (selectedEmpUser) {
            setBank(selectedEmpUser.bank);
            setAccountNumber(selectedEmpUser.accountNumber);
            setEmpName(selectedEmpUser.name);
        }
    };

    return (
        <div style={{ 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '70%',
            fontFamily: 'Arial, sans-serif',
            padding: '20px',
            background: '#f0f0f0',
            width:'120%'
        }}>
            <div style={{
                width: '50%',
                background: '#ffffff',
                borderRadius: '8px',
                padding: '20px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
            }}>
                <form onSubmit={handleSubmit}>
                    <h2 style={{ marginBottom: '20px', textAlign: 'center', fontWeight: 'bold', color: '#333333' }}>Add Salary</h2>
                    <div className='mb-2'>
                        <label htmlFor='empID'>EmpID</label>
                        <div style={{ display: 'flex' }}>
                            <input 
                                id='empID' 
                                type='text' 
                                placeholder='Enter EmpID' 
                                className='form-control'
                                value={empID} 
                                onChange={(e) => setEmpID(e.target.value)} required 
                            />
                            <button 
                                type="button" 
                                onClick={handleOKClick} 
                                style={{ 
                                    marginLeft: '5px',
                                    padding: '8px 12px',
                                    backgroundColor: '#007bff',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.3s ease',
                                }}
                            >
                                OK
                            </button>
                        </div>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='empName'>Name</label>
                        <input 
                            id='empName' 
                            type='text' 
                            placeholder='Employee Name' 
                            className='form-control'
                            value={empName} 
                            readOnly 
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='month'>Month</label>
                        <input id='month' type='month' placeholder='Enter Month' className='form-control'
                            value={month} onChange={(e) => setMonth(e.target.value)} required />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='basicSalary'>Basic Salary</label>
                        <input id='basicSalary' type='number' placeholder='Enter Basic Salary' className='form-control'
                            value={basicSalary} onChange={(e) => setBasicSalary(e.target.value)} required />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='totalOTHours'>Total OT Hours</label>
                        <input id='totalOTHours' type='number' placeholder='Enter Total OT Hours' className='form-control'
                            value={totalOTHours} onChange={(e) => setTotalOTHours(e.target.value)} required />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='otRate'>OT Rate</label>
                        <input id='otRate' type='number' placeholder='Enter OT Rate' className='form-control'
                            value={otRate} onChange={(e) => setOtRate(e.target.value)} required />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='bonus'>Bonus</label>
                        <input id='bonus' type='number' placeholder='Enter Bonus' className='form-control'
                            value={bonus} onChange={(e) => setBonus(e.target.value)} required  />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='totalSalary'>Total Salary</label>
                        <input id='totalSalary' type='number' placeholder='Total Salary' className='form-control'
                            value={totalSalary} onChange={(e) => setTotalSalary(e.target.value)} disabled />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='accountNumber'>Account Number</label>
                        <input id='accountNumber' type='number' placeholder='Account Number' className='form-control'
                            value={accountNumber} readOnly />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='bank'>Bank</label>
                        <input id='bank' type='String' placeholder='bank' className='form-control'
                            value={bank} readOnly />
                    </div>
                    <button 
                        style={{ 
                            padding: '10px 20px', 
                            backgroundColor: '#28a745',
                            color: '#fff',
                            borderRadius: '4px',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'block',
                            width: '100%'
                        }}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateSalary;