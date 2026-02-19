const admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp();
}

exports.handler = async (event) => {
  const data = JSON.parse(event.body);
  const db = admin.firestore();

  if (data.status === "SUCCESS") {
    const ref = db.collection("users").doc(data.user_id);

    await db.runTransaction(async (t) => {
      const doc = await t.get(ref);
      const bal = doc.data().wallet || 0;

      t.update(ref, {
        wallet: bal + Number(data.amount),
      });
    });
  }

  return { statusCode: 200 };
};
