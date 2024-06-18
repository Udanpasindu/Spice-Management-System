import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditProduct.css';
import { useParams } from 'react-router-dom';
import upload_area from '../../assets/upload_area.svg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const EditProduct = () => {
    const { id } = useParams();
    
    const [formData, setFormData] = useState({
        name: '',
        quantity:'',
        description: '',
        price: '',
        category: '',
        image: null,
        
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/food/list/${id}`);
                const { data } = response.data;
                setFormData({
                    name: data.name,
                    quantity:data.quantity,
                    description: data.description,
                    price: data.price,
                    category: data.category,
                    image:data.image
                    
                });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            image: e.target.files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name,quantity ,description, price, category, image } = formData;
        const formDataToSend = new FormData();
        formDataToSend.append('name', name);
        formDataToSend.append('quantity',quantity);
        formDataToSend.append('description', description);
        formDataToSend.append('price', price);
        formDataToSend.append('category', category);
        formDataToSend.append('image', image);


        try {
            const response = await axios.put(`http://localhost:4000/api/food/list/${id}`, formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' }
               
            });
            console.log(response.data);
            toast.success('Product updated successfully!'); 
            // Handle success, redirect, or show a success message
        } catch (error) {
            console.log('Error editing product:', error);
            toast.error('Failed to update product. Please try again.');
            // Handle error, show error message to user
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='add-product'>
            <h1>Edit Product</h1>
            <hr />
            <form onSubmit={handleSubmit}>
                <div className="addproduct-itemfield">
                   <label htmlFor="name">Name:</label>
                   <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div className="addproduct-itemfield">
                    <label htmlFor="quantity">Quantity:</label>
                    <input type="text" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} />
                </div>
                <div className="addproduct-itemfield">
                 <label htmlFor="description">Description:</label>
                <textarea type="text" id="description" name="description" value={formData.description} onChange={handleChange} />
                </div>
                <div className="addproduct-itemfield">
                <label htmlFor="price">Price:</label>
                <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} />
                </div>
                
                <div className="addproduct-itemfield">
                <label htmlFor="">Product category:</label>
              <select onChange={handleChange} name="category"value={formData.category}>
                <option value="Powder">Powder</option>
                <option value="Pieces">Pieces</option>
                <option value="Flour">Flour</option>
                <option value="Oil">Oil</option>
                <option value="Seeds">Seeds</option>
                <option value="Other">Other</option>
              </select>
              </div>
                {/*<div className="form-group">
                <label htmlFor="category">Category:</label>
                <input type="text" id="category" name="category" value={formData.category} onChange={handleChange} />
                </div>*/}
                <div className="addproduct-itemfield">
                <label className="upload-area">
                  {formData.image ? (
                     <img src={`http://localhost:4000/images/`+formData.image} alt="Uploaded" className="uploaded-image" value={formData} />
                          ) : (
                     <img src={upload_area} alt="Upload Area" className="upload-icon" />
                     )}
                  <input type="file" id="image" name="image" onChange={handleImageChange} hidden />
                </label>
                </div>
                <div className="addproduct-btn">
                    <br />
                <button type="submit">Save Changes</button>
                </div>
            </form>
            <ToastContainer/>
        </div>
    );
};

export default EditProduct;
