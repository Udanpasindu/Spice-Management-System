import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import edit_icon from '../../assets/pen.png';
import remove_icon from '../../assets/cross_icon.png';
import search from '../../assets/search.png';
import './List.css';

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [filterdata, setFilterdata] = useState([]);
  const [query, setQuery] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [foodIdToDelete, setFoodIdToDelete] = useState(null);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
        setFilterdata(response.data.data);
      } else {
        toast.error("Error fetching data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Error fetching data");
    }
  }

  const removeFood = async (foodId) => {
    setFoodIdToDelete(foodId);
    setShowConfirmation(true);
  }

  const confirmDelete = async () => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodIdToDelete });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
        setShowConfirmation(false);
        setFoodIdToDelete(null);
      } else {
        toast.error("Error removing food");
      }
    } catch (error) {
      console.error("Error removing food:", error);
      toast.error("Error removing food");
    }
  }

  const cancelDelete = () => {
    setShowConfirmation(false);
    setFoodIdToDelete(null);
  }

  //search
  const handleSearch = (event) => {
    const getSearch = event.target.value.toLowerCase();
    const searchData = filterdata.filter(item => item.name.toLowerCase().includes(getSearch));
    setList(searchData);
    setQuery(getSearch);
  }

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='list-product'>
      <h1>All Product List</h1>
      <br />
      <div className="searchbar">
        <input type="text" name='name' value={query} onChange={(e) => handleSearch(e)} placeholder='Search.....' />
        <img src={search} alt="" className='search-icon' />
      </div>
      <Link to={'/report'}><h1 className="rep">Generate Report</h1></Link>
      <div className="listproduct-format-main">
        <p>Image</p>
        <p>Name</p>
        <p>Quantity</p>
        <p>Category</p>
        <p>Description</p>
        <p>Price(Rs:)</p>
        <p>Actions</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {list.map((item, index) => {
          return<><div key={index} className='listproduct-format-main listproduct-format'>
            <img src={`${url}/images/${item.image}`} alt="" className="listproduct-product-icon" />
            <p>{item.name}</p>
            <p>{item.quantity}</p>
            <p>{item.category}</p>
            <p className='descr'>{item.description}</p>
            <p>{item.price}</p>
            <Link to={`/edit/${item._id}`}><img src={edit_icon} alt="" className="listproduct-edit-icon" /></Link>
            <img onClick={() => removeFood(item._id)} src={remove_icon} className="listproduct-remove-icon" alt="remove" />
          </div>
        <hr />
        </> 
      })}
      </div>

      {showConfirmation && (
        <div className="confirmation-message">
          <h2>Are you sure you want to delete this product?</h2>
          <div className="confirmation-message-buttons">
            <button className="confirm-button" onClick={confirmDelete}>Confirm</button>
            <button className="cancel-button" onClick={cancelDelete}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default List;
