export async function handler(event) {
  try {
    const { amount, userId } = JSON.parse(event.body);

    if (!amount || amount < 20) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid amount" }),
      };
    }

    // 🔐 Zap credentials (env se ayenge later)
    const MERCHANT_ID = process.env.ZAP_MERCHANT_ID;
    const API_KEY = process.env.ZAP_API_KEY;

    // 🧾 Order create payload
    

    // 🔗 Zap API call
    const response = await fetch("https://api.zapupi.com/api/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
    token_key: process.env.ZAP_API_KEY,
    amount: amount,
    userId: userId,
    redirectUrl: "https://LastZoneLegendsMain.netlify.app/payment-status",
  }),
});

    const data = await response.json();
    console.log("Zap FULL RESPONSE:", data);

    return {
      statusCode: 200,
      body: JSON.stringify({
        paymentUrl: data.paymentUrl,
        orderId: data.orderId,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
