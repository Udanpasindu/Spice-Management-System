import React, { useState, useEffect ,useRef} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Report.css';
import { useReactToPrint } from "react-to-print";
import file from '../../assets/file.png';

const Report = ({ url }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching data");
      }
    } catch (error) {
      console.log("Error fetching data:", error);
      toast.error("Error fetching data");
    }
  }

  useEffect(() => {
    fetchList();
  }, []);

  //print report
  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    documentTitle: "Product List",
    onAfterPrint: () => {
      alert("Product List Successfully Downloaded!");
      toast.success("Product List Successfully Downloaded!");
    },
  });

  return (
    <div className='listproduct'>
      <img src={file} alt="" className='fileicon' onClick={handlePrint} />
      <div onClick={handlePrint} className="contentt">Download List</div>
      <div className='listproduct' ref={ComponentsRef}>
        <h1>All Foods List</h1>
        <br />
        <div className="listproductformatmain">
          <p>Image</p>
          <p>Name</p>
          <p>Category</p>
          <p>Description</p>
          <p>Price</p>
          <p>Quantity</p>
        </div>
        <div className="listproductallproducts">
          <hr />
          {list.map((item, index) => {
           return<> <div key={index} className='listproductformat_main listproductformat'>
              <img src={`${url}/images/${item.image}`} alt="" className="listproductproduct-icon" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.description}</p>
              <p>{item.price}</p>
              <p>{item.quantity}</p>
            </div>
            <hr />
            </>
           })}
        </div>
      </div>
    </div>
  );
}

export default Report;
