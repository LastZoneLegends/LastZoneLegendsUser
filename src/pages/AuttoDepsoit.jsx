import { useState } from "react";

export default function AutoDeposit() {
  const [amount, setAmount] = useState("");

  const handlePayment = async () => {
    if (!amount || amount < 10) {
      alert("Minimum ₹10");
      return;
    }

    const res = await fetch("/.netlify/functions/create-payment", {
      method: "POST",
      body: JSON.stringify({ amount }),
    });

    const data = await res.json();

    if (data.payment_url) {
      window.location.href = data.payment_url;
    } else {
      alert("Payment error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-gray-900 p-6 rounded-xl w-[90%] max-w-sm text-white text-center">

        <h2 className="text-xl font-bold mb-4">Add Money</h2>

        <input
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-3 rounded-lg text-black"
        />

        <button
          onClick={handlePayment}
          className="w-full mt-4 bg-green-500 p-3 rounded-lg"
        >
          Proceed to Pay
        </button>

      </div>
    </div>
  );
}
