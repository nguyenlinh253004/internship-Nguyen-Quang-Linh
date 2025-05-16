// Demo Polaris Components
import React, { useState } from "react";
import {
  Page,
  Layout,
  Card,
  Button,
  Modal,
  TextContainer,
  TextField,
  Form,
  FormLayout,
  Select,
  DatePicker,
  Checkbox,
  Banner,
  Toast,
  Frame,
} from "@shopify/polaris";

export default function PolarisComponentsDemo() {
  // State for Modal
  const [modalActive, setModalActive] = useState(false);
  
  // State for Form
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    category: "clothing",
    isSubscribed: false,
  });
  
  // State for DatePicker
  const [{ month, year }, setDate] = useState({ month: 1, year: 2025 });
  const [selectedDates, setSelectedDates] = useState({
    start: new Date(),
    end: new Date(),
  });
  
  // State for Toast
  const [toastActive, setToastActive] = useState(false);

  // Handlers
  const handleFormChange = (field) => (value) => {
    setFormValues({ ...formValues, [field]: value });
  };
  
  const handleDateChange = (range) => {
    setSelectedDates(range);
  };
  
  const handleMonthChange = (month, year) => {
    setDate({ month, year });
  };
  
  const handleFormSubmit = () => {
    setModalActive(false);
    setToastActive(true);
  };

  return (
    <Frame>
      <Page title="Polaris Components Demo">
        <Layout>
          {/* Card Component */}
          <Layout.Section>
            <Card title="Card Component" sectioned>
              <p>Card là container chứa các nội dung liên quan đến nhau.</p>
              <Button primary onClick={() => setModalActive(true)}>
                Mở Modal
              </Button>
            </Card>
          </Layout.Section>

          {/* Banner Component */}
          <Layout.Section>
            <Banner
              title="Banner thông báo"
              status="info"
              onDismiss={() => {}}
            >
              <p>Banner hiển thị thông báo quan trọng cho người dùng.</p>
            </Banner>
          </Layout.Section>

          {/* Form Component */}
          <Layout.Section>
            <Card title="Form Component" sectioned>
              <Form onSubmit={handleFormSubmit}>
                <FormLayout>
                  <TextField
                    label="Tên"
                    value={formValues.name}
                    onChange={handleFormChange("name")}
                    autoComplete="off"
                  />

                  <TextField
                    label="Email"
                    value={formValues.email}
                    onChange={handleFormChange("email")}
                    type="email"
                    autoComplete="email"
                  />

                  <Select
                    label="Danh mục"
                    options={[
                      { label: "Quần áo", value: "clothing" },
                      { label: "Giày dép", value: "shoes" },
                      { label: "Phụ kiện", value: "accessories" },
                    ]}
                    value={formValues.category}
                    onChange={handleFormChange("category")}
                  />

                  <DatePicker
                    month={month}
                    year={year}
                    onChange={handleDateChange}
                    onMonthChange={handleMonthChange}
                    selected={selectedDates}
                    allowRange
                  />

                  <Checkbox
                    label="Đăng ký nhận thông báo"
                    checked={formValues.isSubscribed}
                    onChange={handleFormChange("isSubscribed")}
                  />

                  <Button submit primary>
                    Gửi form
                  </Button>
                </FormLayout>
              </Form>
            </Card>
          </Layout.Section>
        </Layout>

        {/* Modal Component */}
        <Modal
          open={modalActive}
          onClose={() => setModalActive(false)}
          title="Modal Dialog"
          primaryAction={{
            content: "Đồng ý",
            onAction: () => setModalActive(false),
          }}
          secondaryActions={[
            {
              content: "Hủy",
              onAction: () => setModalActive(false),
            },
          ]}
        >
          <Modal.Section>
            <TextContainer>
              <p>
                Modal hiển thị nội dung focus và yêu cầu người dùng tương tác
                trước khi tiếp tục.
              </p>
            </TextContainer>
          </Modal.Section>
        </Modal>

        {/* Toast Component */}
        {toastActive && (
          <Toast
            content="Form đã được gửi thành công!"
            onDismiss={() => setToastActive(false)}
          />
        )}
      </Page>
    </Frame>
  );
}