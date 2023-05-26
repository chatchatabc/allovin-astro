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
