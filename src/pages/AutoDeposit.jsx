import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { doc, getDoc, collection, addDoc } from 'firebase/firestore';

export default function AutoDeposit() {
  const [amount, setAmount] = useState("");
  const [min, setMin] = useState(10);

  useEffect(() => {
    const load = async () => {
      const snap = await getDoc(doc(db, "app_settings", "main"));
      if (snap.exists()) setMin(snap.data().minDeposit);
    };
    load();
  }, []);

  const pay = async () => {
    if (amount < min) {
      alert("Min deposit ₹" + min);
      return;
    }

    const res = await fetch("/.netlify/functions/create-payment", {
      method: "POST",
      body: JSON.stringify({ amount }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    }
  };

  return (
    <div>
      <h2>Instant Deposit</h2>

      <input
        placeholder={`Min ₹${min}`}
        value={amount}
        onChange={(e)=>setAmount(e.target.value)}
      />

      <button onClick={pay}>Proceed to Pay</button>
    </div>
  );
}
