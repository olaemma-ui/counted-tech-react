import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Checkbox, Input, Link, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Divider} from "@nextui-org/react";
import { ArrowDownIcon, PencilIcon } from "../../_components/svg_components";


interface EditLocationProps{
    onClose?: () => void,
    isOpen: boolean,
}

export function EditLocation(props: EditLocationProps) {
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
              <ModalHeader className="flex flex-col gap-1">
              </ModalHeader>
              <ModalBody>
                  <Input
                    label="Location"
                    variant="flat"
                    type="text"
                    className="shadow-md rounded-xl"
                  />

                <div className="sm:flex gap-4">
                  <Input
                    label="Radius"
                    variant="flat"
                    type="number"
                    className="shadow-md rounded-xl mb-3"
                    // endContent={}
                  />
                    <Dropdown showArrow>
                      <DropdownTrigger>

                        <div className={`p-4 flex items-center gap-2 justify-between rounded-xl h-[4em] ${selectedValue? 'text-black': 'text-gray-500 text-sm font-normal'} shadow-md w-full text-left `}>
                          {selectedValue ? selectedValue : 'Art der Arbeit'}
                          <ArrowDownIcon width="20" height="20" className="self-end justify-self-end" />
                        </div>
                      </DropdownTrigger>
                      <DropdownMenu 
                        aria-label="Single selection example"
                        variant="flat"
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={selectedKeys}
                        //@ts-ignore
                        onSelectionChange={setSelectedKeys}
                      >
                        <DropdownItem key="text" className="text-black">Text</DropdownItem>
                        <DropdownItem key="number" className="text-black">Number</DropdownItem>
                        <DropdownItem key="date" className="text-black">Date</DropdownItem>
                        <DropdownItem key="single_date" className="text-black">Single Date</DropdownItem>
                        <DropdownItem key="iteration" className="text-black">Iteration</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>

                </div>

                <Divider className="my-2 h-[0.12em] bg-[#4269E1]"/>

                <p className="text-black"> Datum </p>
                <div className="sm:flex gap-4 ">
                  <Input
                      label="Startdatum"
                      variant="flat"
                      type="date"
                      className="shadow-md rounded-xl mb-3"
                      // endContent={}
                    />
                  <Input
                      label="Enddatum"
                      variant="flat"
                      type="date"
                      className="shadow-md rounded-xl mb-3"
                      // endContent={}
                    />
                  <Input
                      label="Erinnerung"
                      variant="flat"
                      type="date"
                      className="shadow-md rounded-xl mb-3"
                      // endContent={}
                    />
                </div>
              
                <Divider className="my-2 h-[0.12em] bg-[#4269E1]"/>
                
                <div className="flex gap-4 justify-evenly">
                  <p className="text-black"> Startzeit </p>
                  <p className="text-black"> Endzeit </p>
                  <p className="text-black"> Wochentag </p>
                </div>

                <div className="flex gap-4 items-center">
                  <Input
                      label="Startdatum"
                      variant="flat"
                      type="time"
                      className="shadow-md rounded-xl mb-3"
                      size="sm"
                    />
                  <Input
                      label="Enddatum"
                      variant="flat"
                      type="time"
                      size="sm"
                      className="shadow-md rounded-xl mb-3"
                    />
                  <Input
                      label="Erinnerung"
                      variant="flat"
                      type="time"
                      size="sm"
                      className="shadow-md rounded-xl mb-3"
                    />
                    <Checkbox defaultSelected size="lg"/>

                </div>

                <Button size="sm" isIconOnly className="text-3xl pb-1 text-white bg-[#4269E1]">
                  +
                </Button>
                <Divider className="my-2 h-[0.12em] bg-[#4269E1]"/>
                
                <div className="flex gap-16 justify-between max-w-[18em]">
                  <p className="text-black"> Pausenstart </p>
                  <p className="text-black"> Pausenende </p>
                </div>

                <div className="flex gap-4 items-center">
                  <Input
                      label="Startdatum"
                      variant="flat"
                      type="time"
                      className="shadow-md rounded-xl mb-3"
                      size="sm"
                    />
                  <Input
                      label="Enddatum"
                      variant="flat"
                      type="time"
                      size="sm"
                      className="shadow-md rounded-xl mb-3"
                    />
                  <Input
                      label="Erinnerung"
                      variant="flat"
                      type="text"
                      size="sm"
                      className="shadow-md rounded-xl mb-3"
                    />
                    {/* <Checkbox defaultSelected size="lg"/> */}

                </div>
              
              </ModalBody>
              <ModalFooter>
                <Button color="primary" className="w-full bg-[#4269E1]" onPress={onClose}>
                  speichern
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
