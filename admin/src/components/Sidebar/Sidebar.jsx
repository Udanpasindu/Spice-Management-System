import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext.jsx';

const Sidebar = () => {
    const { Token } = useContext(AdminContext);
    return (
        <div className='sidebar'>
            <div className="sidebar-options">
            <NavLink to="/addadmin" className="sidebar-option" style={{backgroundColor:"tomato",color:"white"}}>
                    <img src={assets.admin_icon} alt="" width={24}/>
                    <p>Admins</p>
                </NavLink>
                <NavLink to="/add" className="sidebar-option">
                    <img src={assets.add_icon} alt="" />
                    <p>Add Products</p>
                </NavLink>
                <NavLink to="/list" className="sidebar-option">
                    <img src={assets.order_icon} alt="" />
                    <p>Product List</p>
                </NavLink>
                <NavLink to="/orders" className="sidebar-option">
                    <img src={assets.orders_icon} alt="" />
                    <p>Orders</p>
                </NavLink>
                <NavLink to="/supplier" className="sidebar-option">
                    <img src={assets.supplyermanage_icon} alt="" />
                    <p>Supply Manager</p>
                </NavLink>
                <NavLink to="/supplierpro" className="sidebar-option">
                    <img src={assets.supplyer_icon} alt="" />
                    <p>Supplier</p>
                </NavLink>
                <NavLink to="/paymentRequests" className="sidebar-option" >
                    <img src={assets.income} alt="" />
                    <p>Payment Management</p>
                </NavLink>
                <NavLink to="/OrderPayments" className="sidebar-option">
                    <img src={assets.analysis} alt="" />
                    <p>Payment Summary</p>
                </NavLink>
                <NavLink to="/displayenquiry" className="sidebar-option">
                    <img src={assets.enquries_icon} alt="" />
                    <p>Enquries</p>
                </NavLink>
                <NavLink to="/PromotionList" className="sidebar-option">
                    <img src={assets.promo_icon} alt="" />
                    <p>Promotion Management</p>

                </NavLink>
                <NavLink to="/employeeManagement" className="sidebar-option">

                <img src={assets.employee_icon} alt="" />
                <p>Employee Management</p>
            </NavLink>
            <NavLink to="/addMachine" className="sidebar-option">
                <img src={assets.factory_icon} alt="" />
                <p>Factory Management</p>
            </NavLink>
            <NavLink to="/promocode" className="sidebar-option">
                <img src={assets.promocode_icon} alt="" />
                <p>Add Promo</p>
            </NavLink>

            </div>

        </div>
    )
}

export default Sidebar
