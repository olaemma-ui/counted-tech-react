import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Checkbox, Input, Link, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Divider} from "@nextui-org/react";
import { ArrowDownIcon, PencilIcon, TrashIcon } from "../../../_components/svg_components";


interface JobListProps{
    onClose?: () => void,
    isOpen: boolean,
}

export function JobList(props: JobListProps) {
  const {isOpen, onOpenChange} = useDisclosure({
    isOpen: props.isOpen,
    onClose: props.onClose,
  });

  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));

  const selectedValue = React.useMemo(
    () => (Array.from(selectedKeys).join(", ") as String).replaceAll("_", " "),
    [selectedKeys]
  );



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
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-black text-center"></ModalHeader>
              <ModalBody>
                  <Input
                    label="Location"
                    variant="flat"
                    type="text"
                    className="shadow-md rounded-xl"
                  />

                <Divider className="my-2 h-[0.12em] bg-[#4269E1] mt-5"/>
                <div className="sm:flex gap-4 ">
                  <Input
                      label="Startdatum"
                      variant="flat"
                      type="date"
                      className="shadow-md rounded-xl w-full mb-3"
                    />
                    <Button 
                    size="sm" 
                    isIconOnly 
                    className="text-3xl pb-1 text-white bg-[#4269E1]">
                        +
                  </Button>
                </div>
              
                <div className="sm:flex gap-4 ">
                  <Input
                      label="Startdatum"
                      variant="flat"
                      type="date"
                      className="shadow-md rounded-xl w-full mb-3"
                    />
                    <Button 
                    size="sm" 
                    isIconOnly 
                    className="text-3xl pb-1 text-white bg-red-600">
                        <TrashIcon width="20" height="20" />
                  </Button>
                </div>
               
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
