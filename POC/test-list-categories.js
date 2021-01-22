var admin = require("firebase-admin");

var serviceAccount = require("./firestore.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://como-fazer-devpleno-lab.firebaseio.com",
});

const db = admin.firestore();

const categories = db.collection("categories").get();
categories.then((snap) => {
  snap.forEach((doc) => {
    console.log(doc.id, doc.data());
  });
});
