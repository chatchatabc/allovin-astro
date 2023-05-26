export function productGetVariantsDoc() {
  return `
  query GetProductVariants($id: ID!, $amount: Int = 50) {
    product(id: $id) {
      handle
      title
      variants(first: $amount) {
        nodes {
          title
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
  `;
}

export function productGetDetailsDoc() {
  return `
  query GetProductDetails($id: ID!) {
    product(id: $id) {
      handle
      title
      variants(first: 50) {
        nodes {
          title
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
  `;
}
