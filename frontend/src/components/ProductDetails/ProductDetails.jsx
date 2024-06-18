import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ProductDisplay from '../ProductDisplay/ProductDisplay';
import Breadcrums from '../BreadCrums/Breadcrums';


const ProductDetails = () => {
    const { id } = useParams();
    const [foodDetails, setFoodDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFoodDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/food/list/${id}`);
                const { data } = response.data;
                setFoodDetails(data);
                setLoading(false);
            } catch (error) {
                console.log('Error fetching food details:', error);
            }
        };

        fetchFoodDetails();
    }, [id]);

    
    if (loading) {
        return <div>Loading...</div>;
    }

    if (!foodDetails) {
        return <div>Food not found.</div>;
    }

  return (
    <div>
        <Breadcrums product={foodDetails}/>
        <ProductDisplay product={foodDetails}/>
      {/*<h1>{foodDetails.name}</h1>
      <p>Description: {foodDetails.description}</p>
      <p>Price: {foodDetails.price}</p>
  <p>Category: {foodDetails.category}</p>*/}
    </div>
  )
}

export default ProductDetails
