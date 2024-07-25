import { config } from 'dotenv';
// Setup environment variables
config();

import { createGraphQLClient } from '@shopify/graphql-client';
import { productsQuery, variantsQuery } from './queries.js';

// Init Shopify client
const client = createGraphQLClient({
  url: `https://${process.env.STORE_HOST}/admin/api/${process.env.API_VERSION}/graphql.json`,
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Access-Token': process.env.ADMIN_TOKEN,
  },
});

export async function fetchProductIds(title) {
  const { data: productsData, errors: productsErrors } = await client.request(
    productsQuery,
    {
      variables: {
        title: `title:*${title}*`,
      },
    }
  );

  if (productsErrors || !productsData?.products.edges.length) {
    throw new Error('Products not found.');
  }

  return productsData.products.edges.map((p) =>
    p.node.id.replace('gid://shopify/Product/', '')
  );
}

export async function fetchVariants(queryString, afterCursor = null) {
  let { data } = await client.request(variantsQuery, {
    variables: {
      query: queryString,
      after: afterCursor,
    },
  });

  const variants = data.productVariants.edges.map((edge) => ({
    productTitle: edge.node.product.title,
    title: edge.node.title,
    price: edge.node.price,
  }));

  return {
    variants,
    pageInfo: data.productVariants.pageInfo,
  };
}
