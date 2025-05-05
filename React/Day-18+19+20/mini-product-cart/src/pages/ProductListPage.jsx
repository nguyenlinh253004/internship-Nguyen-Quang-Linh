import { useEffect } from 'react';
import {
  Box, Input, SimpleGrid, Spinner, Text, Button, Flex
} from '@chakra-ui/react';
import useProducts from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function ProductListPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Đăng xuất thành công');
    navigate('/login'); // Chuyển hướng về trang login
  };

  const {
    products, loading, error,
    search, setSearch,
    page, setPage,
    totalPages
  } = useProducts({ initialSearch: '', initialPage: 1, limit: 5 });

  // Khi thay search, reset page về 1
  useEffect(() => {
    setPage(1);
  }, [search, setPage]);

  if (loading) return (
    <Flex justify="center" mt={10}><Spinner size="xl" /></Flex>
  );

  if (error) return (
    <Text color="red.500" mt={10} textAlign="center">
      Lỗi khi tải sản phẩm.
    </Text>
  );

  return (
    <Box p={6}>
      {/* Search */}
  <Flex>
  <Input
        placeholder="Tìm sản phẩm..."
        mb={6}
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
    <Button type="button" onClick={handleLogout}>Đăng xuất</Button>
  </Flex>

      {/* Grid sản phẩm */}
      {products.length === 0 ? (
        <Text textAlign="center">Không tìm thấy sản phẩm nào.</Text>
      ) : (
        <SimpleGrid columns={[1, 2, 3,4,5]} spacing={6}>
          {products.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </SimpleGrid>
      )}

      {/* Pagination */}
      <Flex justify="center" mt={8} align="center">
        <Button
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}
          mr={4}
        >
          Prev
        </Button>
        <Text>
          Trang {page} / {totalPages}
        </Text>
        <Button
          onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          ml={4}
        >
          Next
        </Button>
      </Flex>
    </Box>
  );
}
