import {
  Box,
  Card,
  Layout,
  Link,
  List,
  Page,
  Text,
  BlockStack,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";

export default function AdditionalPage() {
  return (
    <Page fullWidth>
      <TitleBar title="Hooks" primaryAction={null} />
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Text variant="headingXl" as="h1">
              Hooks
            </Text>
            <Text variant="bodyMd" as="p">
              The following hooks are available for use in your app:
            </Text>
            <List type="bullet">
              <List.Item>
                <Link url="/app/hooks/useShopQuery">useShopQuery</Link> - A hook
                to query the Shopify API.
              </List.Item>
              <List.Item>
                <Link url="/app/hooks/useAuthenticatedFetch">
                  useAuthenticatedFetch
                </Link>{" "}
                - A hook to fetch data from the Shopify API.
              </List.Item>
            </List>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
