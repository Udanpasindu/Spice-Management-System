import React, { useEffect, useState } from 'react';
import './PaidReportUpload.css';
import axios from 'axios';
import { assets } from '../../assets/assets';
import { toast } from 'react-toastify';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const PaidReportUpload = ({ url }) => {
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalDeliveredOrders, setTotalDeliveredOrders] = useState(0);
  const [totalPaidAmount, setTotalPaidAmount] = useState(null); // Initialize as null initially

  useEffect(() => {
    const fetchTotalPaidAmount = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/paidPayments/totalAmount');
        console.log(response);
        setTotalPaidAmount(response.data); // Update totalPaidAmount directly with response
      } catch (error) {
        console.error('Error fetching total paid amount:', error);
        toast.error('Error fetching total paid amount');
      }
    };

    fetchTotalPaidAmount();
  }, []);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + '/api/order/list');
      if (response.data.success) {
        const deliveredOrders = response.data.data.filter(order => order.status === 'Delivered');
        setFilteredOrders(deliveredOrders);

        let amount = 0;
        deliveredOrders.forEach(order => {
          amount += parseFloat(order.amount) || 0;
        });

        setTotalAmount(amount);
        setTotalDeliveredOrders(deliveredOrders.length);
      } else {
        toast.error('Error fetching orders');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Error fetching orders');
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

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
  }

  const generateReport = () => {
    const doc = new jsPDF();
    const currentDate = new Date().toLocaleDateString();

    doc.setFontSize(18);
    doc.text(`Payment Summary Report (${currentDate})`, 14, 22);

    doc.setFontSize(12);
    doc.text(`Total Amount: LKR ${totalAmount.toFixed(2)}`, 14, 40);
    doc.text(`Total Delivered Orders: ${totalDeliveredOrders}`, 14, 50);
    if (totalPaidAmount !== null) {
      doc.text(`Total Paid Payments: LKR ${totalPaidAmount.toFixed(2)}`, 14, 60);
    }

    const tableColumn = ["Order ID", "Name", "Address", "Phone", "Items", "Amount"];
    const tableRows = [];

    filteredOrders.forEach(order => {
      const orderData = [
        order._id,
        `${order.address.firstName} ${order.address.lastName}`,
        `${order.address.street}, ${order.address.city}, ${order.address.state}, ${order.address.country}, ${order.address.zipcode}`,
        order.address.phone,
        order.items.map(item => `${item.name} x ${item.quantity}`).join(', '),
        `LKR ${order.amount}`
      ];
      tableRows.push(orderData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 70 });
    doc.save('completed_orders_report.pdf');
  };

  return (
    <div className="orderadd">
      <div className="ppppsearch-bar">
        <h1>Payment Summary</h1>
        <button className="ppppsearch-barbtn" onClick={generateReport}>Download Report</button>
      </div>
      <div className="order-summary">
        <p>Total Amount: LKR {totalAmount.toFixed(2)}</p> 
        <p>Total Delivered Orders: {totalDeliveredOrders}</p>
        {totalPaidAmount !== null && (
          <p>Total paid payments: LKR {totalPaidAmount.toFixed(2)}</p>
        )}
      </div>
      <div className="order-listz">
        {filteredOrders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.deliveredicon} alt="" />
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
  )
}

export default PaidReportUpload;
