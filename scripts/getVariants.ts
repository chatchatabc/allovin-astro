import { fetchData } from "./fetchScript";
const fs = require("fs");

export default async function getVariants(start: number = 0) {
  const variables = { variants: 250, start };
  const query = `
  query GetVariants($variants: Int = 10, $start: Int = 0) {
    productVariants(first: $variants) {
      nodes {
        title
        product {
          handle
        }
        image {
          url
        }
      }
    }
  }
  `;

  const data = await fetchData(query, variables);

  if (!data) {
    return;
  }

  const simplifiedData = data.data.productVariants.nodes.map(
    (item: Record<string, any>) => {
      return {
        slug: item.handle,
        ...item,
      };
    }
  );

  return simplifiedData;
}

getVariants();
