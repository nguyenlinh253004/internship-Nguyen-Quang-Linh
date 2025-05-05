import { Box, Image, Text, Button, Stack } from '@chakra-ui/react';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
export default function ProductCard({ product }) {
  const { id, name, price, image } = product;
  const { addItem } = useContext(CartContext);
  const navigate = useNavigate();
  const onAdd = () => {
    addItem({ id, name, price, image, quantity: 1 });
    toast.success(`Đã thêm "${name}" vào giỏ hàng`);
    navigate('/cart')
  };
  const getImage = () => {
    return product.image || 'https://placehold.co/200x200';
  };
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
      <Image 
        src={getImage()} 
        alt={product.name} 
        boxSize="200px" 
        objectFit="cover" 
        mx="auto" 
      />
      <Stack mt={4} spacing={2}>
        <Text fontWeight="bold">{name}</Text>
        <Text>Giá: {price.toLocaleString()}₫</Text>
        <Button colorScheme="teal" onClick={onAdd}>
          Thêm vào giỏ
        </Button>
      </Stack>
    </Box>
  );
}
