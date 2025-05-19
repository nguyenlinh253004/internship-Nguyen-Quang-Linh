Day 29-30: Shopify React Hooks + API Admin nâng cao
Nội dung chính
1. Shopify React Hooks
App Bridge là cầu nối giữa ứng dụng của bạn và Shopify Admin, cung cấp các công cụ quan trọng như xác thực, chuyển hướng, và truy cập API.

useAppBridge

Hook useAppBridge cung cấp quyền truy cập vào instance của App Bridge, cho phép bạn tương tác với Shopify Admin:

Điều hướng trong Shopify Admin
Hiển thị toast, modal
Truy cập token xác thực
Giao tiếp với Shopifys

javascriptimport { useAppBridge } from '@shopify/app-bridge-react';

function MyComponent() {
  const app = useAppBridge();
```js
// Sử dụng app để tương tác với AppBridge
```
}
useAuthenticatedFetch

Hook để thực hiện các yêu cầu fetch đã được xác thực đến backend của ứng dụng
Tự động xử lý token xác thực và các chi tiết bảo mật
Đơn giản hóa việc gọi API từ frontend đến backend

javascriptimport { useAuthenticatedFetch } from '@shopify/app-bridge-react';

function MyComponent() {
  const fetch = useAuthenticatedFetch();
  
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/products');
      const data = await response.json();
      // Xử lý dữ liệu
    }
    fetchData();
  }, []);
}
2. Call Shopify Admin API qua App Bridge
GraphQL Admin API

Sử dụng GraphQL để truy vấn dữ liệu từ Shopify Admin API
Cấu trúc yêu cầu và thiết lập headers đúng

javascriptimport { useAppBridge } from '@shopify/app-bridge-react';
import { authenticatedFetch } from '@shopify/app-bridge-utils';

function ProductList() {
  const app = useAppBridge();
  const fetch = authenticatedFetch(app);
  
  async function fetchProducts() {
    const query = `
      {
        products(first: 10) {
          edges {
            node {
              id
              title
              handle
              vendor
            }
          }
        }
      }
    `;
    
    const response = await fetch('/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query
      }),
    });
    
    const data = await response.json();
    return data;
  }
}
REST Admin API

Cách tiếp cận thay thế để truy cập dữ liệu thông qua REST API
Cấu trúc yêu cầu và xử lý phản hồi

javascriptimport { useAppBridge } from '@shopify/app-bridge-react';
import { getSessionToken } from '@shopify/app-bridge-utils';

