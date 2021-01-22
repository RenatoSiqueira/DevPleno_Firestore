var admin = require("firebase-admin");

var serviceAccount = require("./firestore.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://como-fazer-devpleno-lab.firebaseio.com",
});

const db = admin.firestore();

const products = db.collection("products").get();
products.then((snap) => {
  snap.forEach((doc) => {
    console.log(doc.id, doc.data());
    db.collection("products")
      .doc(doc.id)
      .collection("images")
      .get()
      .then((imgSnap) => {
        imgSnap.forEach((img) => console.log(img.id, img.data()));
      });
  });
});
