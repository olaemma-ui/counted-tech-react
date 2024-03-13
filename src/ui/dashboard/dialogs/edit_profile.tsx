import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Checkbox, Input, Link, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Divider} from "@nextui-org/react";
import { ArrowDownIcon } from "../../../_components/svg_components";


interface EditProfileProps{
    onClose?: () => void,
    isOpen: boolean,
}

export function EditProfile(props: EditProfileProps) {
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
        // size="2xl"
        scrollBehavior="inside"

      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-black text-center">
                Profil bearbeiten
              </ModalHeader>
              <ModalBody>
                  <Input
                    label="Vorname"
                    variant="flat"
                    type="text"
                    className="shadow-md rounded-xl mb-3"
                  />

                  <Input
                    label="Nachname"
                    variant="flat"
                    type="text"
                    className="shadow-md rounded-xl mb-3"
                    // endContent={}
                  />
                  
                  <Input
                    label="Telefonnumer"
                    variant="flat"
                    type="text"
                    className="shadow-md rounded-xl mb-3"
                  />

                  <Input
                    label="Personalnummer"
                    variant="flat"
                    type="number"
                    className="shadow-md rounded-xl mb-3"
                    // endContent={}
                  />


                  <p className=" text-black">Führerschein </p>
                  <div className="flex gap-8">
                    <div className="w-full shadow-md rounded-xl cursor-pointer text-black flex items-center justify-center  bg-white h-[3em] border border-[#2E4BA4]">
                      Ja
                    </div>
                    <div className="w-full bg-white h-[3em] cursor-pointer shadow-md text-black flex items-center justify-center rounded-xl border">
                      Nein
                    </div>
                  </div>

                  <p className=" text-black mt-3">Bauvorrhaben </p>
                  <Dropdown showArrow>
                      <DropdownTrigger>

                        <div className={`p-4 flex items-center gap-2 justify-between rounded-xl h-[4em] ${selectedValue? 'text-black': 'text-gray-500 text-sm font-normal'} shadow-md w-full text-left `}>
                          {selectedValue ? selectedValue : 'Bauvorrhaben'}
                          <ArrowDownIcon width="20" height="20" className="self-end justify-self-end" />
                        </div>
                      </DropdownTrigger>
                      <DropdownMenu 
                        aria-label="Single selection example"
                        variant="flat"
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={selectedKeys}
                        onSelectionChange={setSelectedKeys}
                      >
                        <DropdownItem key="text" className="text-black">Text</DropdownItem>
                        <DropdownItem key="number" className="text-black">Number</DropdownItem>
                        <DropdownItem key="date" className="text-black">Date</DropdownItem>
                        <DropdownItem key="single_date" className="text-black">Single Date</DropdownItem>
                        <DropdownItem key="iteration" className="text-black">Iteration</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  
              
              </ModalBody>
              <ModalFooter>
                <Button color="primary" className="w-full h-[4em] bg-[#4269E1]" onPress={onClose}>
                  bearbeiten
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
