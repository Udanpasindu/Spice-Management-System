import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const port = 4000;

function AddRating() {
  const [Cname, setCName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState("");

  let navigate = useNavigate();

  const Submit = (e) => {
    e.preventDefault();
    // Check if the entered rating is a number and within the valid range
    if (isNaN(rating) || rating < 1 || rating > 10) {
      // If not, set an error message
      console.log('Rating must be a number between 1 and 10');
      return;
    }
    axios
      .post(`http://localhost:${port}/api/supplier/rating/create`, {
        item: Cname,
        feedback: feedback,
        rating: rating
      })
      .then((result) => {
        console.log(result);
        navigate("/Supplier/ratings");
      })
      .catch((err) => console.log(err));
  };


  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="w-50 bg-white rounded p-4">
        <form onSubmit={Submit}>
          <h2 style={{
            textAlign: "center", marginBottom: "40px",
            marginLeft: "600px",
            maxWidth: "200px",
            marginTop: "100px"
          }}>Add Rating</h2>
          <div style={{
            marginLeft: "350px",
            maxWidth: "800px",
            height: "50vh",
            borderRadius: "20px"
          }}>
            <div style={{ marginBottom: "20px" }}>
              <label htmlFor="customerName" style={{
                display: "block",
                marginBottom: "5px"
              }}>Customer Name:</label>
              <input
                type="text"
                id="customerName"
                placeholder="Enter Customer Name"
                style={{
                  padding: "10px 300px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  width: "100%",
                }}
                value={Cname}
                onChange={(e) => setCName(e.target.value)}
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label htmlFor="feedback" style={{ display: "block", marginBottom: "5px" }}>Feedback:</label>
              <input
                type="text"
                id="feedback"
                placeholder="Enter Feedback"
                style={{
                  padding: "10px 300px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  width: "100%",
                }}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label htmlFor="rating" style={{ display: "block", marginBottom: "5px" }}>Rating:</label>
              <input
                type="text"
                id="rating"
                placeholder="Enter Between 1-10"
                style={{
                  padding: "10px 300px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  width: "100%",
                }}
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
            </div>
            <button
              type="submit"
              style={{
                padding: "10px 300px",
                backgroundColor: "#28a745",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                width: "100%",
              }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddRating;
