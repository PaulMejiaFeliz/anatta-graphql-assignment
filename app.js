import { fetchProductIds, fetchVariants } from './shopifyClient.js';

// Get product name from arguments
const nameArg = process.argv.findIndex((s) => s === '-name');

if (nameArg === -1 || !process.argv[nameArg + 1]) {
  throw new Error('Name argument is missing.');
}

const name = process.argv[nameArg + 1];

// Fetch product IDs for input name
const productIds = await fetchProductIds(name);

// Generate variants filter query
const variantsQueryString = productIds
  .map((id) => `product_id:${id}`)
  .join(' OR ');

const variants = [];

// Get variants for matching products
let result = await fetchVariants(variantsQueryString);
variants.push(...result.variants);

// Paginate variants to get all matching variants
while (result.pageInfo.hasNextPage) {
  result = await fetchVariants(variantsQueryString, result.pageInfo.endCursor);
  variants.push(...result.variants);
}

// Sort variants by price
const sortedVariants = variants.sort(
  (v1, v2) => parseFloat(v1.price) - parseFloat(v2.price)
);

// Print variants
sortedVariants.forEach((v) => {
  console.log(`${v.productTitle} - ${v.title} - price $${Math.round(v.price)}`);
});
