var admin = require("firebase-admin");

var serviceAccount = require("./firestore.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://como-fazer-devpleno-lab.firebaseio.com",
});

const db = admin.firestore();
const pageSize = 1;

const categories = db
  .collection("categories")
  .orderBy("category")
  .limit(pageSize + 1)
  .startAfter("")
  .get();

categories.then((snap) => {
  console.log("is empty? ", snap.empty);
  let total = 0;
  snap.forEach((doc) => {
    if (total < pageSize) {
      console.log(doc.id, doc.data());
    }
    total++;
  });
  if (total > pageSize) {
    console.log("hasNext");
  } else {
    console.log("doest have Next");
  }
});
