const fetch = require("node-fetch");

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);

    const amount = body.amount;
    const userId = body.userId;

    // 🔐 ENV से direct values
    const token_key = process.env.ZAP_API_KEY;
    const secret_key = process.env.ZAP_SECRET_KEY;

    // 🆔 Order ID
    const order_id = "ORD_" + Date.now();

    // 🔁 Redirect URL (ENV से भी ले सकते हो future में)
    const redirect_url = process.env.REDIRECT_URL;

    // 📦 Payload (Zap को भेजने वाला)
    const payload = {
      token_key: token_key,
      secret_key: secret_key,
      amount: amount,
      order_id: order_id,
      redirect_url: redirect_url,
      user_id: userId,
    };

    console.log("📤 Sending payload:", payload);

    // 🌐 Zap API Call
    const response = await fetch("https://api.zapupi.com/api/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    console.log("✅ Zap RESPONSE:", data);

    // ❌ Fail check
    if (!data || !data.payment_url) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Payment link failed",
          zapResponse: data,
        }),
      };
    }

    // ✅ Success
    return {
      statusCode: 200,
      body: JSON.stringify({
        paymentUrl: data.payment_url,
        orderId: order_id,
      }),
    };

  } catch (err) {
    console.error("❌ ERROR:", err);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err.message,
      }),
    };
  }
};
