
import {Modal, ModalContent, ModalHeader, ModalBody, useDisclosure, Avatar, Spinner} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../service/axios_conf";
import { useEffect, useState } from "react";
import { Convert, EmployeeData } from "../../../interface/response/dto";

interface ViewEmployeesProps{
    onClose?: () => void,
    isOpen: boolean,
    addressId: number,
}

export function ViewEmployees(props: ViewEmployeesProps) {
  const {isOpen, onOpenChange} = useDisclosure({
    isOpen: props.isOpen,
    onClose: props.onClose,
  });

  const [employeeList, setEmployeeList] = useState<EmployeeData[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  
  async function fetchLocationEMployee () {
    setIsLoading(true);
    await axiosInstance.get(`company/employee-list?address_id=${props.addressId}`)
    .then((response) => {
      const data = response.data.data;
      const list : EmployeeData[] = [];
      
      data.forEach((element : any) => {
            list.push(Convert.toEmployeeData(JSON.stringify(element)))
        });

        setEmployeeList(data);
    }).catch((e) => e)
    setIsLoading(false);
  }


  useEffect(() => {    
    fetchLocationEMployee();
  }, [])
  

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
        <ModalContent className="bg-[#212529]">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1"></ModalHeader>
              <ModalBody className="bg-transparent">
                
                   <div className="flex p-4 overflow-auto gap-4">
                       {!employeeList && !isLoading && <p className="text-white text-lg"> An error occurred</p>}
                       {isLoading && <>
                          <Spinner size="sm"/>
                          <p className="text-whit">
                            Fetching Location Employee
                          </p>
                       </>}
                       {employeeList?.length <= 0 && !isLoading && <p className="text-white text-lg">No Employee Added</p>}
                       {employeeList?.map((employee) =>  
                        <Avatar 
                            className="w-[4em] h-[4em] cursor-pointer" 
                            color="danger" 
                            onClick={()=> {navigate('/dashboard/employee')}}
                            isBordered  
                            src={employee.image} />
                          )}
                        
                   </div>
                
              </ModalBody>

            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}


