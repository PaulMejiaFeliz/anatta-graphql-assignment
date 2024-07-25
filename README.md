## Task

Create a script (eg: app.js) that communicates with Shopify through Shopify’s graphql APIs. It takes input product names and fetches the appropriate products that match the name and list down the variants sorting by price.

### Setup

1. Run `npm install`

2. Create a `.env` file from the `.env.sample` and set variables:
   - `STORE_HOST`
   - `API_VERSION`
   - `ADMIN_TOKEN`

### Script input

`node app.js –name glove`

### Output example:

My Glove - variant A - price $20\
Your Gloves - variant X - price $22\
My Glove - variant B - price $25
