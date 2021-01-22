var admin = require("firebase-admin");

var serviceAccount = require("./firestore.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://como-fazer-devpleno-lab.firebaseio.com",
});

const db = admin.firestore();

const productId = "1kmZyaKP3OJQJLDJGgFp";
const imageRef = db
  .collection("products")
  .doc(productId)
  .collection("images")
  .doc();

imageRef
  .set({
    description: "My Desc",
    url: "My Image Url",
  })
  .then((res) => console.log(res));
