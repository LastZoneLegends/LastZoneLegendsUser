export async function handler(event) {
  try {
    const { amount, userId } = JSON.parse(event.body);

    const payload = {
      token_key: "947657f1d8649fbdd3ea4cc8ad3837e9",
      secret_key: "10369d096f43a470f0493358b56e9d79",
      amount: amount,
      order_id: "ORD_" + Date.now(),
      redirect_url: "https://lastzonelegendsmain.netlify.app/payment-success",
      user_id: userId
    };

    console.log("FINAL PAYLOAD:", payload);

    const response = await fetch("https://api.zapupi.com/api/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    console.log("Zap FULL RESPONSE:", data);

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };

  } catch (err) {
    console.log("ERROR:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
}      }),
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
