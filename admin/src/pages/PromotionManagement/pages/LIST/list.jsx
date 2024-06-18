import React, { useState, useEffect } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import edit_icon from '../../../../assets/editbuttonPromo.png';
import remove_icon from '../../../../assets/deletebuttonPromo.png';
import jsPDF from 'jspdf';

const list = ({ url }) => {
  const [promotions, setPromotions] = useState([]);
  const [filteredPromotions, setFilteredPromotions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchPromotions = async () => {
    try {
      const response = await axios.get(`${url}/api/promotion/listpromotion`);
      if (response.data.success) {
        setPromotions(response.data.data);
        setFilteredPromotions(response.data.data);
      } else {
        toast.error('Error');
      }
    } catch (error) {
      console.error('Error fetching promotions:', error);
      toast.error('Error fetching promotions');
    }
  };

  const removePromotion = async (promotionId) => {
    try {
      const result = window.confirm('Are you sure you want to delete this promotion?');
      if (result) {
        const response = await axios.post(`${url}/api/promotion/remove`, { id: promotionId });
        if (response.data.success) {
          toast.success(response.data.message);
          await fetchPromotions(); // Refresh promotions after deletion
        } else {
          toast.error('Error deleting promotion!');
        }
      }
    } catch (error) {
      console.error('Error removing promotions', error);
      toast.error('Error removing promotion!');
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filtered = promotions.filter(
      (promotion) =>
        promotion.name.toLowerCase().includes(query.toLowerCase()) ||
        promotion.itemName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPromotions(filtered);
    if (!filtered.length) {
      toast.error('No results found for your search.', { position: "bottom-center" }); // Display message for empty results
    }
  };

  const generateReport = () => {
    const doc = new jsPDF();
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    const dateTime = `${currentDate} ${currentTime}`;

    const tableRows = [];
    filteredPromotions.forEach((item) => {
      tableRows.push([item.name, item.itemName, item.description, item.discount, item.validDate, item.quantity]);
    });

    doc.autoTable({
      head: [['Name', 'Item Name', 'Description', 'Discount', 'Valid Date', 'Quantity']],
      body: tableRows,
    });
    doc.text(`Promotions Report (${dateTime})`, 14, 10); // Adding date and time to the header

    doc.save('promotions_report.pdf');
  };
  useEffect(() => {
    fetchPromotions();
  }, []);

  return (
    <div className='list-promotion'>
      <h1>All Promotions List</h1>
      <div className='promotion-request-head-line'>
        <Link to='/PromotionAdd'>
          <button className='promoaddbutton'>Add promotion</button>
        </Link>
        <div className='search-barp'>
          <input className='search-barp' type='text' name='search' autoComplete='off' placeholder='Search by Name or Item Name' value={searchQuery} onChange={handleSearch} />
          <button className='search-btnp'>Search</button>
        </div>
      </div>
      <div className="promotiontable">
        <br />
        <table border={1} cellPadding={10} cellSpacing={0}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Item Name</th>
              <th>Description</th>
              <th>Discount</th>
              <th>Valid Date</th>
              <th>Quantity</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredPromotions.map((item) => (
              <tr key={item._id}>
                <td>
                  <img src={`${url}/promoimage/${item.promoimage}`} className='imagepromoList' alt=""/>
                  <br/>{item.name}
                </td>
                <td>{item.itemName}</td>
                <td>{item.description}</td>
                <td>{item.discount}</td>
                <td>{item.validDate}</td>
                <td>{item.quantity}</td>
                <td className='promotion_button'>
                  <Link to={`/PromotionEdit/${item._id}`}>
                    <img src={edit_icon} alt='' />
                  </Link>
                </td>
                <td className='promotion_button'>
                  <img onClick={() => removePromotion(item._id)} src={remove_icon} className='listproduct-remove-icon' />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className='promoreportbutton' onClick={generateReport}>Generate report</button>
    </div>
  );
};

export default list;
