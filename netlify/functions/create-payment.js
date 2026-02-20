const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

exports.handler = async (event) => {
  const { amount } = JSON.parse(event.body);

  const settingsDoc = await db.collection("app_setting").doc("main").get();
  const settings = settingsDoc.data();

  const orderId = "ORD" + Date.now();

  // Zap API call (example)
  const zapRes = await fetch("https://zapupi.com/api/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: settings.zapApiKey,
    },
    body: JSON.stringify({
      amount,
      order_id: orderId,
      redirect_url: "https://LZLUSER20.netlify.app/success",
    }),
  });

  const zapData = await zapRes.json();

  await db.collection("transactions").doc(orderId).set({
    amount,
    status: "pending",
    orderId,
    createdAt: new Date(),
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ url: zapData.payment_url }),
  };
};
