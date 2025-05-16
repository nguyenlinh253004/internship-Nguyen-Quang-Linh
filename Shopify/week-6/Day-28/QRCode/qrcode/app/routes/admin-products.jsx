// app/routes/admin-products.jsx
import { useState, useCallback, useEffect } from "react";
import * as Polaris from "@shopify/polaris";
import { useAuthenticatedGraphQLClient } from "../hooks/useAppBridge";

const {
  Page,
  Card,
  ResourceList,
  ResourceItem,
  TextField,
  Filters,
  Pagination,
  Thumbnail,
  TextStyle,
  Spinner,
  Layout,
  EmptyState,
  Toast,
  Button,
  Banner,
  Stack,
} = Polaris;

// GraphQL query để lấy danh sách sản phẩm
const GET_PRODUCTS = `
  query getProducts($first: Int!, $after: String, $query: String) {
    products(first: $first, after: $after, query: $query) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          id
          title
          handle
          description
          createdAt
          totalInventory
          priceRangeV2 {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          featuredImage {
            id
            url
            altText
          }
          vendor
          productType
        }
      }
    }
  }
`;

export default function AdminProducts() {
  const client = useAuthenticatedGraphQLClient();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [queryValue, setQueryValue] = useState("");
  const [pageInfo, setPageInfo] = useState({
    hasNextPage: false,
    hasPreviousPage: false,
    startCursor: null,
    endCursor: null,
  });
  const [toastActive, setToastActive] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [cursor, setCursor] = useState(null);

  // Số lượng sản phẩm hiển thị trên mỗi trang
  const ITEMS_PER_PAGE = 10;

  // Hàm tải danh sách sản phẩm
  const fetchProducts = useCallback(async () => {
    if (!client) return;

    setLoading(true);
    try {
      const variables = {
        first: ITEMS_PER_PAGE,
        after: cursor,
        query: queryValue ? `title:*${queryValue}*` : "",
      };

      const response = await client.query(GET_PRODUCTS, variables);
      
      if (response.errors) {
        throw new Error(response.errors[0].message);
      }

      const { products } = response.data;
      setProducts(products.edges.map(edge => edge.node));
      setPageInfo(products.pageInfo);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      showToast(`Lỗi: ${err.message}`);
    }
  }, [client, cursor, queryValue]);

  // Load sản phẩm khi component mount hoặc khi các dependencies thay đổi
  useEffect(() => {
    if (client) {
      fetchProducts();
    }
  }, [client, fetchProducts]);

  // Xử lý khi người dùng thực hiện tìm kiếm
  const handleFiltersQueryChange = useCallback((value) => {
    setQueryValue(value);
  }, []);

  // Xử lý khi người dùng submit form tìm kiếm
  const handleQueryValueRemove = useCallback(() => {
    setQueryValue("");
  }, []);

  // Xử lý khi người dùng nhấn tìm kiếm
  const handleFiltersClearAll = useCallback(() => {
    handleQueryValueRemove();
  }, [handleQueryValueRemove]);

  // Điều hướng sang trang tiếp theo
  const handleNextPage = useCallback(() => {
    if (pageInfo.hasNextPage) {
      setCursor(pageInfo.endCursor);
    }
  }, [pageInfo]);

  // Điều hướng sang trang trước đó
  const handlePreviousPage = useCallback(() => {
    if (pageInfo.hasPreviousPage) {
      setCursor(pageInfo.startCursor);
    }
  }, [pageInfo]);

  // Hiển thị thông báo toast
  const showToast = useCallback((message) => {
    setToastMessage(message);
    setToastActive(true);
  }, []);

  // Component EmptyState khi không có sản phẩm
  const emptyStateMarkup = (
    <EmptyState
      heading="Không tìm thấy sản phẩm nào"
      image="/api/placeholder/320/200"
      action={{ content: "Tạo sản phẩm mới", url: "/products/new" }}
    >
      <p>Không có sản phẩm nào phù hợp với tiêu chí tìm kiếm của bạn.</p>
    </EmptyState>
  );

  // Bộ lọc
  const filters = [
    {
      key: "title",
      label: "Tiêu đề",
      filter: (
        <TextField
          label="Tiêu đề"
          value={queryValue}
          onChange={handleFiltersQueryChange}
          autoComplete="off"
          labelHidden
        />
      ),
      shortcut: true,
    },
  ];

  // Thanh tìm kiếm
  const filterControl = (
    <Filters
      queryValue={queryValue}
      filters={filters}
      onQueryChange={handleFiltersQueryChange}
      onQueryClear={handleQueryValueRemove}
      onClearAll={handleFiltersClearAll}
    />
  );

  return (
    <Page
      title="Sản phẩm"
      subtitle="Quản lý danh sách sản phẩm trong cửa hàng của bạn"
      primaryAction={{
        content: "Thêm sản phẩm",
        url: "/products/new",
      }}
    >
      <Layout>
        {error && (
          <Layout.Section>
            <Banner status="critical">
              <p>Đã xảy ra lỗi: {error}</p>
            </Banner>
          </Layout.Section>
        )}

        <Layout.Section>
          <Card>
            <ResourceList
              resourceName={{ singular: "sản phẩm", plural: "sản phẩm" }}
              items={products}
              renderItem={(item) => {
                const { id, title, vendor, priceRangeV2, totalInventory, featuredImage } = item;
                const media = featuredImage ? (
                  <Thumbnail
                    source={featuredImage.url}
                    alt={featuredImage.altText || title}
                  />
                ) : (
                  <Thumbnail source="/api/placeholder/80/80" alt={title} />
                );

                let price = "Không có giá";
                if (priceRangeV2 && priceRangeV2.minVariantPrice) {
                  const { amount, currencyCode } = priceRangeV2.minVariantPrice;
                  price = new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: currencyCode,
                  }).format(amount);
                }

                return (
                  <ResourceItem
                    id={id}
                    url={`/products/${id}`}
                    media={media}
                    accessibilityLabel={`Xem chi tiết về ${title}`}
                  >
                    <Stack>
                      <Stack.Item fill>
                        <h3>
                          <TextStyle variation="strong">{title}</TextStyle>
                        </h3>
                      </Stack.Item>
                      <Stack.Item>
                        <p>{price}</p>
                      </Stack.Item>
                    </Stack>
                    <div>Nhà cung cấp: {vendor || "Không có"}</div>
                    <div>Tồn kho: {totalInventory || 0}</div>
                  </ResourceItem>
                );
              }}
              loading={loading}
              filterControl={filterControl}
              emptyState={emptyStateMarkup}
            />
            <div style={{ padding: "16px" }}>
              <Stack distribution="center">
                <Pagination
                  hasPrevious={pageInfo.hasPreviousPage}
                  onPrevious={handlePreviousPage}
                  hasNext={pageInfo.hasNextPage}
                  onNext={handleNextPage}
                />
              </Stack>
            </div>
          </Card>
        </Layout.Section>
      </Layout>

      {toastActive && (
        <Toast content={toastMessage} onDismiss={() => setToastActive(false)} />
      )}
    </Page>
  );
}