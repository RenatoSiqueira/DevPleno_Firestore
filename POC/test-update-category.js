var admin = require("firebase-admin");

var serviceAccount = require("./firestore.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://como-fazer-devpleno-lab.firebaseio.com",
});

const db = admin.firestore();

const doc = db.collection("categories").doc("vUc4wA3Ej8jfsCqbmmmF");
doc
  .update({
    category: "Update",
  })
  .then((snap) => {
    console.log(snap);
  });
