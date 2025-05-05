import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, 
    ModalBody, ModalFooter, useDisclosure, Text } from '@chakra-ui/react';
  
  export default function ModalConfirm({ title = 'Xác nhận', 
    message, onConfirm, children }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    return (
      <>
        <span onClick={onOpen}>{children}</span>
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{title}</ModalHeader>
            <ModalBody>
              <Text>{message}</Text>
            </ModalBody>
            <ModalFooter>
              <Button mr={3} onClick={onClose}>Hủy</Button>
              <Button colorScheme="red" onClick={() => { onConfirm(); onClose(); }}>
                Xóa
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }