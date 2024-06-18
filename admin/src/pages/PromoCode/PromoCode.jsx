import React, { useState, useEffect } from 'react';
import './PromoCode.css';
import axios from 'axios';

const PromoCode = ({ url }) => {
    const [data, setData] = useState({
        code: generatePromoCode(),
        discount: ""
    });
    const [promoList, setPromoList] = useState([]);

    // Function to generate a random promo code
    function generatePromoCode() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let code = '';
        for (let i = 0; i < 6; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    }

    // Function to handle changes in input fields
    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        if (name === 'discount' && (!value || (value >= 0 && /^\d*$/.test(value)))) {
            setData(prevState => ({ ...prevState, [name]: value }));
        }
    };

    // Function to handle form submission
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        if (data.discount.trim() === "") {
            alert("Please enter a discount price.");
            return;
        }

        try {
            const response = await axios.post(url + '/api/promo/addpromo', {
                promocode: String(data.code),
                promodiscount: Number(data.discount)
            });

            if (response.data.success) {
                setPromoList([...promoList, { code: data.code, discount: data.discount }]);
                setData({
                    code: generatePromoCode(),
                    discount: ""
                });
            } else {
                console.log("Failed to add promo.");
            }
        } catch (error) {
            console.error("Error:", error);
            console.log("Failed to connect to server.");
        }
    };

    // Function to fetch promo codes and discounts from the backend
    const fetchPromoCodes = async () => {
        try {
            const response = await axios.get(url + '/api/promo/promocodes');
            setPromoList(response.data);
        } catch (error) {
            console.error("Error:", error);
            console.log("Failed to fetch promo codes.");
        }
    };

    useEffect(() => {
        fetchPromoCodes();
    }, []);

    // Function to handle refresh button click
    const refreshPromoCode = () => {
        setData({
            code: generatePromoCode(),
            discount: data.discount
        });
    };

    // Function to copy promo code to clipboard
    const copyToClipboard = (code) => {
        navigator.clipboard.writeText(code);
        alert(`Promo code "${code}" copied to clipboard.`);
    };

    // Function to handle promo code deletion
    const deletePromo = async (id) => {
        if (window.confirm("Are you sure you want to delete this promo code?")) {
            try {
                await axios.delete(`${url}/api/promo/deletepromo/${id}`);
                setPromoList(promoList.filter(promo => promo._id !== id));
            } catch (error) {
                console.error("Error:", error);
                console.log("Failed to delete promo code.");
            }
        }
    };

    return (
        <div className='add-promocode'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className='add-promo-code flex-col'>
                    <p>Promo code</p>
                    <input value={data.code} type="text" name="code" placeholder='Type Here' readOnly />
                    <button type="button" className="refresh-btn" onClick={refreshPromoCode}>Refresh</button>
                </div>
                <div className="discount-price flex-col">
                    <p>Discount price</p>
                    <input onChange={onChangeHandler} value={data.discount} type="number" name="discount" placeholder='Discount' />
                </div>
                <div className="btn-container">
                    <button type="submit" className="add-btn">ADD</button>
                </div>
            </form>
            <div className="promo-list">
                <h2 style={{ textAlign: 'center' }}>Added Discounts and Promo Codes</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Promo Code</th>
                            <th>Discount</th>
                            <th>Copy</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {promoList.map((promo, index) => (
                            <tr key={index}>
                                <td>{promo.promocode}</td>
                                <td>{promo.promodiscount}</td>
                                <td><button className="copy-btn" onClick={() => copyToClipboard(promo.promocode)}>Copy</button></td>
                                <td><button className="delete-btn" onClick={() => deletePromo(promo._id)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PromoCode;
