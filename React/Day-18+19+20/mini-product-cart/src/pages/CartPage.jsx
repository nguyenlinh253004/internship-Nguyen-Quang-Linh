import { Box, Button, Flex, Image, Stack, Text } from '@chakra-ui/react';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { toast } from 'react-toastify';

export default function CartPage() {
  const { items, updateQty, removeItem,clearCart, totalAmount,totalItems } = useContext(CartContext);

  const handleRemove = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?')) {
      removeItem(id);
      toast.info('Đã xóa sản phẩm khỏi giỏ hàng');
    }
  };

  return (
    <Box p={6}>
      <Text fontSize="2xl" mb={4}>Giỏ hàng</Text>
      {items.length === 0 ? (
        <Text>Chưa có sản phẩm nào trong giỏ.</Text>
      ) : (
        <Stack spacing={4}>
             <Button colorScheme="red" size="sm" onClick={() => clearCart()}>
                Xóa all
              </Button>
          {items.map(item => (
            <Flex key={item.id} border="1px solid #ccc" borderRadius="md" p={4} align="center">
              <Image src={item.image} boxSize="100px" mr={4} />
              <Box flex="1">
                <Text fontWeight="bold">{item.name}</Text>
                <Text>Giá: {item.price.toLocaleString()}₫</Text>
                <Flex mt={2} align="center">
                  <Button onClick={() => updateQty(item.id,item.quantity - 1)} size="sm" mr={2}>-</Button>
                  <Text mx={2}>{item.quantity}</Text>
                  <Button onClick={() => updateQty(item.id,item.quantity +1)} size="sm" ml={2}>+</Button>
                </Flex>
              </Box>
              <Button colorScheme="red" size="sm" onClick={() => handleRemove(item.id)}>
                Xóa
              </Button>
            </Flex>
          ))}
          <Text fontSize="xl" textAlign="right" fontWeight="bold">
            Tổng tiền: {Math.ceil(totalAmount)}₫
          </Text>
          <Text fontSize="xl" textAlign="right" fontWeight="bold">
            Tổng số lượng: {(totalItems)}
          </Text>
        </Stack>
      )}
    </Box>
  );
}
