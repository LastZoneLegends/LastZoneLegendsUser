import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentStatus() {
  const [status, setStatus] = useState("loading");
  const navigate = useNavigate();

  useEffect(() => {
    // URL params read
    const params = new URLSearchParams(window.location.search);
    const paymentStatus = params.get("status");

    if (paymentStatus === "success") {
      setStatus("success");
    } else if (paymentStatus === "failed") {
      setStatus("failed");
    } else {
      setStatus("pending");
    }
  }, []);

  return (
    <div style={{ padding: "20px", textAlign: "center", color: "#fff" }}>
      {status === "loading" && <h2>Checking Payment...</h2>}

      {status === "success" && (
        <>
          <h2 style={{ color: "#00c853" }}>Payment Successful 🎉</h2>
          <p>Amount added to wallet automatically</p>
        </>
      )}

      {status === "failed" && (
        <>
          <h2 style={{ color: "red" }}>Payment Failed ❌</h2>
          <p>Please try again</p>
        </>
      )}

      {status === "pending" && (
        <>
          <h2>Payment Processing...</h2>
          <p>Please wait</p>
        </>
      )}

      <button
        onClick={() => navigate("/wallet")}
        style={{
          marginTop: "20px",
          padding: "12px",
          borderRadius: "8px",
          border: "none",
        }}
      >
        Go to Wallet
      </button>
    </div>
  );
}
