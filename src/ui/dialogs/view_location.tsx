import React, { useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Checkbox, Input, Link, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Divider, Avatar} from "@nextui-org/react";
import { ArrowDownIcon, PencilIcon } from "../../_components/svg_components";
import { EditLocation } from "./edit_location";
import { LocationData } from "../../interface/response/dashboard_data";


interface ViewLocationProps{
    onClose?: () => void,
    isOpen: boolean,
    locationData: LocationData,
    jobTitle: string
}

export function ViewLocation(props: ViewLocationProps) {
  const {isOpen, onOpenChange} = useDisclosure({
    isOpen: props.isOpen,
    onClose: props.onClose,
  });

  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));

  const selectedValue = React.useMemo(
    () => (Array.from(selectedKeys).join(", ") as String).replaceAll("_", " "),
    [selectedKeys]
  );

  const [isEditLocationOpen, setIsEditLocationOpen] = useState(false);

  function openEditLocationModal(onClose:()=> void) {
    onClose();
    setIsEditLocationOpen(true);
  }


  return (
    <>
      {/* <Button onPress={onOpen} color="primary">Open Modal</Button> */}
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
        backdrop="blur"
        // isDismissable={false}
        size="2xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                
                <Button isIconOnly onPress={()=>{return openEditLocationModal(onClose);}} size="sm" className="bg-[#4269E1]">
                    <PencilIcon/>
                </Button>

              </ModalHeader>
              <ModalBody>
                  <Input
                    label="Location"
                    variant="flat"
                    type="text"
                    className="shadow-md rounded-xl"
                    readOnly
                    value={`${props.locationData.address}`}
                  />

                <div className="sm:flex gap-4">
                  <Input
                    label="Radius ( meter )"
                    variant="flat"
                    type="number"
                    readOnly
                    value={`${props.locationData.radius}`}
                    className="shadow-md rounded-xl mb-3"
                    // endContent={}
                  />
                  <Input
                    label="Art der Arbeit"
                    variant="flat"
                    type="text"
                    readOnly
                    value={`${props.jobTitle}`}
                    className="shadow-md rounded-xl mb-3"
                    endContent={<ArrowDownIcon width="20" height="20" className="self-end justify-self-end" />}
                  />
                </div>

                <Divider className="my-2 h-[0.12em] bg-[#4269E1]"/>

                <p className="text-black"> Preisrechnung </p>
                <div className="sm:flex gap-4 ">
                  <Input
                      label="Einheit [Menge]"
                      variant="flat"
                      type="number"
                      readOnly
                      value={`${props.locationData.calculator?.quantity ?? 0}`}
                      className="shadow-md rounded-xl mb-3"
                      // endContent={}
                    />
                  <Input
                      label="Preis pro"
                      variant="flat"
                      readOnly
                      value={`${props.locationData.calculator?.price ?? 0}`}
                      className="shadow-md rounded-xl mb-3"
                      // endContent={}
                    />
                  <Input
                      label="€ pro Stunde"
                      variant="flat"
                      readOnly
                      value={`${props.locationData.calculator?.hours ?? 0}`}
                      className="shadow-md rounded-xl mb-3"
                      // endContent={}
                    />
                </div>

                <Divider className="my-2 h-[0.12em] bg-[#4269E1]"/>

                <p className="text-black"> Datum </p>
                <div className="sm:flex gap-4 ">
                  <Input
                      label="Startdatum"
                      variant="flat"
                      type="date"
                      className="shadow-md rounded-xl mb-3"
                      isReadOnly
                      value={`${props.locationData.start_date}`}
                      />
                  <Input
                      label="Enddatum"
                      variant="flat"
                      type="date"
                      className="shadow-md rounded-xl mb-3"
                      isReadOnly
                      value={`${props.locationData.end_date}`}
                      // endContent={}
                    />
                  <Input
                      label="Erinnerung"
                      variant="flat"
                      type="date"
                      className="shadow-md rounded-xl mb-3"
                      isReadOnly
                      value={`${props.locationData.memory}`}
                      // endContent={}
                    />
                </div>
              
                <Divider className="my-2 h-[0.12em] bg-[#4269E1]"/>
                
                <div className="flex gap-4 justify-evenly">
                  <p className="text-black w-full text-start"> Startzeit </p>
                  <p className="text-black w-full text-start"> Endzeit </p>
                  <p className="text-black w-full text-start"> Wochentag </p>
                </div>
                {
                  props.locationData.timetable?.map((element) => 
                  <div className="flex gap-4 items-center">
                    <Input
                        label="Startdatum"
                        variant="flat"
                        isReadOnly
                        type="time"
                        value={element.start_time}
                        className="shadow-md rounded-xl mb-3"
                        size="sm"
                        />
                    <Input
                        label="Enddatum"
                        variant="flat"
                        type="time"
                        value={element.end_time}
                        isReadOnly
                        size="sm"
                        className="shadow-md rounded-xl mb-3"
                        />
                    <Input
                        variant="flat"
                        isReadOnly
                        type="text"
                        value={element.days}
                        size="lg"
                        className="shadow-md rounded-xl mb-3"
                      />
  
                  </div>)
                }
              
                <Divider className="my-2 h-[0.12em] bg-[#4269E1]"/>
                
                <div className="flex gap-8 justify-between">
                  <p className="text-black w-full text-start"> Pausenstart </p>
                  <p className="text-black w-full text-start"> Pausenende </p>
                  <p className="text-black w-full text-start"> Wochentag </p>
                </div>

                {
                  props.locationData.breaks?.map((element) => 
                  <div className="flex gap-4 items-center">
                    <Input
                        label="Pausenstart"
                        variant="flat"
                        isReadOnly
                        type="time"
                        value={element.start_time}
                        className="shadow-md rounded-xl mb-3"
                        size="sm"
                        />
                    <Input
                        label="Pausenende"
                        variant="flat"
                        type="time"
                        value={element.end_time}
                        isReadOnly
                        size="sm"
                        className="shadow-md rounded-xl mb-3"
                        />
                    <Input
                        variant="flat"
                        isReadOnly
                        type="text"
                        value={element.date}
                        size="lg"
                        className="shadow-md rounded-xl mb-3"
                      />
  
                  </div>)
                }
              
                <Divider className="my-2 h-[0.12em] bg-[#4269E1]"/>
                <div className="p-3 mt-3 rounded-lg text-black bg-white shadow-md">
                    <p className="text-black"> Code: {props.locationData.location_code}</p>
                </div>
                
                {/* <Divider className="my-2 h-[0.12em] bg-[#4269E1]"/>
                <div className="bg-white shadow-lg rounded-xl p-4 w-full">
                    <p className="text-black">
                        aktuelle Mitarbeiter
                    </p>
                   <div className="flex overflow-auto gap-4 mt-3">
                    <div className="flex flex-col items-center justify-center">
                        <Avatar className="w-[5em] h-[5em]" src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
                        <p className="text-black font-bold text-xl">6</p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <Avatar className="w-[5em] h-[5em]" src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
                        <p className="text-black font-bold text-xl">6</p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <Avatar className="w-[5em] h-[5em]" src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
                        <p className="text-black font-bold text-xl">6</p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <Avatar className="w-[5em] h-[5em]" src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
                        <p className="text-black font-bold text-xl">6</p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <Avatar className="w-[5em] h-[5em]" src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
                        <p className="text-black font-bold text-xl">6</p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <Avatar className="w-[5em] h-[5em]" src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
                        <p className="text-black font-bold text-xl">6</p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <Avatar className="w-[5em] h-[5em]" src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
                        <p className="text-black font-bold text-xl">6</p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <Avatar className="w-[5em] h-[5em]" src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
                        <p className="text-black font-bold text-xl">6</p>
                    </div>
                   </div>
                </div>
                <div className="bg-white shadow-lg rounded-xl p-4 w-full mt-5">
                    <p className="text-black">
                    vergangene Mitarbeiter
                    </p>
                   <div className="flex overflow-auto gap-4 mt-3">
                    <div className="flex flex-col items-center justify-center">
                        <Avatar className="w-[5em] h-[5em]" src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
                        <p className="text-black font-bold text-xl">6</p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <Avatar className="w-[5em] h-[5em]" src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
                        <p className="text-black font-bold text-xl">6</p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <Avatar className="w-[5em] h-[5em]" src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
                        <p className="text-black font-bold text-xl">6</p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <Avatar className="w-[5em] h-[5em]" src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
                        <p className="text-black font-bold text-xl">6</p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <Avatar className="w-[5em] h-[5em]" src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
                        <p className="text-black font-bold text-xl">6</p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <Avatar className="w-[5em] h-[5em]" src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
                        <p className="text-black font-bold text-xl">6</p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <Avatar className="w-[5em] h-[5em]" src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
                        <p className="text-black font-bold text-xl">6</p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <Avatar className="w-[5em] h-[5em]" src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
                        <p className="text-black font-bold text-xl">6</p>
                    </div>
                   </div>
                </div> */}
              </ModalBody>

            </>
          )}
        </ModalContent>
      </Modal>

      <EditLocation isOpen={isEditLocationOpen} onClose={()=>{setIsEditLocationOpen(false)}}  />
    </>
  );
}
