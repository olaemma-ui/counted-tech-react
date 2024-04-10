import { Input, Button } from "@nextui-org/react";
import { AuthenticationLayout } from "./layout/layout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../../urils/validation";
import { toFormData } from "axios";
import { LocalStoragekey } from "../../_constants/enums";
import { axiosInstance } from "../../service/axios_conf";
import { LocalStorageService } from "../../service/local_storage";

export const ForgotPassword = ()=>{
    const navigate = useNavigate();

    const [forgetPasswordData, setForgetPasswordData] = useState({
        email: ''
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    function hanldEmailOnchange(element: any) {
        const emailValid = validateEmail(element.target.value);
        
        if(!emailValid){
            return setErrorMessage('Invalid email address')
        }
        setForgetPasswordData({
            email: element.target.value
        })
        setErrorMessage('')
    }

    
    async function handleOnSubmit() {
        if(forgetPasswordData.email){
            setErrorMessage('');
            setIsLoading(true);
            await axiosInstance.post(
                '/password/email', toFormData(forgetPasswordData),
            ).then(() =>{
                LocalStorageService.setItem(LocalStoragekey.AUTH_EMAIL, forgetPasswordData.email);
                navigate('/auth/otp-verification');
            })
            .catch(() => {
                setErrorMessage('Error occurred, try again')
            })

            setIsLoading(false);
        }
    }

    return (
        <>
            <AuthenticationLayout>
                <form className="mt-8">
                    {errorMessage}
                    <Input 
                        size={'sm'} 
                        type="email" 
                        label="E-Mail" 
                        isReadOnly={isLoading}
                        onChange={(e)=>{
                            setForgetPasswordData({
                                email: e.target.value
                            })
                        }}
                        className="shadow-large rounded-3xl mb-3 bg-[#FFFFFF]" />

                    
                    <Button 
                        isLoading={isLoading} 
                        onPress={handleOnSubmit}
                        className="bg-black block w-full text-white h-[50px] mt-8 my-8"> 
                        Anfragen 
                    </Button>
                </form>
            </AuthenticationLayout>
    </>);
}