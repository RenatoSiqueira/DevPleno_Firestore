const db = require("./firestore");
const admin = require("firebase-admin");

const findAll = async () => {
  const productsDB = await db.collection("products").get();
  if (productsDB.empty) {
    return [];
  }
  const products = [];
  productsDB.forEach((doc) => {
    products.push({
      ...doc.data(),
      id: doc.id,
    });
  });
  for await (product of products) {
    const imgs = [];
    const imgsDb = await db
      .collection("products")
      .doc(product.id)
      .collection("images")
      .get();

    imgsDb.forEach((img) => {
      imgs.push({ ...img.data, id: img.id });
    });
    console.log(imgs);
  }
  return products;
};

const remove = async (id) => {
  const imgs = await db
    .collection("products")
    .doc(id)
    .collection("images")
    .get();

  const exclusoes = [];
  imgs.forEach((img) =>
    exclusoes.push(
      db
        .collection("products")
        .doc(id)
        .collection("images")
        .doc(img.id)
        .delete()
    )
  );
  await Promise.all(exclusoes);

  const doc = db.collection("products").doc(id);
  await doc.delete();
};

const create = async ({ categories, ...data }) => {
  const doc = db.collection("products").doc();
  const categoriesRefs = categories.map((cat) =>
    db.collection("categories").doc(cat)
  );
  await doc.set({
    ...data,
    categories: categoriesRefs,
    categories2: categories,
  });
};

const addImage = async (id, data) => {
  const imageRef = db.collection("products").doc(id).collection("images").doc();
  await imageRef.set(data);
};

const update = async (id, { categories, ...data }) => {
  const doc = db.collection("products").doc(id);
  const categoriesRefs = categories.map((cat) =>
    db.collection("categories").doc(cat)
  );
  await doc.update({
    ...data,
    categories: admin.firestore.FieldValue.arrayUnion(...categoriesRefs),
    categories2: admin.firestore.FieldValue.arrayUnion(...categories),
  });
};

const findAllPaginated = async ({ pageSize = 10, startAfter = "" }) => {
  const categoriesDB = await db
    .collection("categories")
    .orderBy("category")
    .startAfter(startAfter)
    .limit(pageSize + 1)
    .get();

  if (categoriesDB.empty) {
    return {
      data: [],
      total: 0,
    };
  }
  const categories = [];
  let total = 0;

  categoriesDB.forEach((doc) => {
    if (total < pageSize) {
      categories.push({
        ...doc.data(),
        id: doc.id,
      });
    }
    total++;
  });
  return {
    data: categories,
    total: categories.length,
    hasNext: total > pageSize,
    startAfter:
      total > pageSize ? categories[categories.length - 1].category : "",
  };
};

module.exports = {
  findAll,
  remove,
  create,
  addImage,
  update,
  findAllPaginated,
};
