import React from 'react'
//import './Breadcrums.css'
import arrow_icon from '../../assets/frontend_assets/breadcrum_arrow.png'
import { Link } from 'react-router-dom';
//import { Link } from 'react-router-dom';

const Breadcrums = (props) => {
    const {product}=props;
  return (
    <div className='breadcrum'>
      <Link to={'/'}>HOME  <img src={arrow_icon} alt="" /></Link>  {product.name}
    </div>
  )
}

export default Breadcrums
