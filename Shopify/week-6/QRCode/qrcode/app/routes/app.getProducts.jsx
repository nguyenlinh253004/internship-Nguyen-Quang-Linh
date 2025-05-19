// import { useState, useEffect } from 'react';
// import pkg from '@apollo/client';
// const {useQuery, gql} = pkg;

// const GET_PRODUCTS = gql`
//   query {
//     products(first: 10) {
//       edges {
//         node {
//           id
//           title
//           description
//           featuredImage {
//             url
//           }
//         }
//       }
//     }
//   }
// `;

// function ProductList() {
//   const { data, loading, error } = useQuery(GET_PRODUCTS);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   return (
//     <ul>
//       {data.products.edges.map(({ node }) => (
//         <li key={node.id}>
//           <h3>{node.title}</h3>
//           <img src={node.featuredImage?.url} alt={node.title} width="100" />
//           <p>{node.description}</p>
//         </li>
//       ))}
//     </ul>
//   );
// }

// export default ProductList;