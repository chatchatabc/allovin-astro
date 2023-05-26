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
            title
            handle
            createdAt
            variants (first: 10) {
              nodes {
                image {
                  url
                }
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

export function collectionGetProductsDoc() {
  return `
  query GetCollectionProducts($id: ID!, $amount: Int = 10) {
    collection(id: $id) {
      products(first: $amount) {
        nodes {
          id
        }
      }
    }
  }
  `;
}
