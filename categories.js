const db = require("./firestore");

const findAll = async () => {
  const categoriesDB = await db.collection("categories").get();
  if (categoriesDB.empty) {
    return [];
  }
  const categories = [];
  categoriesDB.forEach((doc) => {
    categories.push({
      ...doc.data(),
      id: doc.id,
    });
  });
  return categories;
};

const remove = async (id) => {
  const doc = db.collection("categories").doc(id);
  await doc.delete();
};

const create = async (data) => {
  const doc = db.collection("categories").doc();
  await doc.set(data);
};

const update = async (id, data) => {
  const doc = db.collection("categories").doc(id);
  await doc.update(data);
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
  update,
  findAllPaginated,
};
