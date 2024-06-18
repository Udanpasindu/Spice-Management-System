import React, {  useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/frontend_assets/assets";
import {Link, useNavigate} from 'react-router-dom';
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";


const Navbar = ({setShowLogin}) => {

    const [menu,setMenu] = useState("home");
    const navigate = useNavigate();
    const {getTotalCartAmount,token,setToken} = useContext(StoreContext);
    
    const logout = () => {
      localStorage.removeItem("token");
      setToken("");
      navigate("/")
    }
    

  return (
    <div className="navbar">
      <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>

      <ul className="navbar-menu">
        <Link to='/' onClick={()=> setMenu("home")} className={menu==="home"?"active":""}>home</Link>
        <a href="#explore-menu" onClick={()=> setMenu("menu")} className={menu==="menu"?"active":""}>menu</a>
        <a href="#app-download" onClick={()=> setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>mobile-app</a>
        <a href="#footer" onClick={()=> setMenu("contact-us")} className={menu==="contact-us"?"active":""}>contact us</a>
        {!token?<p></p>
        : <a href="/enquiry" onClick={()=> setMenu("enquiry")} className={menu==="enquiry"?"active":""}>Enquiry</a>
          }
          {!token?<p></p>
        : <a href="/myorders" onClick={()=> setMenu("myorders")} className={menu==="myorders"?"active":""}>My orders</a> /**/
          }
       
      </ul>

      <div className="navbar-right">

      
     
        <div className="navbar-search-icon">
          <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
          <div className={getTotalCartAmount()===0?"":"dot"}></div>
        </div>
        {!token?<button onClick={()=>setShowLogin(true)}>sign in</button>
         :  <div className="navbar-profile">
                <img src={assets.profile_icon} alt="" />
                <ul className="navbar-profile-dropdown">
                  <li onClick={()=>navigate('/profile')}>
                      <img src={assets.profile} alt="" />
                      <p>My Profile</p>
                  </li>
                
                  
                  <hr />
                  <li onClick={logout}>
                      <img src={assets.logout_icon} alt="" />
                      <p>Logout</p>
                  </li>
                </ul>
           </div> 
          }
        
      </div>
    </div>
  );
};

export default Navbar;
