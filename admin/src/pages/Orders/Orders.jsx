import React, { useEffect, useState } from 'react';
import './Orders.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../../assets/assets';
import { jsPDF } from 'jspdf';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + '/api/order/list');
      if (response.data.success) {
        setOrders(response.data.data);
        setFilteredOrders(response.data.data);
      } else {
        toast.error('Error');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const generatePDFReport = () => {
    const doc = new jsPDF();

    const tableRows = [];
    filteredOrders.forEach((order, index) => {
      const rowData = [
        index + 1,
        order.items.map((item) => `${item.name} x ${item.quantity}`).join(', '),
        `${order.address.firstName} ${order.address.lastName}`,
        `${order.address.street}, ${order.address.city}, ${order.address.state}, ${order.address.country}, ${order.address.zipcode}`,
        order.address.phone,
        order.items.length,
        `LKR ${order.amount}`,
        order.status
      ];
      tableRows.push(rowData);
    });

    doc.autoTable({
      head: [['#', 'Items', 'Name', 'Address', 'Phone', 'Item Count', 'Amount', 'Status']],
      body: tableRows,
    });

    doc.save('orders_report.pdf');
  };

  const statusHandler = async (event, orderId) => {
    const newStatus = event.target.value;

    if (newStatus === 'Delivered') {
      const confirmDelivery = window.confirm('Confirm delivered');
      if (!confirmDelivery) {
        return;
      }
    }

    const response = await axios.post(url + '/api/order/status', {
      orderId,
      status: newStatus,
    });

    if (response.data.success) {
      await fetchAllOrders();
    } else {
      toast.error('Error updating status');
    }
  };

  // New function to handle order deletion
  const deleteOrder = async (orderId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this order?');
    if (!confirmDelete) {
      return;
    }

    try {
      const response = await axios.delete(url + `/api/order/delete/${orderId}`);
      if (response.data.success) {
        toast.success('Order deleted successfully');
        await fetchAllOrders();
      } else {
        toast.error('Error deleting order');
      }
    } catch (error) {
      console.error('Error deleting order:', error);
      toast.error('Error deleting order');
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  useEffect(() => {
    const filtered = orders.filter((order) =>
      order.items.some((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredOrders(filtered);
  }, [searchQuery, orders]);

  return (
    <div className="orderadd">
      <h3>Order Page</h3>
      <div className="containerkulinu">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by item name"
          value={searchQuery}
          onChange={handleSearch}
        /></div>
        <button className="searchbarbtnrpt" onClick={generatePDFReport}>Get PDF Report</button>
      </div>
      <div className="order-listz">
        {filteredOrders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + ' x ' + item.quantity;
                  } else {
                    return item.name + ' x ' + item.quantity + ', ';
                  }
                })}
              </p>
              <p className="order-item-name">
                {order.address.firstName} {order.address.lastName}
              </p>
              <div className="order-item-address">
                <p>{order.address.street + ','}</p>
                <p>
                  {order.address.city}, {order.address.state}, {order.address.country},{' '}
                  {order.address.zipcode}
                </p>
              </div>
              <p className="oder-item-phone">{order.address.phone}</p>
            </div>
            <p>Items : {order.items.length}</p>
            <p>LKR {order.amount}</p>
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
              disabled={order.status === 'Delivered'}
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out of delivery">Out of delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
            <button onClick={() => deleteOrder(order._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
