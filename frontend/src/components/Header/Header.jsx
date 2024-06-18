import React from 'react'
import { useState } from "react";
import './Header.css'


const Header = () => {

  const [menu,setMenu] = useState("home");

  return (
    <div className='header'>
      <div className="header-contents">
        <h2>Order your favourite spices here</h2>
        <p>Join us on a flavorful journey and experience the difference that Sahan Grinding Mills spices can make in your kitchen. Order your favorite spices today and let the essence of excellence infuse every dish. Spice up your culinary adventures with Sahan Grinding Mills!</p>
        <a href="#explore-menu" onClick={()=> setMenu("menu")} className={menu==="menu"?"active":""}><button>View Menu</button></a>
      </div>
    </div>
  )
}

export default Header
