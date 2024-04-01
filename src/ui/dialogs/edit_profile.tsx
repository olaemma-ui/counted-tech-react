import React, { useEffect, useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Checkbox, Input, Link, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Divider} from "@nextui-org/react";
import { ArrowDownIcon } from "../../_components/svg_components";
import { Employee, EmployeeData } from "../../interface/response/dto";
import { LocationData, LocationDataConvert } from "../../interface/response/dashboard_data";
import { axiosInstance } from "../../service/axios_conf";
import { toFormData } from "axios";
import { toast, Bounce, ToastContainer } from "react-toastify";


interface EditProfileProps{
    onClose?: () => void,
    isOpen: boolean,
    employeeData: EmployeeData,
}

export function EditProfile(props: EditProfileProps) {
  const {isOpen, onOpenChange} = useDisclosure({
    isOpen: props.isOpen,
    onClose: props.onClose,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [employeeData, setEmployeeData] = useState<EmployeeData>(props.employeeData);
  const [locationDataList, setLocationDataList] = useState<LocationData[]>([]);

  
  async function fetchLocationData () {
    await axiosInstance.get('company/location')
    .then((response) => {
        const data = response.data.data;
        const list : LocationData[] = [];

        
        
        data.forEach((element : any) => {
          list.push(LocationDataConvert.toLocationData(JSON.stringify(element)))
        });
        console.log({list});
        setLocationDataList(list);
    })
  }

  useEffect(() => {
    fetchLocationData()
  }, [])
  

  
  const selectedValue = React.useMemo(
    () => {
      const key = (Array.from(selectedKeys).join(", ") as String).replaceAll("_", " ");
      console.log({key});
      
      return locationDataList?.find((location) =>  location.id.toString() == key);
    },
    [selectedKeys]
  );



  function handleLicenceClick(params:string) {
    if (params == 'ja') {
        setEmployeeData({
          ...employeeData,
          employee: {
            ...employeeData.employee,
            license: '1'
          }
        });
        
        return;
      } else  setEmployeeData({
        ...employeeData,
        employee: {
          ...employeeData.employee,
          license: '0'
        }
      })
  }

  async function handleSubmit() {
    setIsLoading(true);
    await axiosInstance.post(`company/employee-update/${employeeData.id}`, toFormData({
      // id: employeeData.id,
      name: employeeData?.name,
      surname: employeeData?.surname,
      personal_number: employeeData?.employee?.personal_number,
      license: employeeData?.employee?.license,
      phone: employeeData.phone,
      address_id: selectedValue?.id ?? employeeData?.employee.address_id,
    }))
    .then((response) => {
      if (response.data.status) {
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      }
      else toast.error(response?.data?.message ?? 'Error occurred', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      props.onClose();
    })

    setIsLoading(false);
  }
  


  return (
    <>
       <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
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
                    value={employeeData?.name}
                    className="shadow-md rounded-xl mb-3"
                    onChange={(e) => {
                      setEmployeeData({
                        ...employeeData,
                        name: e.target.value,
                      })
                    }}
                  />

                  <Input
                    label="Nachname"
                    variant="flat"
                    type="text"
                    value={employeeData?.surname}
                    className="shadow-md rounded-xl mb-3"
                    onChange={(e) => {
                      setEmployeeData({
                        ...employeeData,
                        surname: e.target.value,
                      })
                    }}
                  />
                  
                  <Input
                    label="Telefonnumer"
                    variant="flat"
                    type="text"
                    value={employeeData?.phone}
                    className="shadow-md rounded-xl mb-3"
                    onChange={(e) => {
                      setEmployeeData({
                        ...employeeData,
                        phone: e.target.value,
                      })
                    }}
                  />

                  <Input
                    label="Personalnummer"
                    variant="flat"
                    type="number"
                    value={employeeData?.employee?.personal_number}
                    className="shadow-md rounded-xl mb-3"
                    onChange={(e) => {
                      setEmployeeData({
                        ...employeeData,
                        employee: {
                          ...employeeData.employee,
                          personal_number: e.target.value
                        }
                      })
                    }}
                  />


                  <p className=" text-black">Führerschein </p>
                  <div className="flex gap-8">
                    <div 
                      id="ja" 
                      onClick={() => {
                        handleLicenceClick('ja');
                      }}
                      className={`w-full shadow-md rounded-xl cursor-pointer text-black flex items-center justify-center  bg-white h-[3em] border 
                                ${employeeData?.employee?.license == '1' ? 'border-[#2E4BA4]' : ''}`}>
                      Ja
                    </div>
                    <div 
                      id="nein" 
                      onClick={() => {
                        handleLicenceClick('nein');
                      }}
                      className={`w-full shadow-md rounded-xl cursor-pointer text-black flex items-center justify-center  bg-white h-[3em] border 
                                ${employeeData?.employee?.license == '0' ? 'border-[#2E4BA4]' : ''}`}>
                      Nein
                    </div>
                  </div>

                  <p className=" text-black mt-3">Bauvorrhaben </p>
                  <Dropdown showArrow>
                      <DropdownTrigger>

                          <div className={`p-4 flex items-center gap-2 justify-between rounded-xl h-[4em] text-black shadow-md w-full text-left `}>
                          {selectedValue?.address ? selectedValue.address : employeeData?.employee?.address?.address}
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
                        onSelectionChange={setSelectedKeys}>
                          {
                            locationDataList?.map((location) => <DropdownItem 
                                key={location?.id} 
                                className="text-black">{location?.address}
                              </DropdownItem>)
                          }
                      </DropdownMenu>
                    </Dropdown>
                  
              
              </ModalBody>
              <ModalFooter>
                <Button 
                  color="primary" 
                  className="w-full h-[4em] bg-[#4269E1]" 
                  isLoading={isLoading}
                  onPress={handleSubmit}>
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