function ProductManager() {
  const app = useAppBridge();
  
  async function fetchProductsREST() {
    const token = await getSessionToken(app);
    
    const response = await fetch('/api/products', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    const data = await response.json();
    return data;
  }
}
3. Pagination / Filter / Query param
Pagination với GraphQL

Cách triển khai pagination trong GraphQL API của Shopify
Sử dụng các tham số first, last, before, after
Triển khai cursor-based pagination

javascriptconst query = `
  {
    products(first: 10, after: "${cursor}") {
      edges {
        node {
          id
          title
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
Filtering và Search

Lọc sản phẩm bằng các tham số query
Tìm kiếm theo tiêu đề, nhà cung cấp, hoặc thẻ
Xây dựng các bộ lọc động

javascript// Ví dụ GraphQL query với filter
const query = `
  {
    products(first: 10, query: "title:${searchTerm}") {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`;
Quản lý Query Parameters

Theo dõi và cập nhật các tham số query trong URL
Lưu trữ trạng thái lọc và tìm kiếm
Triển khai chuyển hướng trang với các tham số query

javascriptimport { useLocation, useNavigate } from 'react-router-dom';

function ProductFilters() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  
  function updateFilters(newFilters) {
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        queryParams.set(key, value);
      } else {
        queryParams.delete(key);
      }
    });
    
    navigate(`${location.pathname}?${queryParams.toString()}`);
  }
}
Bài tập
Tạo trang /admin-products

Tạo route mới trong ứng dụng

javascript// src/App.jsx
import AdminProducts from './pages/AdminProducts';

function App() {
  return (
    <Routes>
      {/* Routes khác */}
      <Route path="/admin-products" element={<AdminProducts />} />
    </Routes>
  );
}

Tạo component AdminProducts

javascript// src/pages/AdminProducts.jsx
import { useState, useEffect } from 'react';
import { useAppBridge } from '@shopify/app-bridge-react';
import { Card, Layout, Page } from '@shopify/polaris';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const app = useAppBridge();
  
  useEffect(() => {
    fetchProducts();
  }, []);
  
  async function fetchProducts() {
    // Code để fetch sản phẩm sẽ được triển khai ở bước sau
  }
  
  return (
    <Page title="Admin Products">
      <Layout>
        <Layout.Section>
          <Card>
            {/* UI hiển thị sản phẩm */}
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
Call thật Shopify Admin API (GraphQL)

Thiết lập các hàm gọi API GraphQL

javascript// src/utils/shopifyApi.js
import { authenticatedFetch } from '@shopify/app-bridge-utils';

export async function fetchProductsWithGraphQL(app, options = {}) {
  const { first = 10, query = '', cursor = null } = options;
  const fetch = authenticatedFetch(app);
  
  const afterParam = cursor ? `, after: "${cursor}"` : '';
  const queryString = query ? `, query: "${query}"` : '';
  
  const graphqlQuery = `
    {
      products(first: ${first}${afterParam}${queryString}) {
        edges {
          node {
            id
            title
            handle
            vendor
            productType
            totalInventory
            priceRangeV2 {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `;
  
  try {
    const response = await fetch('/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: graphqlQuery
      }),
    });
    
    const data = await response.json();
    return data.data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

Cập nhật component AdminProducts để sử dụng API

javascript// src/pages/AdminProducts.jsx
import { useState, useEffect, useCallback } from 'react';
import { useAppBridge } from '@shopify/app-bridge-react';
import { 
  Card, Layout, Page, ResourceList, TextField, 
  Filters, Pagination, ResourceItem, Thumbnail, TextStyle 
} from '@shopify/polaris';
import { fetchProductsWithGraphQL } from '../utils/shopifyApi';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [queryValue, setQueryValue] = useState('');
  const [cursor, setCursor] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const app = useAppBridge();
  
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await fetchProductsWithGraphQL(app, {
        first: 10,
        query: queryValue ? `title:*${queryValue}*` : '',
        cursor: cursor
      });
      
      setProducts(result.edges.map(edge => edge.node));
      setHasNextPage(result.pageInfo.hasNextPage);
      setCursor(result.pageInfo.endCursor);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  }, [app, queryValue, cursor]);
  
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  
  const handleSearchChange = useCallback((value) => {
    setSearchValue(value);
  }, []);
  
  const handleSearchSubmit = useCallback(() => {
    setQueryValue(searchValue);
    setCursor(null);
  }, [searchValue]);
  
  const handleNextPage = useCallback(() => {
    fetchProducts();
  }, [fetchProducts]);
  
  return (
    <Page title="Admin Products">
      <Layout>
        <Layout.Section>
          <Card>
            <Card.Section>
              <Filters
                queryValue={searchValue}
                filters={[]}
                onQueryChange={handleSearchChange}
                onQueryClear={() => setSearchValue('')}
                onClearAll={() => {
                  setSearchValue('');
                  setQueryValue('');
                  setCursor(null);
                }}
              >
                <div style={{ paddingLeft: '8px' }}>
                  <Button onClick={handleSearchSubmit}>Search</Button>
                </div>
              </Filters>
            </Card.Section>
            <ResourceList
              resourceName={{ singular: 'product', plural: 'products' }}
              items={products}
              loading={isLoading}
              renderItem={(product) => {
                const { id, title, vendor, images, priceRangeV2 } = product;
                const media = images.edges[0] 
                  ? <Thumbnail source={images.edges[0].node.url} alt={images.edges[0].node.altText || title} /> 
                  : null;
                
                const price = priceRangeV2?.minVariantPrice?.amount 
                  ? `${priceRangeV2.minVariantPrice.amount} ${priceRangeV2.minVariantPrice.currencyCode}` 
                  : 'No price';
                
                return (
                  <ResourceItem
                    id={id}
                    media={media}
                    accessibilityLabel={`View details for ${title}`}
                  >
                    <h3>
                      <TextStyle variation="strong">{title}</TextStyle>
                    </h3>
                    <div>{vendor}</div>
                    <div>{price}</div>
                  </ResourceItem>
                );
              }}
            />
            {hasNextPage && (
              <div style={{ textAlign: 'center', padding: '16px' }}>
                <Button onClick={handleNextPage} loading={isLoading}>
                  Load more
                </Button>
              </div>
            )}
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
Hiển thị danh sách sản phẩm có filter theo title

Hoàn thiện backend API endpoint

javascript// server/middleware/graphql.js
import { Shopify } from '@shopify/shopify-api';

export default async function graphqlProxy(req, res) {
  try {
    const session = await Shopify.Utils.loadCurrentSession(req, res);
    
    if (!session) {
      return res.status(401).send('Unauthorized');
    }
    
    const client = new Shopify.Clients.Graphql(session.shop, session.accessToken);
    const response = await client.query({
      data: req.body,
    });
    
    res.status(200).send(response.body);
  } catch (error) {
    console.error('GraphQL proxy error:', error);
    res.status(500).send(error.message);
  }
}

Thiết lập route trong Express

javascript// server/index.js
import express from 'express';
import graphqlProxy from './middleware/graphql.js';

// ... các imports khác và cấu hình

app.use(express.json());

// API endpoints
app.post('/api/graphql', graphqlProxy);

// ... phần còn lại của ứng dụng
Tổng kết
Trong ngày 29-30, chúng ta đã tìm hiểu:

Cách sử dụng Shopify React Hooks:

useAppBridge để truy cập đối tượng AppBridge
useAuthenticatedFetch để thực hiện các yêu cầu đã xác thực


Cách gọi Shopify Admin API thông qua App Bridge:

Sử dụng GraphQL để truy vấn dữ liệu
Thiết lập xác thực và headers đúng


Triển khai pagination, filtering và query params:

Cursor-based pagination với GraphQL
Filtering sản phẩm theo tiêu đề
Quản lý các tham số query trong URL



Thông qua bài tập, chúng ta đã tạo được một trang admin sản phẩm hoạt động hoàn chỉnh với các chức năng:

Hiển thị danh sách sản phẩm từ Shopify Admin API
Tìm kiếm và lọc sản phẩm theo tiêu đề
Phân trang để xem thêm sản phẩm