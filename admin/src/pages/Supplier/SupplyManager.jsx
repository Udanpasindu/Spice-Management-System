import { useNavigate } from "react-router-dom";

const SupplyManager = () => {
  let navigate = useNavigate();

  return (
    <div
      style={{
        backgroundColor: "grey",
        display: "flex",
        marginLeft:"90px",
        justifyContent: "center",
        marginTop:"20px",
        width:"70%",
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
        <h1 style={{ marginBottom: "40px", fontSize: "2rem" }}>
          Supply Manager Dashboard
        </h1>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <button
            onClick={() => navigate("/create")}
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
            }}
          >
            Add Supply Requests
          </button>
          <button
            onClick={() => navigate("/SupplyRequest")}
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
            }}
          >
            Manage Supply Requests
          </button>
          <button
            onClick={() => navigate("/Supplier/ratings")}
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
            }}
          >
            Rate Supply Quality & Generate Reports
          </button>
          <button
            onClick={() => navigate("/Calculation")}
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
            }}
          >
            Calculate Requested Quantity
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupplyManager;
