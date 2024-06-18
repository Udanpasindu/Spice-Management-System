import { useState } from "react";

function Calculation() {
    const [needed, setNeeded] = useState(0);
    const [fullCap, setFullCap] = useState(0);
    const [availCap, setAvailCap] = useState(0);

    function CalRequest() {
        const Needed = fullCap - availCap;
        setNeeded(Needed);
    }

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                width: "1500px",
                alignItems: "center",
                minHeight: "100vh",
                background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
                color: "#fff",
                fontFamily: "Arial, sans-serif",

            }}
        >
            <div
                style={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "10px",
                    padding: "20px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
                }}
            >
                <form onSubmit={(e) => e.preventDefault()}>
                    <div style={{ marginBottom: "20px" }}>
                        <label htmlFor="fullCap" style={{
                            padding: "0 10px",
                            color: "white"
                        }}>
                            Full Capacity in Stores (in KG)
                        </label>
                        <input
                            type="number"
                            id="fullCap"
                            value={fullCap}
                            onChange={(e) => setFullCap(e.target.value)}
                            style={{
                                padding: "8px",
                                marginLeft: "10px",
                                width: "200px",
                                borderRadius: "5px",
                                border: "1px solid #fff",
                                color: "#fff",
                                backgroundColor: "transparent",
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: "20px" }}>
                        <label htmlFor="availCap" style={{
                            padding: "0 10px",
                            color: "white"
                        }}>
                            Available Capacity in Stores (in KG)
                        </label>
                        <input
                            type="number"
                            id="availCap"
                            value={availCap}
                            onChange={(e) => setAvailCap(e.target.value)}
                            style={{
                                padding: "8px",
                                marginLeft: "10px",
                                width: "200px",
                                borderRadius: "5px",
                                border: "1px solid #fff",
                                color: "#fff",
                                backgroundColor: "transparent",
                            }}
                        />
                    </div>
                    <button
                        type="submit"
                        onClick={() => CalRequest()}
                        style={{
                            padding: "10px 20px",
                            marginTop: "10px",
                            backgroundColor: "#28a745",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                    >
                        Calculate
                    </button>
                </form>
                <br />
                <label style={{ color: "white" }}>Needed Quantity: {needed} KG</label>
            </div>
        </div>
    );
}

export default Calculation;
