export const productsQuery = `
  query ($title: String) {
    products(first: 10, query: $title) {
      edges {
        node {
          id
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;

export const variantsQuery = `
  query ($query: String, $after: String) {
    productVariants(first: 10, query: $query, after: $after) {
      edges {
        node {
          product {
            title
          }
          title
          price
        }
      } 
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
