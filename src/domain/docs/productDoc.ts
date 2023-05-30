export function productGetVariantsDoc() {
  return `
  query GetProductVariants($id: ID!, $amount: Int = 50) {
    product(id: $id) {
      handle
      title
      priceRangeV2 {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
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
      images(first: 100) {
        nodes {
          url
        }
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
      descriptionHtml
      tags
      priceRangeV2{
        minVariantPrice{
          amount
          currencyCode
        }
        maxVariantPrice{
          amount
          currencyCode
        }
      }
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
      images(first: 100) {
        nodes {
          url
        }
      }
      collections(first:50) {
        nodes{
          id
          handle
          title
        }
      }
    }
  }
  `;
}

export function productGetAllDoc() {
  return `
  query GetProducts($amount: Int = 50) {
    products(first: $amount) {
      nodes {
        handle
        id
        title
      }
    }
  }
  `;
}
