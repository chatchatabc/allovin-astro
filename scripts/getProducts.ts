import { productGetDetailsDoc } from "../src/domain/docs/productDoc";
import { productGetAll } from "../src/domain/services/productService";
import { fetchData } from "./fetchScript";

const fs = require("fs");

export default async function getProducts() {
  const startTime = new Date();
  console.log("Start time: ", startTime);
  const simpleData = await productGetAll(250);
  fs.writeFileSync(
    "./data/shopify/products-simple.json",
    JSON.stringify(simpleData, null, 2)
  );
  console.log("Simple data saved!");

  if (!simpleData) {
    return;
  }

  const completeDataPromise: any = simpleData.map(async (product, index) => {
    // Await timer
    await new Promise((resolve) => setTimeout(resolve, index * 1000));

    // Get product details
    const request = await fetchData(productGetDetailsDoc(), {
      id: product.id,
    });
    const productData = request.data.product;

    // Log
    console.log(
      "Time: ",
      (new Date().getTime() - startTime.getTime()) / 1000,
      "s"
    );
    console.log("Index: ", index + 1, "of", simpleData.length);
    console.log("Product: ", product);
    console.log("\n");

    // Combine data
    if (productData) {
      product = { ...product, ...productData };
    }
    return product;
  });

  // Wait for all promises to resolve
  const completeData = await Promise.all(completeDataPromise);

  console.log("Saving file...");
  fs.writeFileSync(
    "./data/shopify/products-complete.json",
    JSON.stringify(completeData, null, 2)
  );
  console.log("File saved!");
  console.log(
    "End time: ",
    (new Date().getTime() - startTime.getTime()) / 1000,
    "s"
  );
}

getProducts();
