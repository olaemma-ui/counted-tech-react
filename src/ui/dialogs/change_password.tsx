import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";




interface ChangePasswordProps{
    onClose: ()=> void,
    isOpen: boolean,
}


export default function ChangePassword(props: ChangePasswordProps) {

    const { isOpen, onOpenChange } = useDisclosure({
        isOpen: props.isOpen,
        onClose: props.onClose,
    });


  return (
    <>
      <Modal 
       size={'sm'} 
       isOpen={isOpen} 
       isDismissable={false}
    //    hideCloseButton
       // radius="lg"
       onOpenChange={onOpenChange}
       className="rounded-[2em]"
      >
        <ModalContent>
            <ModalHeader className="flex font-semibold flex-col gap-1">
                Change Password
            </ModalHeader>
            <ModalBody>
                <Input
                    label="old Password"
                    variant="bordered"
                    type="password"
                    placeholder="Enter old password"
                />
                <Input
                    label="new Password"
                    placeholder="Enter your password"
                    type="password"
                    variant="bordered"
                />
                <Input
                    label="repeat new Password"
                    placeholder="Enter your password"
                    type="password"
                    variant="bordered"
                />
            </ModalBody>
            <ModalFooter>
            <Button className="w-full" color="primary" onPress={props.onClose}>
                Change Password
            </Button>
            </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
