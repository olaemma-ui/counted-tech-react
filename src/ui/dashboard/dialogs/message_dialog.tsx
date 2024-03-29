import {Modal, ModalContent, ModalHeader, ModalBody, useDisclosure, ModalFooter, Button} from "@nextui-org/react";
import { CheckedSuccessSvg } from "../../../_components/svg_components";

interface MessageDialogProps{
    onClose?: () => void,
    isOpen: boolean,
    isSuccess: boolean,
    message: string,
    buttonText: string,
    hasButton: boolean,
    onButtonPressed?: ()=> void
}

export function MessageDialog(props: MessageDialogProps) {
  const {isOpen, onOpenChange} = useDisclosure({
    isOpen: props.isOpen,
    onClose: props.onClose,
  });

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
        hideCloseButton
      >
        <ModalContent className="bg-[#FFFFFF0A]">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1"></ModalHeader>
              <ModalBody className="bg-white">
                {props.isSuccess && <CheckedSuccessSvg/>}
                <p className="text-xl text-black">
                    {props.message}
                </p>
              </ModalBody>
              
              {props.hasButton && <ModalFooter>
                <Button onPress={()=>{
                    props?.onClose();
                    props?.onButtonPressed();
                }}>
                    {props.buttonText}
                </Button>
              </ModalFooter>}

            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
