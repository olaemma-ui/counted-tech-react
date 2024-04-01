import { useEffect, useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Button, Avatar, Divider, Spinner} from "@nextui-org/react";
import { axiosInstance } from "../../service/axios_conf";
import { Convert, EmployeeData } from "../../interface/response/dto";


interface EmployerDetailsProps{
    onClose?: () => void,
    isOpen: boolean,
    // profileData: ProfileData,
}

export function EmployerDetails(props: EmployerDetailsProps) {
  const {isOpen, onOpenChange} = useDisclosure({
    isOpen: props.isOpen,
    onClose: props.onClose,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<EmployeeData>();

  
  async function fetchProfileData () {
      setIsLoading(true)
      await axiosInstance.get('company/profile')
      .then((response) => {
            const data = Convert.toEmployeeData(JSON.stringify(response.data.data));
            setProfileData(data);
        })
        setIsLoading(false)
    }

  useEffect(() => {
    fetchProfileData()
  }, [])
  
  


  return (
    <>
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
              <ModalHeader className="flex flex-col gap-1 text-black font-semibold text-center">
                Profil details
              </ModalHeader>
              <Divider/>
              <ModalBody>
                <div className="flex gap-4 mt-2 items-center">
                    <Avatar 
                        isBordered 
                        radius="lg" 
                        name={profileData?.company?.company_name}
                        className="w-[7em] h-[7em]"
                        src={profileData?.company?.logo && `${import.meta.env.VITE_COUNTEDT_TECH_COMPANY_IMAGE_URL}${profileData?.company?.logo}`} />
                    
                    {isLoading && <>
                        <p className="text-black">Fetching Details <Spinner size="sm" /></p>
                    </>}
                </div>

                <div className="flex gap-4 mb-0">
                    <p className="w-full text-black font-semibold"> Vorname: </p>
                    <p className="w-full text-black"> {profileData?.name} </p>
                </div>

                <div className="flex gap-4 mb-0">
                    <p className="w-full text-black font-semibold"> Nachname: </p>
                    <p className="w-full text-black"> {profileData?.surname} </p>
                </div>

                <div className="flex gap-4 mb-0">
                    <p className="w-full text-black font-semibold"> Firmenname: </p>
                    <p className="w-full text-black"> {profileData?.company?.company_name} </p>
                </div>

                <div className="flex gap-4 mb-0">
                    <p className="w-full text-black font-semibold"> Handynummer: </p>
                    <p className="w-full text-black"> {profileData?.company?.code} </p>
                </div>

                <div className="flex gap-4 mb-0">
                    <p className="w-full text-black font-semibold"> E-Main: </p>
                    <p className="w-full text-black"> {profileData?.email} </p>
                </div>

                <div className="flex gap-4 mb-0">
                    <p className="w-full text-black font-semibold"> Ansprechpartner: </p>
                    <p className="w-full text-black"> {profileData?.company?.contact_person} </p>
                </div>

                <div className="flex gap-4 mb-0">
                    <p className="w-full text-black font-semibold"> PLZ: </p>
                    <p className="w-full text-black"> {profileData?.company?.zipcode} </p>
                </div>

                <div className="flex gap-4 mb-0">
                    <p className="w-full text-black font-semibold"> Strasse, Nr: </p>
                    <p className="w-full text-black"> {profileData?.company?.street} </p>
                </div>

                <div className="flex gap-4 mb-0">
                    <p className="w-full text-black font-semibold"> Vorname: </p>
                    <p className="w-full text-black"> {profileData?.name} </p>
                </div>

                <div className="flex gap-4 mb-0">
                    <p className="w-full text-black font-semibold"> Ort: </p>
                    <p className="w-full text-black"> {profileData?.company?.location} </p>
                </div>

                <div className="flex gap-4 mb-0">
                    <p className="w-full text-black font-semibold"> Package: </p>
                    <p className="w-full text-black"> {
                        !isLoading &&
                        (profileData?.company?.package_id == 1 
                        ? 'Normal'
                        : profileData?.company?.package_id == 2 
                        ? 'Silber' : 'Gold')
                    } </p>
                </div>
                
              </ModalBody>
              <ModalFooter>
                <Button 
                  color="primary" 
                  className="w-full h-[4em] bg-[#4269E1]" 
                  onPress={onClose}>
                  OK
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
