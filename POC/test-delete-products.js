var admin = require("firebase-admin");

var serviceAccount = require("./firestore.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://como-fazer-devpleno-lab.firebaseio.com",
});

const db = admin.firestore();
const productId = "06NXh0cBCaUYNDrueOZE";

const productRef = db.collection("products").doc(productId);

db.collection("products")
  .doc(productId)
  .collection("images")
  .get()
  .then((imgSnap) => {
    const exclusoes = [];
    imgSnap.forEach((img) =>
      exclusoes.push(
        db
          .collection("products")
          .doc(productId)
          .collection("images")
          .doc(img.id)
          .delete()
      )
    );
    return Promise.all(exclusoes);
  })
  .then(() => {
    return productRef.delete();
  })
  .then(() => console.log("Everything was deleted"));
