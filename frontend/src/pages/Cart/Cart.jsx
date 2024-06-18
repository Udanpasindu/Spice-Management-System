import React, { useContext, useState } from 'react';
import "./Cart.css";
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Cart = () => {
    const { cartItems, food_list, removeFromCart, getTotalCartAmount, promotion, url, setPromoCode } = useContext(StoreContext);
    const [promoCodeInput, setPromoCodeInput] = useState("");
    const [promoError, setPromoError] = useState("");
    const navigate = useNavigate();

    const handlePromoCodeSubmit = async () => {
        try {
            const response = await axios.get(`${url}/api/promo/promocodes`);
            const promo = response.data.find(p => p.promocode === promoCodeInput);
            if (promo) {
                setPromoCode(promo.promocode);
                setPromoError("");
            } else {
                setPromoError("Invalid promo code");
            }
        } catch (error) {
            console.error("Error applying promo code:", error);
            setPromoError("Error applying promo code");
        }
    };

    return (
        <div className='cart'>
            <div className="cart-items">
                <div className="cart-items-title">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br />
                <hr />
                {food_list.map((item) => {
                    if (cartItems[item._id] > 0) {
                        return (
                            <div key={item._id}>
                                <div className="cart-items-title cart-items-item">
                                    <img src={url + "/images/" + item.image} alt="" />
                                    <p>{item.name}</p>
                                    <p>LKR {item.price}</p>
                                    <p>{cartItems[item._id]}</p>
                                    <p>LKR {item.price * cartItems[item._id]}</p>
                                    <p onClick={() => removeFromCart(item._id)} className='cross'>X</p>
                                </div>
                                <hr />
                            </div>
                        );
                    }
                })}
            </div>
            <div className="cart-bottom">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>LKR {getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Delivery Fee</p>
                            <p>LKR {getTotalCartAmount() === 0 ? 0 : 200}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Discount</p>
                            <p>LKR {promotion()}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>LKR {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 200 - promotion()}</b>
                        </div>
                    </div>
                    <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
                </div>
                <div className="cart-promocode">
                    <div>
                        <p>If you have a promo code, enter it here</p>
                        <div className='cart-promocode-input-search'>
                            <input
                                type="text"
                                placeholder='promo code'
                                value={promoCodeInput}
                                onChange={(e) => setPromoCodeInput(e.target.value)}
                            />
                            <button onClick={handlePromoCodeSubmit}>Submit</button>
                        </div>
                        {promoError && <p className="promo-error">{promoError}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
