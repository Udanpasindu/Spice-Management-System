import React, { useEffect, useState, useContext } from 'react';
import './enquiry.css';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Enquiry = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [product, setProduct] = useState('');
    const [description, setDescription] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const { food_list } = useContext(StoreContext);

    const validatePhoneNumber = (phoneNumber) => {
        const phonePattern = /^\d{10}$/;
        return phonePattern.test(phoneNumber);
    };

    const Submit = (e) => {
        e.preventDefault();
        if (!product) {
            alert('Please select a product.');
            return;
        }
        if (!validatePhoneNumber(phone)) {
            alert('Phone number must be exactly 10 digits.');
            return;
        }
        axios.post("http://localhost:4000/api/enquiry/add", { name, phone, email, product, description })
            .then(result => {
                console.log(result);
                alert("Enquiry submitted successfully! We will Reply You Soon");
                setSubmitted(true);
            })
            .catch(err => console.log(err));
    };

    const handleProductChange = (e) => {
        const selectedProduct = e.target.value;
        setProduct(selectedProduct);
    };

    if (submitted) {
        return <Navigate to="/" />;
    }

    return (
        <div className="enquiry">
            <div className="contact-details">
                <h2>Contact Details</h2>
                <p>Address: 123 Street, City</p>
                <p>Email: example@example.com</p>
                <p>Phone: 123-456-7890</p>
                <p>Hotline: 987-654-3210</p>
            </div>
            <div className="enquiry-left">
                <form onSubmit={Submit} className='enquiry'>
                    <div className="enquiry-left">
                        <p className="titlex">Enquiry Form</p>
                        <div className="multifields">
                            <input name='name' onChange={(e) => setName(e.target.value)} type="text" placeholder='Name' required />
                            <input name='phone' onChange={(e) => setPhone(e.target.value)} type="text" placeholder='Phone' required />
                            <input name='email' onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Email' required />
                            <label>Select here the product that you want to enquire about</label>
                            <select id="food-select" onChange={handleProductChange} required>
                                <option value="">Select a product</option>
                                {food_list.map(food => (
                                    <option key={food._id} value={food.name}>
                                        {food.name} {food.category}
                                    </option>
                                ))}
                            </select>
                            <label>Description</label>
                            <textarea onChange={(e) => setDescription(e.target.value)} name="Description" id="" cols="50" rows="10" required></textarea>
                        </div>
                        <button className="enquiry-but" type='submit'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Enquiry;
