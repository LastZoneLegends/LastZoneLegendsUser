import admin from "firebase-admin";

// 🔐 Firebase init (only once)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });
}

const db = admin.firestore();

export async function handler(event) {
  try {
    const data = JSON.parse(event.body);

    const { orderId, status, amount, userId } = data;

    console.log("Webhook Received:", data);

    // ✅ Only process success
    if (status === "SUCCESS") {
      const userRef = db.collection("users").doc(userId);

      await db.runTransaction(async (t) => {
        const userDoc = await t.get(userRef);

        if (!userDoc.exists) {
          throw new Error("User not found");
        }

        const currentBalance = userDoc.data().wallet || 0;

        // 💰 Wallet update
        t.update(userRef, {
          wallet: currentBalance + amount,
        });

        // 🧾 Transaction save
        const txnRef = db.collection("transactions").doc();
        t.set(txnRef, {
          userId,
          amount,
          orderId,
          status: "SUCCESS",
          createdAt: new Date(),
        });
      });
    }

    return {
      statusCode: 200,
      body: "Webhook processed",
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: "Error",
    };
  }
}
