import { Page, Card, Button } from "@shopify/polaris";

export default function HomePage() {
  return (
    <Page title="My First App">
      <Card sectioned>
        <Button primary onClick={() => alert("Hello Shopify!")}>
          Click Me
        </Button>
      </Card>
    </Page>
  );
}