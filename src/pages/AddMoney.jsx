import { useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function AddMoney() {
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  const handlePay = async () => {
  if (!amount || amount < 20) {
    alert("Minimum deposit is ₹20");
    return;
  }

  try {
    const userId = getAuth().currentUser?.uid;

    const res = await fetch("/.netlify/functions/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: Number(amount),
        userId: userId,
      }),
    });

    const data = await res.json();

    if (data.paymentUrl) {
      window.location.href = data.paymentUrl;
    } else {
      alert("Payment link failed");
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  }
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

