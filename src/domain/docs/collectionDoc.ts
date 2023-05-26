export function collectionGetDoc() {
  return `
  query GetCollections($collections: Int = 1, $products: Int = 1, $handle: String = "") {
    collections(first: $collections, query: $handle) {
      nodes {
        handle
        title
        productsCount
        products(first: $products) {
          nodes {
            handle
            variants (first: 10) {
              nodes {
                title
              }
            }
            featuredImage {
              url
            }
          }
        }
      }
    }
  }
  `;
}
