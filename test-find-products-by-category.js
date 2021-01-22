var admin = require("firebase-admin");

var serviceAccount = require("./firestore.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://como-fazer-devpleno-lab.firebaseio.com",
});

const db = admin.firestore();

const cat1 = "vUc4wA3Ej8jfsCqbmmmF";
const catRef = db.collection("categories").doc(cat1);

const products = db
  .collection("products")
  .where("categories1", "array-contains", catRef)
  .get();

products.then((snap) => {
  console.log("is empty", snap.empty);
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
