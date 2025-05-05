import React, { useState, useEffect } from 'react';
import {  Box,
  Button,
  Flex,
  Input,
  SimpleGrid,
  Spinner,
  Text,
  FormControl,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
Link } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import ModalConfirm from '../components/ModalConfirm';
import { fetchProducts, createProduct, updateProduct, deleteProduct,saveProductImage } from '../api/products';
import { useNavigate } from 'react-router-dom';
const schema = Yup.object().shape({
  name: Yup.string().required('Tên sản phẩm là bắt buộc'),
  price: Yup.number()
    .typeError('Giá phải là số')
    .positive('Giá phải lớn hơn 0')
    .required('Giá là bắt buộc'),
  stock: Yup.number()
    .typeError('Số lượng phải là số')
    .positive('Số lượng phải lớn hơn 0')
    .required('Số lượng là bắt buộc'),
  category: Yup.string().required('Danh mục là bắt buộc'),
  description: Yup.string().required('Mô tả là bắt buộc'),
  image: Yup.string()
    .url('URL ảnh không hợp lệ')
    .required('Ảnh sản phẩm là bắt buộc'),
});

export default function AdminProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productImages, setProductImages] = useState({});
  const { 
    register, 
    handleSubmit, 
    reset, 
    setValue,
    formState: { errors, isSubmitting } 
  } = useForm({ resolver: yupResolver(schema) });
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const [editingProduct, setEditingProduct] = useState(null);
  const navigate = useNavigate();
  const loadProducts = async () => {
    setLoading(true);
    try {
      const res = await fetchProducts({ limit: 100, skip: 0 });
      setProducts(res.data.data || res.data);
    } catch (error) {
      toast.error('Không tải được sản phẩm.');
      console.error('Lỗi khi tải sản phẩm:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    loadProducts(); 
  }, []);

  const onSubmit = async (data) => {
    try {
      // Tạo sản phẩm không bao gồm image (nếu API không hỗ trợ)
      const productData = {
        name: data.name,
        price: data.price,
        stock: data.stock,
        category: data.category,
        description: data.description
      };
      
      const newProduct = await createProduct(productData);
      console.log('newProduct:', newProduct); 
      // Lưu URL ảnh vào state riêng
      setProductImages(prev => ({
        ...prev,
        [newProduct.data.productId]: data.image
      }));
      // Lưu cả vào localStorage
  saveProductImage(newProduct.data.productId, data.image);
      
      toast.success('Thêm sản phẩm thành công');
      reset();
      await loadProducts();
      navigate('/products'); 
    } catch (error) {
      toast.error('Thêm sản phẩm thất bại');
      console.error('Lỗi khi thêm sản phẩm:', error);
    }
  };
// Thêm hàm getImage để lấy ảnh
const getImage = (product) => {
  // Ưu tiên lấy ảnh từ state trước
  if (productImages[product.id]) {
    return productImages[product.id];
  }
  
  // Sau đó kiểm tra localStorage
  const localImages = JSON.parse(localStorage.getItem('productImages') || '{}');
  if (localImages[product.id]) {
    return localImages[product.id];
  }
  
  // Cuối cùng dùng ảnh mặc định hoặc ảnh từ API nếu có
  return product.image || 'https://placehold.co/200x200';
};
  const onEditSubmit = async (data) => {
    try {
      await updateProduct(editingProduct.id, data);
      setProductImages(prev => ({
        ...prev,
        [editingProduct.id]: data.image,
      }));
      saveProductImage(editingProduct.id, data.image);
      toast.success('Cập nhật thành công');
      onEditClose();
      loadProducts(); 
    } catch {
      toast.error('Cập nhật thất bại');
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setValue('name', product.name);
    setValue('price', product.price);
    setValue('image', product.image);
    setValue('stock', product.stock);
    setValue('category', product.category);
    setValue('description', product.description);
    onEditOpen();
  };
  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      toast.success('Xóa sản phẩm thành công');
      await loadProducts();
    } catch (error) {
      toast.error('Xóa sản phẩm thất bại');
      console.error('Lỗi khi xóa sản phẩm:', error);
    }
  };

  return (
    <Box p={6}>
    <Flex align="center" justify="space-between" mb={6}>
      <Text fontSize="2xl" fontWeight="bold">Quản lý Sản phẩm</Text>
      <Button
      as={RouterLink}
      to="/products"
      size="sm"
      colorScheme="blue"
      variant="link"
      _hover={{ textDecoration: 'underline' }}
    >
      Quay lại trang sản phẩm
    </Button>
    </Flex>
      {/* Form thêm sản phẩm */}
      <Box mb={6} as="form" onSubmit={handleSubmit(onSubmit)}>
        <SimpleGrid columns={[1, 2, 3]} spacing={4} mb={4}>
          <Box>
            <Input placeholder="Tên sản phẩm" {...register('name')} />
            {errors.name && <Text color="red.500" fontSize="sm">{errors.name.message}</Text>}
          </Box>
          
          <Box>
            <Input placeholder="Giá" type="number" {...register('price')} />
            {errors.price && <Text color="red.500" fontSize="sm">{errors.price.message}</Text>}
          </Box>
          
          <Box>
            <Input placeholder="Số lượng" type="number" {...register('stock')} />
            {errors.stock && <Text color="red.500" fontSize="sm">{errors.stock.message}</Text>}
          </Box>
          
          <Box>
            <Input placeholder="Danh mục" {...register('category')} />
            {errors.category && <Text color="red.500" fontSize="sm">{errors.category.message}</Text>}
          </Box>
          
          <Box>
            <Input placeholder="Mô tả" {...register('description')} />
            {errors.description && <Text color="red.500" fontSize="sm">{errors.description.message}</Text>}
          </Box>
          
          <Box>
            <Input placeholder="URL ảnh" {...register('image')} />
            {errors.image && <Text color="red.500" fontSize="sm">{errors.image.message}</Text>}
          </Box>
        </SimpleGrid>
        
        <Button 
          type="submit" 
          colorScheme="blue" 
          isLoading={isSubmitting}
          loadingText="Đang thêm..."
        >
          Thêm sản phẩm
        </Button>
      </Box>

      {/* Danh sách sản phẩm */}
      {loading ? (
        <Flex justify="center">
          <Spinner size="xl" />
        </Flex>
      ) : (
        <SimpleGrid columns={[1, 2, 3, 4]} spacing={4}>
          {products.map(product => (
            <Box 
              key={product.id} 
              p={4} 
              borderWidth="1px" 
              borderRadius="md"
              boxShadow="md"
            >
              
                    <Image 
                    src={getImage(product)} 
                    alt={product.name}
                    boxSize="150px"
                    objectFit="cover"
                    mx="auto"
                    mb={2}
                    fallbackSrc="https://placehold.co/200x200"
                  />
          
              <Text fontWeight="bold" fontSize="lg">{product.name}</Text>
              <Text>Giá: {product.price?.toLocaleString()}₫</Text>
              <Text>Số lượng: {product.stock}</Text>
              
              <Flex mt={3} gap={2}>
              <Button size="sm" colorScheme="yellow" onClick={() => handleEditClick(product)}>Sửa</Button>
                
                <ModalConfirm
                  message="Bạn chắc chắn muốn xóa sản phẩm này?"
                  onConfirm={() => handleDelete(product.id)}
                >
                  <Button size="sm" colorScheme="red">Xóa</Button>
                </ModalConfirm>
              </Flex>
            </Box>
          ))}
        </SimpleGrid>
      )}
       {/* Modal Cập nhật */}
       <Modal isOpen={isEditOpen} onClose={onEditClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cập nhật sản phẩm</ModalHeader>
          <ModalBody>
            <Box as="form" id="edit-form" onSubmit={handleSubmit(onEditSubmit)}>
              <FormControl isInvalid={!!errors.name} mb={3}>
                <FormLabel>Tên</FormLabel>
                <Input {...register('name')} />
                <Text color="red.500">{errors.name?.message}</Text>
              </FormControl>
              <FormControl isInvalid={!!errors.price} mb={3}>
                <FormLabel>Giá</FormLabel>
                <Input type="number" {...register('price')} />
                <Text color="red.500">{errors.price?.message}</Text>
              </FormControl>
              <FormControl isInvalid={!!errors.stock} mb={3}>
                <FormLabel>stock</FormLabel>
                <Input type="number" {...register('stock')} />
                <Text color="red.500">{errors.stock?.message}</Text>
              </FormControl>
              <FormControl isInvalid={!!errors.image} mb={3}>
                <FormLabel>Image URL</FormLabel>
                <Input {...register('image')} />
                <Text color="red.500">{errors.image?.message}</Text>
              </FormControl>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onEditClose}>Hủy</Button>
            <Button type="submit" form="edit-form" colorScheme="blue" isLoading={isSubmitting}>
              Lưu
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}