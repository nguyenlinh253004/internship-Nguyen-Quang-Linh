import { Button, Card, Page, DataTable, Modal, TextField, AppProvider, Banner, Box } from "@shopify/polaris";
import { useState, useEffect } from "react";
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useFetcher } from "@remix-run/react";
import translations from '@shopify/polaris/locales/en.json';

type Product = {
  id: number;
  name: string;
  price: string;
};

// Mock data ban đầu
const initialProducts: Product[] = [
  { id: 1, name: "Áo thun", price: "$20" },
  { id: 2, name: "Quần jeans", price: "$40" },
];

// Giả lập database trong memory
let mockDB = [...initialProducts];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return json({ products: mockDB });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const intent = formData.get("intent");

  switch (intent) {
    case "add":
      const newProduct = {
        id: Date.now(),
        name: formData.get("name") as string,
        price: formData.get("price") as string,
      };
      mockDB.push(newProduct);
      break;

    case "delete":
      const idToDelete = Number(formData.get("id"));
      mockDB = mockDB.filter((p) => p.id !== idToDelete);
      break;

    case "edit":
      const idToEdit = Number(formData.get("id"));
      mockDB = mockDB.map((p) =>
        p.id === idToEdit
          ? {
              ...p,
              name: formData.get("name") as string,
              price: formData.get("price") as string,
            }
          : p
      );
      break;
  }

  return json({ success: true });
};

export default function ProductsPage() {
  const { products } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();
  const [isClient, setIsClient] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({ name: "", price: "" });

  useEffect(() => setIsClient(true), []);

  const handleSubmit = () => {
    if (editingProduct) {
      fetcher.submit(
        { ...formData, intent: "edit", id: String(editingProduct.id) },
        { method: "POST" }
      );
    } else {
      fetcher.submit(
        { ...formData, intent: "add" },
        { method: "POST" }
      );
    }
    setIsModalOpen(false);
    setFormData({ name: "", price: "" });
  };

  const handleDelete = (id: number) => {
    if(window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
    fetcher.submit(
      { intent: "delete", id: String(id) },
      { method: "POST" }
    );
  }
  };
  if (!isClient) return <Page title="Đang tải..."><Card>Loading...</Card></Page>;

  return (
    <AppProvider i18n={translations}>
      <Page title="Danh sách sản phẩm">
        {fetcher.state === "submitting" && (
          <Banner title="Đang xử lý..." status="info" />
        )}

        <Card>
          <DataTable
            columnContentTypes={["text", "text", "text"]}
            headings={["Tên sản phẩm", "Giá", "Hành động"]}
            rows={products.map((p) => [
              p.name,
              p.price,
              <Box key={p.id}>
                <Button onClick={() => {
                  setEditingProduct(p);
                  setFormData({ name: p.name, price: p.price });
                  setIsModalOpen(true);
                }}>Sửa</Button>
                <Button destructive onClick={() => handleDelete(p.id)}>Xóa</Button>
              </Box>
            ])}
          />
        </Card>

        <Button primary onClick={() => {
          setEditingProduct(null);
          setFormData({ name: "", price: "" });
          setIsModalOpen(true);
        }}>
          Thêm sản phẩm
        </Button>

        <Modal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingProduct ? "Sửa sản phẩm" : "Thêm sản phẩm mới"}
          primaryAction={{
            content: "Lưu",
            onAction: handleSubmit,
          }}
        >
          <Modal.Section>
            <TextField
              label="Tên sản phẩm"
              value={formData.name}
              onChange={(value) => setFormData({ ...formData, name: value })}
              autoComplete="off"
            />
            <TextField
              label="Giá"
              value={formData.price}
              onChange={(value) => setFormData({ ...formData, price: value })}
              autoComplete="off"
            />
          </Modal.Section>
        </Modal>
      </Page>
    </AppProvider>
  );
}