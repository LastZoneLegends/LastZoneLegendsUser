const fetch = require("node-fetch");
const admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp();
}

exports.handler = async (event) => {
  const { amount } = JSON.parse(event.body);

  const db = admin.firestore();
  const snap = await db.collection("settings").doc("zap").get();

  const { apiKey } = snap.data();

  const response = await fetch("https://zapupi.com/api/create-payment", {
    method: "POST",
    headers: {
      Authorization: apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount }),
  });

  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
