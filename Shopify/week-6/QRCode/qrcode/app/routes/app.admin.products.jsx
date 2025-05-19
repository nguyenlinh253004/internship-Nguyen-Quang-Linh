import { useState, useEffect } from 'react';
import {
  Card,
  IndexTable,
  TextField,
  Button,
  Spinner,
  Text,
  Select,
  InlineStack,
} from '@shopify/polaris';
import { json } from '@remix-run/node';
import { useActionData, Form, useNavigation, useLoaderData, useSubmit } from '@remix-run/react';
import { authenticate } from '../shopify.server';
import { useDebounce } from 'use-debounce';

export async function loader({ request }) {
  const { admin } = await authenticate.admin(request);

  const response = await admin.graphql(
    `#graphql
    query($first: Int, $sortKey: ProductSortKeys, $reverse: Boolean) {
      products(first: $first, sortKey: $sortKey, reverse: $reverse) {
        edges {
          node {
            id
            title
            createdAt
            featuredImage { url }
          }
          cursor
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
      }
    }`,
    {
      variables: {
        first: 5,
        sortKey: 'TITLE',
        reverse: false,
      },
    }
  );

  const { data, errors } = await response.json();
  if (errors) throw new Error(errors.map((e) => e.message).join(', '));

  return json({
    products: data.products.edges.map((edge) => edge.node),
    pageInfo: data.products.pageInfo,
  });
}

export async function action({ request }) {
  try {
    const { admin } = await authenticate.admin(request);
    const formData = await request.formData();

    const searchQuery = formData.get('searchQuery') || '';
    const cursor = formData.get('cursor') || null;
    const actionType = formData.get('actionType');
    const sortKey = formData.get('sortKey') || 'TITLE';
    const reverse = formData.get('reverse') === 'true';
const variables = {
  sortKey,
  reverse,
};
if (actionType === 'loadMore') {
  variables.first = 5;
  variables.after = cursor;
}
if (actionType === 'loadPrevious') {
  variables.last = 5;
  variables.before = cursor;
}
else {
      variables.first = 5; // Đặt mặc định cho search
    }
if (searchQuery) {
      variables.query = `title:*${searchQuery}*`; // Sửa cú pháp tìm kiếm
    }

const response = await admin.graphql(
      `#graphql
      query($first: Int, $last: Int, $after: String, $before: String, $query: String, $sortKey: ProductSortKeys, $reverse: Boolean) {
        products(first: $first, last: $last, after: $after, before: $before, query: $query, sortKey: $sortKey, reverse: $reverse) {
          edges {
            node {
              id
              title
              createdAt
              featuredImage { url }
            }
            cursor
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
        }
      }`,
      {
      variables
      }
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
    }

    let result;
    try {
      result = await response.json();
    } catch (jsonError) {
      throw new Error('Failed to parse API response as JSON');
    }

    const { data, errors } = result;
    if (errors) {
      throw new Error(errors.map((e) => e.message).join(', '));
    }
    if (!data || !data.products) {
      throw new Error('No products data returned from API');
    }

    return json({
      products: data.products.edges.map((edge) => edge.node),
      pageInfo: data.products.pageInfo,
      searchQuery,
      actionType,
      sortConfig: { key: sortKey, direction: reverse ? 'DESC' : 'ASC' },
    });
  } catch (error) {
    console.error('Action error:', error); // Log lỗi để debug
    return json({ error: error.message }, { status: 500 });
  }
}

