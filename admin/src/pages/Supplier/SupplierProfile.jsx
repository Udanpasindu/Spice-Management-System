import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SupplierProfile = () => {
  let navigate = useNavigate();
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        backgroundColor: "grey",
        display: "flex",
        marginLeft: "90px",
        justifyContent: "center",
        marginTop: "20px",
        width: "70%",
        alignItems: "center",
        padding: "20px",
        height: "80vh",
        color: "white",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "20px",
          padding: "40px",
          maxWidth: "800px",
          width: "100%",
          boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.2)",
          textAlign: "center",
          color: "tomato",
        }}
      >
        <h1 style={{ marginBottom: "30px", fontSize: "2rem" }}>Supplier Profile</h1>
        <form style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <button
            type="button"
            onClick={() => navigate("/Supplier/RawMreq")}
            style={{
              padding: "20px",
              backgroundColor: "tomato",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "18px",
              textTransform: "uppercase",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              width: "100%",
            }}
          >
            Supply Requests
          </button>
          <button
            type="button"
            onClick={() => navigate("/Supplierpro/RawMreqres")}
            style={{
              padding: "20px",
              backgroundColor: "tomato",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "18px",
              textTransform: "uppercase",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              width: "100%",
            }}
          >
            Manage Supply Requests
          </button>
          <button
            type="button"
            onClick={() => navigate("/AddPaymentRequest")}
            style={{
              padding: "20px",
              backgroundColor: "tomato",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "18px",
              textTransform: "uppercase",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              width: "100%",
            }}
          >
            Requests Payments
          </button>
        </form>
        <p style={{ fontSize: "1.2rem", marginTop: "20px", color: "tomato" }}>
          Current Date and Time: {dateTime.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default SupplierProfile;
