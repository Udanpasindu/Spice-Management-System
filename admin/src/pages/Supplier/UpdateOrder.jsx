import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
const port = 4000;

function UpdateOrder() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [rid, setID] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [deadLine, setDeadLine] = useState("");
  const [idError, setIDError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [deadlineError, setDeadlineError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:${port}/api/supplier/request/getone/` + id)
      .then((result) => {
        setName(result.data.name);
        setID(result.data.rid);
        setQuantity(result.data.quantity);
        setPrice(result.data.price);
        setDeadLine(result.data.deadLine);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const Update = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axios
        .put(`http://localhost:${port}/api/supplier/request/update/` + id, {
          name,
          quantity,
          price,
          deadLine,
        })
        .then((result) => {
          console.log(result);
          navigate("/SupplyRequest");
        })
        .catch((err) => console.log(err));
    }
  };

  const validateForm = () => {
    let isValid = true;

    if (!price.match(/^\d+(\.\d{1,2})?$/)) {
      setPriceError("Price must be a number with up to 2 decimal places");
      isValid = false;
    } else {
      setPriceError("");
    }

    if (!deadLine) {
      setDeadlineError("Deadline is required");
      isValid = false;
    } else {
      setDeadlineError("");
    }

    return isValid;
  };

  return (
    <div
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        alignItems: "center",
        height: "100vh",
        marginLeft: "400px",
        backgroundColor: "#ffffff",
      }}
    >
      <div className="w-50 bg-white rounded p-3" style={{ padding: "100px" }}>
        <form onSubmit={Update}>
          <h2>Update Request</h2>
          <div style={{ display: "flex" }}>
            <div style={{ width: "350%" }}>
              <div style={{ marginBottom: "20px", marginTop: "30px", width: "200%" }}>
                <label htmlFor="">Name :</label>
                <br />
                <input
                  type="text"
                  value={name}
                  placeholder="Enter Raw Material Name"
                  className="from-control"
                  style={{ width: "100%", padding: "8px" }}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div style={{ marginBottom: "20px", width: "200%" }}>
                <label htmlFor="">Request ID :</label>
                <br />
                <input
                  value={rid}
                  type="text"
                  placeholder="Enter Request id"
                  className="from-control"
                  style={{ width: "100%", padding: "12px" }}
                  readOnly // Disable editing
                />
                <span className="text-danger">{idError}</span>
              </div>
              <div style={{ marginBottom: "20px", width: "200%" }}>
                <label htmlFor="">Quantity :</label>
                <br />
                <input
                  value={quantity}
                  type="text"
                  placeholder="Enter Quantity"
                  className="from-control"
                  style={{ width: "100%", padding: "8px" }}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div style={{ marginBottom: "20px", width: "200%" }}>
                <label htmlFor="">Price :</label>
                <br />
                <input
                  value={price}
                  type="text"
                  placeholder="Enter Price Per KG"
                  className="from-control"
                  style={{ width: "100%", padding: "8px" }}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <span className="text-danger" style={{ color: "red" }}>{priceError}</span>
              </div>
              <div style={{ marginBottom: "10px", width: "200%" }}>
                <label htmlFor="">DeadLine :</label>
                <br />
                <input
                  value={deadLine}
                  type="date"
                  placeholder="Enter date"
                  className="from-control"
                  style={{ width: "100%", padding: "8px" }}
                  onChange={(e) => setDeadLine(e.target.value)}
                />
                <span className="text-danger">{deadlineError}</span>
              </div>
            </div>
          </div>
          <button style={{ padding: "10px 20px", backgroundColor: "#28a745", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", display: "block", marginTop: "20px" }}>Update</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateOrder;
