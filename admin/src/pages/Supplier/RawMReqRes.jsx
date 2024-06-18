import { useEffect, useState } from "react";
import axios from "axios";
const port = 4000;

const RawMReqRes = () => {
  const [Data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const url = `http://localhost:${port}/api/supplier/arequest/getall/`;
    axios.get(url).then((response) => setData(response.data));
  };

  const deleteRequest = (id) => {
    if (window.confirm("Are you sure you want to delete this request?")) {
      axios
        .delete(`http://localhost:${port}/api/supplier/arequest/delete/` + id)
        .then((resp) => {
          console.log(resp);
          fetchData();
        })
        .catch((errr) => console.log(errr));
    }
  };

  const RowGen = () => {
    const TCellStyle = "bg-black bg-opacity-25 text-white ";
    if (!Data) {
      console.log("Err");
    } else {
      return Data.map((Request, index) => (
        <tr className="py-4" key={index}>
          <td className={TCellStyle}>{Request.name}</td>
          <td className={TCellStyle}>{Request.quantity}</td>
          <td className={TCellStyle}>{Request.deadLine}</td>
          <td className={TCellStyle}>{Request.price}</td>
          <td className={TCellStyle}>
            <button onClick={handleSubmit}
              style={{
                backgroundColor: "green",
                color: "white",
                border: "none",
                padding: "10px 10px",
                borderRadius: "5px",
                cursor: "pointer",
                marginBottom: "10px"

              }}>
              Submit
            </button>

            <button
              style={{
                backgroundColor: "red",
                color: "white",
                border: "none",
                padding: "10px 10px",
                borderRadius: "5px",
                cursor: "pointer",
                marginBottom: "10px",
                marginLeft: "10px"

              }}
              onClick={() => deleteRequest(Request._id)}
              className="btn btn-danger m-2"

            >
              Delete
            </button>

          </td>
        </tr>
      ));
    }
  };

  const handleSubmit = () => {
    window.location =
      "https://docs.google.com/forms/d/e/1FAIpQLSehfvgh0QMqWBBw9mfyEglCmrfQGx4Zhx6F8mthyKyinHT-TA/viewform?usp=sf_link";
  };

  return (
    <div
      style={{

        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "rgba(255, 255, 255, 0.25)",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderRadius: "100px",
          padding: "200px",
        }}
      >
        <div style={{ textAlign: "center", padding: "20px" }}>
          <h1 style={{ color: "#000", backgroundColor: "rgba(255, 255, 255, 0.25)", padding: "10px", borderRadius: "5px" }}>
            Raw Material Request Response
          </h1>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ backgroundColor: "rgba(0, 0, 0, 0.25)", borderRadius: "5px", padding: "20px" }}>
            <div>
              <table style={{ borderCollapse: "collapse", border: "100px solid #fff", textAlign: "center" }}>
                <thead style={{ backgroundColor: "rgba(255, 255, 255, 0.25)", color: "#000", border: "20px solid #fff" }}>
                  <tr>
                    <th style={{ padding: "50px" }}>Item</th>
                    <th style={{ padding: "50px" }}>Quantity</th>
                    <th style={{ padding: "50px" }}>Dead Line</th>
                    <th style={{ padding: "50px" }}>Price (Rs.)</th>
                    <th style={{ padding: "50px" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <RowGen />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default RawMReqRes;
