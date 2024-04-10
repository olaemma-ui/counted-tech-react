
import {Modal, ModalContent, ModalBody, ModalFooter, Button, Spinner} from "@nextui-org/react";
import { ReactNode } from "react";



interface BasicDialogProps{
    onOkPress: ()=> void,
    message: string,
    title?: string,
    icon?: ReactNode,
}


export default function BasicDialog(props: BasicDialogProps) {
  
  return (
    <>
      <Modal 
        size={'sm'} 
        isOpen 
        hideCloseButton
        placement="center"
        // radius="lg"
        className="rounded-[2em]"
      >
        <ModalContent>
            <ModalBody className="pb-5 text-center">
                {props.icon}
                <p className="text-black text-md font-bold m-0">
                  {props.title}
                </p>
                <p className="text-black text-md">{props.message}</p>
            </ModalBody>
            
            <ModalFooter>
                <Button color="primary" radius="full" className="w-full h-[4em]" onPress={props.onOkPress}>
                    Ok
                </Button>
            </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
