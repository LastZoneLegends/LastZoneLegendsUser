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
    const payload = {
      merchantId: MERCHANT_ID,
      amount: amount,
      currency: "INR",
      userId: userId,
      redirectUrl: "https://LaztZoneLegendsMain.netlify.app/payment-status",
    };

    // 🔗 Zap API call
    const response = await fetch("https://api.zapupi.com/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

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
