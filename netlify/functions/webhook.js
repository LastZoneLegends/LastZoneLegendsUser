const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

exports.handler = async (event) => {
  const data = JSON.parse(event.body);

  const { order_id, status, amount, userId } = data;

  if (status === "success") {
    const userRef = db.collection("users").doc(userId);

    await db.runTransaction(async (t) => {
      const userDoc = await t.get(userRef);
      const balance = userDoc.data().wallet || 0;

      t.update(userRef, {
        wallet: balance + amount,
      });

      t.update(db.collection("transactions").doc(order_id), {
        status: "success",
      });
    });
  }

  return { statusCode: 200 };
};
