import React from 'react';
import './PaymentRequests.css';
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import toast from 'react-hot-toast';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function PaymentRequest() {

  const navigate = useNavigate();

  const [request, setRequest] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [displayedRequest, setDisplayedRequest] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/paymentRequest/list')  //display details
      .then(response => {
        setRequest(response.data);
        setDisplayedRequest(response.data);
      })
      .catch(error => {
        console.error('Error fetching payment requests:', error);
      });
  }, []);

  const deleteHandler = (id) => {
    const confirmDelete = window.confirm("Please Confirm Delete ?");  //delete function
    if (confirmDelete) {
      axios.delete(`http://localhost:4000/api/paymentRequest/list/${id}`)
        .then(res => {
          console.log(res);
          setRequest(prevRequests => prevRequests.filter(item => item._id !== id));
          setDisplayedRequest(prevDisplayedRequests => prevDisplayedRequests.filter(item => item._id !== id));
          console.log('Item deleted successfully');
        })
        .then(() => toast.success(`Request Deleted`))
        .then(() => navigate("/paymentRequests"))
        .catch(err => console.log(err))
    }
  }

  const handleSearch = () => {
    const filteredReports = request.filter(item => {
      const lowerSearchTerm = searchTerm.toLowerCase();
      const sectionWords = item.section.toLowerCase().split(" "); // Split the section into words
      return sectionWords.some(word => word.startsWith(lowerSearchTerm)) || // Check if any word starts with the search term
        item.amount.toString().startsWith(lowerSearchTerm) ||
        new Date(item.createdAt).toLocaleDateString().includes(lowerSearchTerm)
    });
    setDisplayedRequest(filteredReports);

    if (!filteredReports.length) {
      toast.error('No results found for your search.', { position: "bottom-center" }); // Display message for empty results
    }
  }

  const handleChange = (e) => {
    setSearchTerm(e.target.value); //search bar passing changing values
    if (e.target.value === "") {
      setDisplayedRequest(request);
    } else {
      handleSearch();
    }
  }

  const downloadReport = () => {
    const doc = new jsPDF();
    const currentDate = new Date().toLocaleDateString();

    const tableColumn = ["Request ID", "Section", "Role", "Description", "Amount", "Submitted Date", "Status"];
    const tableRows = [];

    displayedRequest.forEach(item => {
      const itemData = [
        item._id,
        item.section,
        item.role,
        item.description,
        item.amount.toFixed(2),
        new Date(item.createdAt).toLocaleDateString(),
        item.status
      ];
      tableRows.push(itemData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      styles: { fontSize: 8 }
    });
    doc.text(`Payment Requests Report (${currentDate})`, 14, 10);
    doc.save('payment_requests_report.pdf');
  }

  return (
    <div className='ppayment-request-table'>
      <h1>PAYMENT REQUESTS</h1>
      <div className="ppayment-request-head-line">
        <Link to={"/AddPaymentRequest"}>
          <button className='pbattaabddbutton'>Add Payment Request +</button>
        </Link>
        <div className="psearch-barbbbb">
          <input className='psearch-barbbbb' value={searchTerm} onChange={handleChange} type='text' name='search' autoComplete="off" placeholder='Search by section,amount or date' />
          <button className='psearch-btnbbbb' onClick={handleSearch} > Search </button>
        </div>
      </div>
      <div className="print1"><br />
        <table border={1} cellPadding={10} cellSpacing={0}>
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Section</th>
              <th>Role</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Submitted Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {displayedRequest.map((Item, index) => (
              <tr key={index}>
                <td className='iddd'> {Item._id} </td>
                <td> {Item.section} </td>
                <td> {Item.role} </td>
                <td className='des'> {Item.description} </td>
                <td> {Item.amount.toFixed(2)} </td>
                <td>{new Date(Item.createdAt).toLocaleDateString()}</td>
                <td> {Item.status} </td>
                <td className='paction-buttons'>
                  <div className="pbutton-container">
                    <Link to={`/UpdatePaymentRequest/${Item._id}`}>
                      <button className='pupdate-button'>Update</button>
                    </Link>
                    <button onClick={() => deleteHandler(Item._id)} className='pdelete-button'>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
      <button className='prpt-btn' onClick={downloadReport}>Download Report</button>
      <Link to={"/PaidPayments"}><button style={{ marginLeft: "20px" }} className='prpt-btn'>Paid Payments</button></Link><br />
    </div>
  );
}
export default PaymentRequest;
