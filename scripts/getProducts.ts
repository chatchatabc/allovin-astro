import { productGetDetailsDoc } from "../src/domain/docs/productDoc";
import { productGetAll } from "../src/domain/services/productService";
import { fetchData } from "./fetchScript";

const fs = require("fs");

export default async function getProducts() {
  const data = await productGetAll(250);

  if (!data) {
    return;
  }

  const completeData: any = [];

  data.forEach(async (product, index) => {
    await new Promise((resolve) => setTimeout(resolve, index * 1000));

    const request = await fetchData(productGetDetailsDoc(), {
      id: product.id,
    });

    const productData = request.data.product;

    console.log(index * 1000, product);

    if (productData) {
      product = { ...product, ...productData };
    }

    completeData.push(product);

    if (index === data.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, index * 1000 + 10000));

      console.log("Saving file...");
      fs.writeFileSync(
        "./data/product.json",
        JSON.stringify(completeData, null, 2)
      );
      console.log("File saved!");
    }
  });
}

getProducts();
