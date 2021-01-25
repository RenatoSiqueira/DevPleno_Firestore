const categories = require("./categories");
const products = require("./products");

const testes = async () => {
  //   await categories.create({ category: "Nova Cat Organizada" });
  //   await categories.remove("vUc4wA3Ej8jfsCqbmmmF");
  //   await categories.update("LQUPytG80KDNaJictzjf", { category: "Atualizada" });
  //   const results = await categories.findAll();
  //   console.log(results);
  //   const cats = await categories.findAllPaginated({
  //     pageSize: 2,
  //     startAfter: "",
  //   });
  //   console.log(cats);

  //   await products.create({
  //     product: "New Prod",
  //     price: 997,
  //     categories: ["LQUPytG80KDNaJictzjf"],
  //   });
  //   await products.update("hJXfH8OFPygMXAxCFkeN", {
  //     product: "New Name",
  //     categories: ["LQUPytG80KDNaJictzjf"],
  //   });
  //   await products.remove("hJXfH8OFPygMXAxCFkeN");
  // await products.addImage("OgL8GdX2rEtTGCgQNnqK", {
  //   description: "Text",
  //   url: "new",
  // });

  // const prods = await products.findAll();
  // console.log(prods);

  const prods2 = await products.findAllPaginated({
    pageSize: 1,
    startAfter: "",
  });
  console.log(prods2);
};
testes();
