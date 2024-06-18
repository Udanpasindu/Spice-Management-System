import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import {AdminContext} from '../../context/AdminContext.jsx'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const { Token,setToken } = useContext(AdminContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    setToken('');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
    navigate('/');
  };
  return (
    <div className='navbar'>
      <img className='logo' src={assets.logo} alt="" />
      {!Token?<></> :(<button className='log-out-but-ad' onClick={handleLogout}>Logout</button>)}
    </div>
  )
}

export default Navbar
