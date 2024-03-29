
import {Modal, ModalContent, ModalHeader, ModalBody, useDisclosure, Avatar} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

interface ViewEmployeesProps{
    onClose?: () => void,
    isOpen: boolean,
}

export function ViewEmployees(props: ViewEmployeesProps) {
  const {isOpen, onOpenChange} = useDisclosure({
    isOpen: props.isOpen,
    onClose: props.onClose,
  });

  const navigate = useNavigate();

  return (
    <>
      {/* <Button onPress={onOpen} color="primary">Open Modal</Button> */}
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
        backdrop="blur"
        isDismissable={false}
        size="2xl"
        scrollBehavior="inside"
      >
        <ModalContent className="bg-[#FFFFFF0A]">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1"></ModalHeader>
              <ModalBody className="bg-transparent">
                
                   <div className="flex p-4 overflow-auto gap-4">
                        
                        <Avatar 
                            className="w-[4em] h-[4em] cursor-pointer" 
                            color="danger" 
                            onClick={()=> {navigate('/dashboard/employee')}}
                            isBordered  
                            src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
                        
                   </div>
                
              </ModalBody>

            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
