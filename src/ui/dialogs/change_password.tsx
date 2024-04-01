import React, { useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";
import { toFormData } from "axios";
import { toast, Bounce, ToastContainer } from "react-toastify";
import { axiosInstance } from "../../service/axios_conf";
import { validateFields } from "../../urils/validation";




interface ChangePasswordProps{
    onClose: ()=> void,
    isOpen: boolean,
}


export default function ChangePassword(props: ChangePasswordProps) {

    const { isOpen, onOpenChange } = useDisclosure({
        isOpen: props.isOpen,
        onClose: props.onClose,
    });

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [chnagePassword, setChangePassword] = useState({
        new_password: '',
        current_password: '',
        confirm_new_password: '',
    });

    const [error, setError] = useState({
        new_password: '',
        current_password: '',
        confirm_new_password: '',
    });



    async function handleChangePassword() {
        const valid = isValid();

        if(valid){
            setIsLoading(true);

            await axiosInstance.post(`change-password`, toFormData(chnagePassword))
            .then((response) => {
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
            }).catch((e) => e)

            setIsLoading(false);
        }
    }

    
    function handleOnchange(type: string, value: string | File, label: string, key: string) {
        
        if(key == 'confirm_new_password' && (chnagePassword.new_password != value || chnagePassword.new_password)){
            if(chnagePassword.new_password != value){
                error[key] = 'Password missmatch';
                setError({...error})
            }
        }
        else {
            const valid = validateFields(type, value, label);
            
            if(valid !== true){
                error[key] = valid;
                setError({...error})
                return;
            }
            chnagePassword[key] = value;
            setChangePassword({...chnagePassword})
            error[key] = '';
            setError({...error})
        }
    }


    function isValid(){
        let valid : boolean = true;
        Object.entries(error).forEach(([key , value]) => {
            if (value || chnagePassword[key].length <= 0){
                valid = false;
            }
        });
        return valid;
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
                    onChange={(e)=>{
                        handleOnchange(
                            'phone', 
                            e.target.value, 
                            'Old password', 
                            'current_password'
                        )
                    }}
                />
                <Input
                    label="new Password"
                    placeholder="Enter your password"
                    type="password"
                    variant="bordered"
                    onChange={(e)=>{
                        handleOnchange(
                            'phone', 
                            e.target.value, 
                            'New Password', 
                            'new_password'
                        )
                    }}
                />
                <Input
                    label="repeat new Password"
                    placeholder="Enter your password"
                    type="password"
                    variant="bordered"
                    onChange={(e)=>{
                        handleOnchange(
                            'phone', 
                            e.target.value, 
                            'New Password confirmation', 
                            'confirm_new_password'
                        )
                    }}
                />
            </ModalBody>
            <ModalFooter>
            <Button 
                className="w-full" 
                isLoading={isLoading} 
                color="primary" 
                onPress={handleChangePassword}>
                Change Password
            </Button>
            </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
