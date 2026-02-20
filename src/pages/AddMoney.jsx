import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddMoney() {
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  const handlePay = () => {
    if (!amount || amount < 20) {
      alert("Minimum deposit is ₹20");
      return;
    }

    console.log("Amount:", amount);

    // Step 9 me API call + redirect add karenge
  };

  return (
    <div style={{ padding: "16px", color: "#fff" }}>
      
      {/* 🔙 Header */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        <button onClick={() => navigate(-1)} style={{ marginRight: "10px" }}>
          ←
        </button>
        <h2>Add Money</h2>
      </div>

      {/* 💳 Card */}
      <div style={{
        background: "#1e1e2f",
        padding: "20px",
        borderRadius: "12px"
      }}>
        <h3>Instant Deposit (Auto-Add)</h3>

        <p>Enter Amount</p>

        <input
          type="number"
          placeholder="Minimum ₹20"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            marginBottom: "15px"
          }}
        />

        <button
          onClick={handlePay}
          style={{
            width: "100%",
            padding: "14px",
            background: "#00c853",
            border: "none",
            borderRadius: "10px",
            fontWeight: "bold"
          }}
        >
          Proceed to Pay
        </button>
      </div>

      {/* 📜 Instructions */}
      <div style={{
        marginTop: "20px",
        background: "#0f172a",
        padding: "15px",
        borderRadius: "10px"
      }}>
        <h4>Important Instructions</h4>
        <ul>
          <li>You will be redirected to secure payment page</li>
          <li>Please wait for loading</li>
          <li>Payment auto confirm ho jayega</li>
          <li>Issue ho to support contact karo</li>
        </ul>
      </div>
    </div>
  );
}
