var admin = require("firebase-admin");

var serviceAccount = require("./firestore.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://como-fazer-devpleno-lab.firebaseio.com",
});

const db = admin.firestore();

const cat1 = "vUc4wA3Ej8jfsCqbmmmF";
const catRef = db.collection("categories").doc(cat1);

const doc = db.collection("products").doc("06NXh0cBCaUYNDrueOZE");
doc
  .update({
    product: "2Product Name",
    price: 3000,
    categories: admin.firestore.FieldValue.arrayUnion(catRef),
    categories2: admin.firestore.FieldValue.arrayUnion(cat1),
  })
  .then((snap) => {
    console.log(snap);
  });
