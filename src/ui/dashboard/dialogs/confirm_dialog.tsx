import React from "react";
import {Modal, ModalContent, ModalBody, ModalFooter, Button, useDisclosure, Spinner} from "@nextui-org/react";



interface ConfirmDialogProps{
    onYes: ()=> void,
    onNo: ()=> void,
    message: string,
    isLoading: boolean
}


export default function ConfirmDialog(props: ConfirmDialogProps) {
  
  return (
    <>
      <Modal 
        size={'sm'} 
        isOpen 
        hideCloseButton
      >
        <ModalContent>
            <ModalBody className="pb-5">
                <p className="text-black text-lg">{props.message}</p>
                {props.isLoading && <Spinner/>}
            </ModalBody>
            {!props.isLoading && <ModalFooter>
                <Button color="danger" variant="light" onPress={props.onNo}>
                    No
                </Button>
                <Button color="primary" onPress={props.onYes}>
                    Yes
                </Button>
            </ModalFooter>}
        </ModalContent>
      </Modal>
    </>
  );
}
