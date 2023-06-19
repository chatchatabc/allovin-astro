import productsComplete from "../data/shopify/products.json";
import colorsJson from "../data/colors.json";
import type { ProductShopify } from "src/domain/models/productModel";

const fs = require("fs");

export default async function validateProducts() {
  const [filteredProductColors, removedProductsColor] = validateProductColors();
  const [filteredProducts, removedProducts] = validateProductsInfo(
    filteredProductColors
  );

  fs.writeFileSync(
    "./data/shopify/products-color-removed.json",
    JSON.stringify(removedProductsColor, null, 2)
  );
  fs.writeFileSync(
    "./data/shopify/products-removed.json",
    JSON.stringify(removedProducts, null, 2)
  );
  fs.writeFileSync(
    "./data/shopify/products.json",
    JSON.stringify(filteredProducts, null, 2)
  );
}

function validateProductsInfo(products: any) {
  const removedProducts: any = [];
  const filteredProducts = products.filter((product: ProductShopify) => {
    if (product.variants.nodes.length === 0) {
      removedProducts.push({
        productTitle: product.title,
        productHandle: product.handle,
        productId: product.id,
        reason: "No variants",
      });
      return false;
    }
    if (product.title.includes("test")) {
      removedProducts.push({
        productTitle: product.title,
        productHandle: product.handle,
        productId: product.id,
        reason: "Test product",
      });
      return false;
    }
    if (product.featuredImage === null) {
      removedProducts.push({
        productTitle: product.title,
        productHandle: product.handle,
        productId: product.id,
        reason: "No featured image",
      });
      return false;
    }
    return true;
  });

  return [filteredProducts, removedProducts];
}

function validateProductColors() {
  const colors = colorsJson.contents;
  const removedVariants: any = [];

  const newProducts = productsComplete.map((product) => {
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
