import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import './enquiryDetails.css'
import jsPDF from 'jspdf';
import { toast } from 'react-toastify'

function EnquiryDetails() {
    const { id } = useParams();
    const [enquiry, setEnquiry] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate
    

    useEffect(() => {
        axios.get(`http://localhost:4000/api/enquiry/${id}`)
            .then(response => {
                console.log(response.data);
                setEnquiry(response.data);
            })
            .catch(error => console.error('Error fetching enquiry details:', error));
    }, [id]);

    if (!enquiry) {
        return <div>Loading...</div>;
    }

    const handleDelete = () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this enquiry?");
        if (confirmDelete) {
            axios.delete(`http://localhost:4000/api/enquiry/deleteuser/${id}`)
                .then(res => {
                    console.log(res);
                    
                    toast.success("Successfully deleted!")

                    navigate('/displayenquiry')
                })
                .catch(err => console.error(err));
        }
    };
    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        doc.setTextColor(0, 0, 0); // Set text color to black
        doc.setFontSize(12); // Set font size to 12px
    
        // Calculate position for the title
        const pageWidth = doc.internal.pageSize.getWidth();
        const textWidth = doc.getStringUnitWidth("Customer Enquiry Report") * doc.internal.getFontSize() / doc.internal.scaleFactor;
        const xOffset = (pageWidth - textWidth) / 2;
    
        // Add title in bold text
        doc.setFont("bold");
        doc.text("Customer Enquiry Report", xOffset, 10);
    
        // Reset font to normal
        doc.setFont("normal");
    
        // Add enquiry details
        const enquiryLines = doc.splitTextToSize(`Product: ${enquiry.product}\n\nCustomer Name: ${enquiry.name}\n\nContact Number: 0${enquiry.phone}\n\nEmail: ${enquiry.email}\n\nEnquiry:\n\n ${enquiry.description}`, 180);
        doc.text(enquiryLines, 10, 30);
    
        // Calculate the y-coordinate for the start of the table
        const tableStartY = 30 + (enquiryLines.length * 5) + 10;
    
        // Add table
        const tableData1 = [
            ["Checked by", "Checked Date","Signature"],
            ["", "", ""]
             // Second row with blank cells
        ];
        doc.autoTable({
            startY: tableStartY,
            head: tableData1,
            body: [],
            margin: { top:30 },
            styles: { halign: "center" },
        didDrawCell: (data) => {
            // Draw lines for each cell
            doc.setLineWidth(0.1);
            doc.line(data.cell.x, data.cell.y, data.cell.x + data.cell.width, data.cell.y); // Top line
            doc.line(data.cell.x, data.cell.y + data.cell.height, data.cell.x + data.cell.width, data.cell.y + data.cell.height); // Bottom line
            doc.line(data.cell.x, data.cell.y, data.cell.x, data.cell.y + data.cell.height); // Left line
            doc.line(data.cell.x + data.cell.width, data.cell.y, data.cell.x + data.cell.width, data.cell.y + data.cell.height); // Right line
        }
        });
    
        doc.save('enquiry_details.pdf');
    };
    

    
    
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    return (
        <div className="enquiriesD">
            <div className="title">
                Product:{enquiry.product}</div><br />
            <div className="flex">
                <div className="cus-Details">
                    <p className='head'>Name:</p>
                    <p>{enquiry.name}</p>
                    <p className='head'>Contact Number:</p>
                    <p>0{enquiry.phone}</p>
                    <p className='head'>Email:</p>
                    <a href={`mailto:${enquiry.email}`}>{enquiry.email}</a>
                </div>
                <div className="Details">
                    {enquiry.product}
                    
                    <p>{formatDate(enquiry.date)}</p> <hr />  <br />
                    <div className="des">{enquiry.description}</div><br />
                    <div className="controls"> <button className="button-link" onClick={handleDelete}>Delete</button>
                        <button className="button-link" onClick={handleDownloadPDF}>Download PDF</button></div>

                </div>
            </div>

        </div>

    );
}

export default EnquiryDetails;
