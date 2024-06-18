import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import './Edit.css'
import { assets } from '../../../../assets/assets'
import { Link } from 'react-router-dom';

function edit() {
    const navigate = useNavigate();

    const { id } = useParams();
    const [promoimage, setImage] = useState(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [itemName, setItemName] = useState("");
    const [validDate, setValidDate] = useState("");
    const [discount, setDiscount] = useState("");
    const [quantity, setQuantity] = useState("");

    useEffect(() => {
        axios.put(`http://localhost:4000/api/promotion/list/${id}`)
            .then(result => {
                console.log('Fetched data:', result.data);
                console.log('Fetched data:', result.data);
                const requestData = result.data.promotion;
                setName(requestData.name);
                setDescription(requestData.description);
                setItemName(requestData.itemName);
                setValidDate(requestData.validDate);
                setDiscount(requestData.discount);
                setQuantity(requestData.quantity);
            })
            .catch(error => {
                console.error("error fetching promotion data", error);
            });
    }, [id]);

    const UpdatePromotion = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:4000/api/promotion/list/${id}`, { name, description, itemName, validDate, discount, quantity })
            .then(result => {
                console.log(result);
                toast.success('Promotion updated successfully', { position: "bottom-center" })
                navigate('/PromotionList');
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <div className="promotion_update">
                <h1>Update promotion Details</h1>
                <div className='promotion-request-head-line'>
                    <Link to='/PromotionList'>
                        <button className='promoaddbutton1'>Promotion List</button>
                    </Link>
                </div>
                <form onSubmit={UpdatePromotion} autoComplete="off">
                    <div className="add-promotion-name flex-col">
                        <p>Promotion name</p>
                        <input onChange={(e) => setName(e.target.value)} value={name} type="text" name='name' placeholder='Type here' />
                    </div>
                    <div className="add-promotion-description flex-col">
                        <p>Promotion description</p>
                        <textarea onChange={(e) => setDescription(e.target.value)} value={description} name="description" rows="6" placeholder='Write content here' required></textarea>
                    </div>
                    <div className="add-product-name flex-col">
                        <p>Item name</p>
                        <input onChange={(e) => setItemName(e.target.value)} value={itemName} type="text" name='itemName' placeholder='Type here' />
                    </div>
                    <div className="add-categoryp">
                        <div className="add-valid-date flex-col">
                            <p>Product valid date</p>
                            <input onChange={(e) => setValidDate(e.target.value)} value={validDate} type="date" name='validDate' placeholder='Type here' />
                        </div>
                        <div className="add-discount flex-col">
                            <p>Discount</p>
                            <input onChange={(e) => setDiscount(e.target.value)} value={discount} type="Number" name='discount' placeholder='%' />
                        </div>
                        <div className="add-product-terms flex-col">
                            <p>Quantity</p>
                            <input onChange={(e) => setQuantity(e.target.value)} value={quantity} type="Number" name="quantity" placeholder='Write content here' required />
                        </div>
                    </div>
                    <button type='submit' className='add-btnp'>UPDATE</button>
                </form>
            </div>
        </div>
    )
}

export default edit