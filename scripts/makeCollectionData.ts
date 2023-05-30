import products from "../data/product-items.json";
import collectionPagesJson from "../data/collectionPages.json";

const fs = require("fs");

export default async function makeCollectionData() {
  const collectionPages = collectionPagesJson.contents;

  const data: any[] = [];

  collectionPages.forEach(async (page, index) => {
    const collectionProducts = [...products].filter((product) => {
      let productPartOfCollection = false;

      product.collections.nodes.forEach((collection) => {
        if (collection.id === page.id) {
          productPartOfCollection = true;
        }
      });

      return productPartOfCollection;
    });

    data.push({
      ...page,
      products: collectionProducts,
    });
  });

  fs.writeFileSync("./data/collections.json", JSON.stringify(data, null, 2));
}

makeCollectionData();
