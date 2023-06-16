import productsComplete from "../data/products-complete.json";
import colorsJson from "../data/colors.json";
import type { ProductGetDetails } from "src/domain/models/productModel";

const fs = require("fs");

export default async function validateProducts() {
  const [filteredProducts, removedProducts] = validateProductsInfo();
  const [filteredProductColors, removedProductsColor] =
    validateProductColors(filteredProducts);

  fs.writeFileSync(
    "./data/products-color-removed.json",
    JSON.stringify(removedProductsColor, null, 2)
  );
  fs.writeFileSync(
    "./data/products-removed.json",
    JSON.stringify(removedProducts, null, 2)
  );
  fs.writeFileSync(
    "./data/products.json",
    JSON.stringify(filteredProductColors, null, 2)
  );
}

function validateProductsInfo() {
  const filteredProducts = productsComplete.filter((product) => {
    if (product.variants.nodes.length === 0) {
      return false;
    }
    if (product.title.includes("test")) {
      return false;
    }
    if (product.featuredImage === null) {
      return false;
    }
    return true;
  });
  const removedProducts = productsComplete.filter((product) => {
    return !filteredProducts.includes(product);
  });

  return [filteredProducts, removedProducts];
}

function validateProductColors(products: any) {
  const colors = colorsJson.contents;
  const removedVariants: any = [];

  const newProducts = products.map((product: ProductGetDetails) => {
    const newVariants = product.variants.nodes.filter((variant) => {
      const color = colors.find((color) => {
        return variant.title.toLocaleLowerCase().includes(color);
      });

      if (!color) {
        removedVariants.push({
          variant,
          productTitle: product.title,
          productHandle: product.handle,
          reason: "Color not found",
        });
        return false;
      }
      if (variant.image === null) {
        removedVariants.push({
          variant,
          productTitle: product.title,
          productHandle: product.handle,
          reason: "Image not found",
        });
        return false;
      }

      return true;
    });

    product.variants.nodes = newVariants;
    return product;
  });

  return [newProducts, removedVariants];
}

validateProducts();
