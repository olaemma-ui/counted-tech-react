
import {Modal, ModalContent, ModalBody, ModalFooter, Button, Spinner} from "@nextui-org/react";
import { ReactNode } from "react";



interface ConfirmDialogProps{
    onYes: ()=> void,
    onNo: ()=> void,
    message: string,
    title?: string,
    icon?: ReactNode,
    isLoading: boolean
}


export default function ConfirmDialog(props: ConfirmDialogProps) {
  
  return (
    <>
      <Modal 
        size={'sm'} 
        isOpen 
        hideCloseButton
        // radius="lg"
        className="rounded-[2em]"
      >
        <ModalContent>
            <ModalBody className="pb-5">
                {props.icon}
                <p className="text-black text-md font-bold m-0">
                  {props.title}
                </p>
                <p className="text-black text-md">{props.message}</p>
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
