import { productGetDetailsDoc } from "../src/domain/docs/productDoc";
import { productGetAll } from "../src/domain/services/productService";
import { fetchData } from "./fetchScript";

const fs = require("fs");

export default async function getProducts() {
  const startTime = new Date();
  console.log("Start time: ", startTime);
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

    console.log("Time: ", (new Date().getTime() - startTime) / 1000, "s");
    console.log("Index: ", index + 1, "of", data.length);
    console.log("Product: ", product);

    console.log("\n");

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

  console.log("End time: ", (new Date().getTime() - startTime) / 1000, "s");
}

getProducts();
