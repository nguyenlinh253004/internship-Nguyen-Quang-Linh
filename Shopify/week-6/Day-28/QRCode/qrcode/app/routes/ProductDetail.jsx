// Ví dụ nâng cao: ProductDetail.jsx
import { useState, useEffect } from "react";
import { useParams } from "@remix-run/react";
import * as Polaris from "@shopify/polaris";
import { useAuthenticatedGraphQLClient } from "../hooks/useAppBridge";

const {
  Page,
  Layout,
  Card,
  SkeletonBodyText,
  SkeletonDisplayText,
  TextContainer,
  Thumbnail,
  Badge,
  Button,
  Banner,
  Stack,
  TextField,
  Heading,
  Spinner,
} = Polaris;

// GraphQL query để lấy thông tin chi tiết sản phẩm
const GET_PRODUCT = `
  query getProduct($id: ID!) {
    product(id: $id) {
      id
      title
      description
      handle
      onlineStoreUrl
      createdAt
      publishedAt
      vendor
      productType
      tags
      totalInventory
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
      featuredImage {
        id
        url
        altText
      }
      images(first: 5) {
        edges {
          node {
            id
            url
            altText
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            price
            availableForSale
            inventoryQuantity
            sku
          }
        }
      }
    }
  }
`;

// GraphQL mutation để cập nhật sản phẩm
const UPDATE_PRODUCT = `
  mutation productUpdate($input: ProductInput!) {
    productUpdate(input: $input) {
      product {
        id
        title
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export default function ProductDetail() {
  const { id } = useParams();
  const client = useAuthenticatedGraphQLClient();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [vendor, setVendor] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState(null);

  // Tải thông tin sản phẩm
  useEffect(() => {
    if (!client || !id) return;

    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await client.query(GET_PRODUCT, {
          id: `gid://shopify/Product/${id}`,
        });
        
        if (response.errors) {
          throw new Error(response.errors[0].message);
        }

        const { product } = response.data;
        setProduct(product);
        
        // Cập nhật state với dữ liệu sản phẩm
        setTitle(product.title);
        setDescription(product.description || "");
        setVendor(product.vendor || "");
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [client, id]);

  // Xử lý cập nhật sản phẩm
  const handleSave = async () => {
    if (!client) return;

    setIsSaving(true);
    setSaveSuccess(false);
    setSaveError(null);

    try {
      const response = await client.query(UPDATE_PRODUCT, {
        input: {
          id: product.id,
          title,
          descriptionHtml: description,
          vendor,
        },
      });

      if (response.errors) {
        throw new Error(response.errors[0].message);
      }

      const { productUpdate } = response.data;
      
      if (productUpdate.userErrors.length > 0) {
        throw new Error(productUpdate.userErrors[0].message);
      }

      // Cập nhật thành công
      setSaveSuccess(true);
      setIsSaving(false);
    } catch (err) {
      setSaveError(err.message);
      setIsSaving(false);
    }
  };

  // Hiển thị skeleton khi đang tải
  if (loading) {
    return (
      <Page>
        <Layout>
          <Layout.Section>
            <Card sectioned>
              <TextContainer>
                <SkeletonDisplayText size="large" />
                <SkeletonBodyText lines={4} />
              </TextContainer>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    );
  }

  // Hiển thị lỗi nếu có
  if (error) {
    return (
      <Page title="Lỗi">
        <Banner status="critical">
          <p>Đã xảy ra lỗi: {error}</p>
        </Banner>
      </Page>
    );
  }

  // Hiển thị trường hợp không tìm thấy sản phẩm
  if (!product) {
    return (
      <Page title="Không tìm thấy sản phẩm">
        <Banner status="warning">
          <p>Không tìm thấy sản phẩm với ID: {id}</p>
        </Banner>
      </Page>
    );
  }

  // Format giá
  const formatPrice = (price, currencyCode) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: currencyCode || "VND",
    }).format(price);
  };

  // Lấy giá sản phẩm
  const productPrice = product.priceRangeV2?.minVariantPrice;
  const formattedPrice = productPrice 
    ? formatPrice(productPrice.amount, productPrice.currencyCode)
    : "Không có giá";

  return (
    <Page
      title={product.title}
      breadcrumbs={[{ content: "Sản phẩm", url: "/admin-products" }]}
      primaryAction={{
        content: "Lưu",
        onAction: handleSave,
        loading: isSaving,
      }}
    >
      <Layout>
        {saveSuccess && (
          <Layout.Section>
            <Banner status="success" onDismiss={() => setSaveSuccess(false)}>
              <p>Đã lưu sản phẩm thành công!</p>
            </Banner>
          </Layout.Section>
        )}
        
        {saveError && (
          <Layout.Section>
            <Banner status="critical" onDismiss={() => setSaveError(null)}>
              <p>Lỗi khi lưu: {saveError}</p>
            </Banner>
          </Layout.Section>
        )}

        <Layout.Section>
          <Card title="Thông tin cơ bản" sectioned>
            <FormLayout>
              <TextField
                label="Tiêu đề"
                value={title}
                onChange={setTitle}
                autoComplete="off"
              />
              <TextField
                label="Mô tả"
                value={description}
                onChange={setDescription}
                multiline={4}
              />
              <TextField
                label="Nhà cung cấp"
                value={vendor}
                onChange={setVendor}
                autoComplete="off"
              />
            </FormLayout>
          </Card>
        </Layout.Section>

        <Layout.Section secondary>
          <Card title="Thông tin bổ sung">
            <Card.Section>
              <Stack vertical spacing="tight">
                <Stack distribution="equalSpacing">
                  <p>Giá:</p>
                  <p>{formattedPrice}</p>
                </Stack>
                <Stack distribution="equalSpacing">
                  <p>Tồn kho:</p>
                  <p>{product.totalInventory || 0}</p>
                </Stack>
                <Stack distribution="equalSpacing">
                  <p>Loại sản phẩm:</p>
                  <p>{product.productType || "Không có"}</p>
                </Stack>
                <Stack distribution="equalSpacing">
                  <p>Đường dẫn:</p>
                  <p>{product.handle}</p>
                </Stack>
              </Stack>
            </Card.Section>

            <Card.Section title="Hình ảnh">
              {product.featuredImage ? (
                <img
                  src={product.featuredImage.url}
                  alt={product.featuredImage.altText || product.title}
                  style={{ width: "100%", maxHeight: "200px", objectFit: "contain" }}
                />
              ) : (
                <div style={{ textAlign: "center", padding: "20px" }}>
                  <p>Không có hình ảnh</p>
                </div>
              )}
            </Card.Section>
            
            <Card.Section title="Tags">
              <Stack spacing="tight">
                {product.tags && product.tags.length > 0 ? (
                  product.tags.map((tag, index) => (
                    <Badge key={index}>{tag}</Badge>
                  ))
                ) : (
                  <p>Không có tag</p>
                )}
              </Stack>
            </Card.Section>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}