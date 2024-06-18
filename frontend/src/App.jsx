import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';
import Verify from './pages/Verify/Verify';
import MyOrders from './pages/MyOrders/MyOrders';
import Enquiry from './pages/Enquiry/enquiry'
import ProductDetails from './components/ProductDetails/ProductDetails';
import Profile from './components/User Profile/profile'




const App = () => {

  const [showLogin,setShowLogin] = useState(false)

  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={<PlaceOrder setShowLogin={setShowLogin} />} />
        <Route path='/Verify' element={<Verify/>}/>
        <Route path='/myorders' element={<MyOrders/>}/>
        <Route path='/enquiry' element={<Enquiry />}></Route>
        <Route exact path="/product/:id" element={<ProductDetails/>} />
        <Route path='/profile' element={<Profile />}></Route>
      </Routes>
    </div>
    <Footer/>
    </>
  )
}

export default App
