import { useEffect, useState } from "react";
import axios from "axios";
const port = 4000;

const SupplierProfile = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const url = `http://localhost:${port}/api/supplier/request/getall/`;
    axios.get(url).then((response) => setData(response.data));
  };

  const acceptRequest = (index) => {
    const setUrl = `http://localhost:${port}/api/supplier/arequest/create`;
    const payload = {
      name: data[index].name,
      quantity: data[index].quantity,
      price: data[index].price,
      deadLine: data[index].deadLine,
    };
    axios.post(setUrl, payload).then((res) => {
      console.log(res);
      handleDelete(data[index]._id);
    });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:${port}/api/supplier/request/delete/` + id)
      .then((res) => {
        console.log(res);
        fetchData();
      })
      .catch((err) => console.log(err));
  };

  const renderTableData = () => {
    return data.map((request, index) => (
      <tr key={index}>
        <td>{request.name}</td>
        <td>{request.quantity}</td>
        <td>{request.deadLine}</td>
        <td>{request.price}</td>
        <td>
          <button
            className="btn btn-successs"

            style={{
              backgroundColor: "tomato",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer"
            }}
            onClick={() => {
              acceptRequest(index);
            }}
          >
            Accept Request
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div
      style={{
        width: "1400px",
        height: "100vh",
        backgroundColor: "#fff",

      }}
    >
      <div
        style={{
          backgroundColor: "#394a6d",
          marginLeft: "100px",
          marginRight: "-300px",
          height: "80vh",
          marginTop: "50px",
          borderRadius: "20px",
          margin: "80px",
          padding: "100px",
          gap: "5px",
          display: "block"
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "5px" }}>
          <h1
            style={{

              color: "#fff",
              backgroundColor: "grey",
              padding: "10px",
              width: "1030px",
              borderRadius: "10px",
            }}
          >
            Raw Material Requests
          </h1>
        </div>
        <div>
          <div
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              color: "#fff",
              padding: "20px",
              borderRadius: "10px",
              overflowX: "auto",
            }}
          >
            <table className="table table-dark" style={{ width: "100%", borderSpacing: "10px", textAlign: "center" }}>
              <thead style={{
                padding: "300px"
              }}>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Deadline</th>
                  <th>Price (Rs.)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>{renderTableData()}</tbody>
            </table>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierProfile;
