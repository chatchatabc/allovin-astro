import { productGetDetailsDoc } from "../src/domain/docs/productDoc";
import { productGetAll } from "../src/domain/services/productService";
import { fetchData } from "./fetchScript";

const fs = require("fs");

export default async function getProducts() {
  const data = await productGetAll(250);

  if (!data) {
    return;
  }

  const completeDataPromise: any = data.map(async (product, index) => {
    await new Promise((resolve) => setTimeout(resolve, index * 1000));

    const request = await fetchData(productGetDetailsDoc(), {
      id: product.id,
    });

    const productData = request.data.product;

    console.log(product);

    if (productData) {
      product = { ...product, ...productData };
    }

    return product;
  });

  const completeData = await Promise.all(completeDataPromise);

  console.log("Saving file...");
  fs.writeFileSync(
    "./data/products.json",
    JSON.stringify(completeData, null, 2)
  );
  console.log("File saved!");
}

getProducts();
