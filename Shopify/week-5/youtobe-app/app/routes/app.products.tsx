import { LoaderArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { authenticate } from "../shopify.server";

export async function loader({ request }: LoaderArgs) {
  const { admin } = await authenticate.admin(request);
  
  // Lấy danh sách sản phẩm bằng Admin API
  const response = await admin.graphql(
    `query {
      products(first: 10) {
        edges {
          node {
            id
            title
          }
        }
      }
    }`
  );
  const data = await response.json();
  return json({ products: data.data.products.edges });
}

export default function ProductsPage() {
  const { products } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>Danh Sách Sản Phẩm</h1>
      <ul>
        {products.map(({ node }: any) => (
          <li key={node.id}>{node.title}</li>
        ))}
      </ul>
    </div>
  );
}