export default function AdminProducts() {
  const loaderData = useLoaderData();
  const actionData = useActionData();
  const navigation = useNavigation();
  const submit = useSubmit();

  const [products, setProducts] = useState(loaderData.products || []);
  const [pageInfo, setPageInfo] = useState(
    loaderData.pageInfo || {
      hasNextPage: false,
      hasPreviousPage: false,
    }
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: 'TITLE',
    direction: 'ASC',
  });

  useEffect(() => {
    if (
   
      debouncedSearchTerm !== actionData?.searchQuery ||
      sortConfig.key !== actionData?.sortConfig?.key ||
      sortConfig.direction !== actionData?.sortConfig?.direction)
     {
      const formData = new FormData();
      formData.append('searchQuery', debouncedSearchTerm);
      formData.append('actionType', 'search');
      formData.append('sortKey', sortConfig.key);
      formData.append('reverse', sortConfig.direction === 'DESC');
      submit(formData, {
        method: 'post',
      });
     
      }
  }, [debouncedSearchTerm, sortConfig, submit]);

  useEffect(() => {
    if (actionData?.error) {
      setError(actionData.error);
    } else if (actionData) {
      setError(null);
      if (actionData.actionType === 'search') {
        setProducts(actionData.products || []);
      } else if (actionData.actionType === 'loadMore' || actionData.actionType === 'loadPrevious') {
        setProducts(actionData.products || []);
      }
      setPageInfo(
        actionData.pageInfo || {
          hasNextPage: false,
          hasPreviousPage: false,
        }
      );
      if (actionData.sortConfig) {
        setSortConfig(actionData.sortConfig);
      }
    }
  }, [actionData]);

  const isLoading = navigation.state === 'submitting';

  const rowMarkup = products.map(({ id, title, featuredImage, createdAt }, index) => (
    <IndexTable.Row id={id} key={id} position={index}>
      <IndexTable.Cell>
        {featuredImage ? <img src={featuredImage.url} alt={title} width="40" /> : 'No image'}
      </IndexTable.Cell>
      <IndexTable.Cell>{id.split('/').pop()}</IndexTable.Cell>
      <IndexTable.Cell>{title}</IndexTable.Cell>
      <IndexTable.Cell>{new Date(createdAt).toLocaleDateString()}</IndexTable.Cell>
    </IndexTable.Row>
  ));

  return (
    <Card>
      {error && (
        <div style={{ marginBottom: '16px', color: 'var(--p-color-text-critical)' }}>
          <Text variant="bodyMd" color="critical">
            Error: {error}
          </Text>
        </div>
      )}

      <InlineStack gap="400" align="space-between">
        <Form method="post">
          <TextField
            label="Search products"
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search by title..."
            autoComplete="off"
            disabled={isLoading}
          />
          <input type="hidden" name="searchQuery" value={searchTerm} />
          <input type="hidden" name="actionType" value="search" />
          <input type="hidden" name="sortKey" value={sortConfig.key} />
          <input type="hidden" name="reverse" value={sortConfig.direction === 'DESC'} />
        </Form>

        <Select
          label="Sort by"
          options={[
            { label: 'Title A-Z', value: 'TITLE-ASC' },
            { label: 'Title Z-A', value: 'TITLE-DESC' },
            { label: 'Newest', value: 'CREATED_AT-DESC' },
            { label: 'Oldest', value: 'CREATED_AT-ASC' },
          ]}
          value={`${sortConfig.key}-${sortConfig.direction}`}
          onChange={(value) => {
            const [key, direction] = value.split('-');
            console.log('key:', key, 'direction:', direction);
            setSortConfig({ key, direction });
          }}
        />
      </InlineStack>

      {isLoading && <Spinner size="small" />}

      <div style={{ marginTop: '20px' }}>
        <IndexTable
          resourceName={{ singular: 'product', plural: 'products' }}
          itemCount={products.length}
          headings={[
            { title: 'Image' },
            { title: 'ID' },
            { title: 'Title' },
            { title: 'Created At' },
          ]}
          selectable={false}
        >
          {rowMarkup}
        </IndexTable>

            <InlineStack gap="400" align="center" blockAlign="center">
        <Form method="post">
          <input type="hidden" name="searchQuery" value={searchTerm} />
          <input 
            type="hidden" 
            name="cursor" 
            value={pageInfo.hasPreviousPage ? pageInfo.startCursor : ''} 
          />
          <input type="hidden" name="actionType" value="loadPrevious" />
          <input type="hidden" name="sortKey" value={sortConfig.key} />
          <input type="hidden" name="reverse" value={sortConfig.direction === 'DESC'} />
          <Button 
            submit 
            disabled={!pageInfo.hasPreviousPage || isLoading} 
            loading={isLoading}
          >
            Previous
          </Button>
        </Form>

        <Form method="post">
          <input type="hidden" name="searchQuery" value={searchTerm} />
          <input 
            type="hidden" 
            name="cursor" 
            value={pageInfo.hasNextPage ? pageInfo.endCursor : ''} 
          />
          <input type="hidden" name="actionType" value="loadMore" />
          <input type="hidden" name="sortKey" value={sortConfig.key} />
          <input type="hidden" name="reverse" value={sortConfig.direction === 'DESC'} />
          <Button 
            submit 
            disabled={!pageInfo.hasNextPage || isLoading} 
            loading={isLoading}
          >
            Next
          </Button>
        </Form>
      </InlineStack>
      </div>
    </Card>
  );
}