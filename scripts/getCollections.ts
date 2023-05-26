import { fetchData } from "./fetchScript";
const fs = require("fs");

export default async function getVariants(start: number = 0) {
  const variables = { collections: 40, products: 1, start };
  const query = `
  query GetCollections($collections: Int = 1, $products: Int = 1) {
    collections(first: $collections) {
      nodes {
        handle
        title
        productsCount
        products(first: $products) {
          nodes {
            handle
            featuredImage {
              url
            }
          }
        }
      }
    }
  }
  `;

  const data = await fetchData(query, variables);

  if (!data) {
    return;
  }

  const simplifiedData = data.data.collections.nodes.map(
    (item: Record<string, any>) => {
      return {
        slug: item.handle,
        ...item,
      };
    }
  );

  fs.writeFileSync(
    "./data/product-collections.json",
    JSON.stringify(simplifiedData, null, 2)
  );

  return simplifiedData;
}

getVariants();
