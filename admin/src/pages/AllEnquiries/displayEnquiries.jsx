import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import './DisplayEnquiries.css';

function DisplayEnquiries() {
    const [enquiries, setEnquiries] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        axios.get('http://localhost:4000/api/displayenquiry/en')
            .then(response => {
                console.log(response.data);
                setEnquiries(response.data);
            })
            .catch(error => console.error('Error fetching enquiries:', error));
    }, []);

    // Function to filter enquiries based on search query
    const filteredEnquiries = enquiries.filter(enquiry =>
        enquiry.product.toLowerCase().includes(searchQuery.toLowerCase(),)
    );
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };


    return (
        <div className="enquiries-container">

            <div className="enquiries-title">
                <h2>Enquiries</h2>

                <input
                    className='searchEn'
                    type="text"
                    placeholder="Search by products..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />

            </div>

            <table className="enquiries-table">

                <tbody>
                    {filteredEnquiries.map(enquiry => (
                        <tr key={enquiry._id}>
                            <td>{enquiry.name}</td>
                            <td>{enquiry.phone}</td>
                            <td>{enquiry.email}</td>
                            <td>{enquiry.product}</td>
                            <td>{formatDate(enquiry.date)}</td>
                            <td><Link to={`/enquirydetails/${enquiry._id}`} className="enquiry-details-link">View</Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DisplayEnquiries;
