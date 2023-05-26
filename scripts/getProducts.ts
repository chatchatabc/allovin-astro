import { fetchData } from "./fetchScript";

const fs = require("fs");

const products = 180;
const GetProducts = `
query GetProducts($products: Int = 1) {
  products(first: $products) {
    nodes {
      handle
      title
      tags
      createdAt
      description
      descriptionHtml
      featuredImage {
        altText
        url
      }
      seo {
        description
        title
      }
    }
  }
}
`;

export default async function getProducts() {
  const data = await fetchData(GetProducts, { products });

  if (!data) {
    return;
  }

  const simplifiedData = data.data.products.nodes.map(
    (item: Record<string, any>) => {
      return {
        slug: item.handle,
        name: item.title,
        ...item,
      };
    }
  );

  fs.writeFileSync(
    "./data/product-items.json",
    JSON.stringify(simplifiedData, null, 2)
  );

  return simplifiedData;
}

getProducts();
