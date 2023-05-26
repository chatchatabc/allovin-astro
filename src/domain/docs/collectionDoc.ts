export function collectionGetDoc() {
  return `
  query GetCollections($collections: Int = 1, $products: Int = 1, $query: String = "", $sortKey: ProductCollectionSortKeys = COLLECTION_DEFAULT) {
    collections(first: $collections, query: $query) {
      nodes {
        handle
        title
        productsCount
        products(first: $products, sortKey: $sortKey) {
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
