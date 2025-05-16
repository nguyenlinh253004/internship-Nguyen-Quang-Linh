// server/api/graphql.js
import { Shopify } from "@shopify/shopify-api";
import { GraphqlQueryError } from "@shopify/shopify-api/dist/error";

export default async function graphqlProxy(req, res) {
  try {
    // Validate session
    const session = await Shopify.Utils.loadCurrentSession(req, res);
    
    if (!session || !session.shop || !session.accessToken) {
      return res.status(401).send("Unauthorized");
    }

    // Create GraphQL client
    const client = new Shopify.Clients.Graphql(
      session.shop,
      session.accessToken
    );

    // Extract the query and variables from the request
    const { query, variables } = req.body;
    
    if (!query) {
      return res.status(400).send("Missing required parameter 'query'");
    }

    // Call the GraphQL Admin API
    const response = await client.query({
      data: {
        query,
        variables,
      },
    });

    // Return the response
    res.status(200).send(response.body);
  } catch (error) {
    console.error(`GraphQL Proxy Error: ${error.message}`);
    
    // Handle errors
    if (error instanceof GraphqlQueryError) {
      res.status(500).send(error.response);
    } else {
      res.status(500).send({
        errors: [{ message: error.message }],
      });
    }
  }
}