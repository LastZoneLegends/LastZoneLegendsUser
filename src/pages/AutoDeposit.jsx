import { useState } from "react";

export default function AutoDeposit() {
  const [amount, setAmount] = useState("");

  const handlePayment = async () => {
    if (!amount || amount < 10) {
      alert("Minimum ₹10");
      return;
    }

    try {
      const res = await fetch("/.netlify/functions/create-payment", {
        method: "POST",
        body: JSON.stringify({ amount }),
      });

      const data = await res.json();

      if (data.payment_url) {
        window.location.href = data.payment_url;
      } else {
        alert("Payment failed");
      }
    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <div style={{
      padding: 20,
      textAlign: "center",
      background: "#0f172a",
      minHeight: "100vh",
      color: "white"
    }}>
      <h2>Add Money</h2>

      <input
        type="number"
        placeholder="Enter Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{
          padding: 12,
          width: "80%",
          borderRadius: 8,
          border: "none",
          marginTop: 20
        }}
      />

      <br /><br />

      <button
        onClick={handlePayment}
        style={{
          padding: 12,
          width: "80%",
          borderRadius: 8,
          background: "#22c55e",
          color: "white",
          border: "none"
        }}
      >
        Proceed to Pay
      </button>
    </div>
  );
}
