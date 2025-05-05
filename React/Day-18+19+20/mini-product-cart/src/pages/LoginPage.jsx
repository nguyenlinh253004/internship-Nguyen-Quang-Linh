import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, Heading, Flex } from '@chakra-ui/react';
import axiosInstance from '../api/axiosInstance';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

const schema = Yup.object().shape({
  email: Yup.string().email('Email không hợp lệ').required('Bắt buộc'),
  password: Yup.string().min(6, 'Tối thiểu 6 ký tự').required('Bắt buộc'),
});

export default function LoginPage({setToken}) {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async data => {
    try {
      const res = await axiosInstance.post('/auth/login', data);
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      toast.success('Đăng nhập thành công!');
      navigate('/products'); // ✅ THÊM DÒNG NÀY để chuyển trang ngay sau login
    } catch (err) {
      toast.error(err.response?.data?.message || 'Đăng nhập thất bại');
    }
  };


  return (
    <Flex align="center" justify="center" h="100vh" bg="gray.50">
      <Box p={8} bg="white" rounded="md" w="sm" shadow="md">
        <Heading mb={6} textAlign="center">Đăng nhập</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl mb={4} isInvalid={!!errors.email}>
            <FormLabel>Email</FormLabel>
            <Input type="email" {...register('email')} />
            <Box color="red.500" mt={1}>{errors.email?.message}</Box>
          </FormControl>

          <FormControl mb={6} isInvalid={!!errors.password}>
            <FormLabel>Mật khẩu</FormLabel>
            <Input type="password" {...register('password')} />
            <Box color="red.500" mt={1}>{errors.password?.message}</Box>
          </FormControl>

          <Button
            type="submit"
            colorScheme="teal"
            w="full"
            isLoading={isSubmitting}
          >
            Đăng nhập
          </Button>
        </form>
      </Box>
    </Flex>
  );
}
