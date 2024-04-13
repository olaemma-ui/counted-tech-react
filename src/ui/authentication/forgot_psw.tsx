import { Input, Button } from "@nextui-org/react";
import { AuthenticationLayout } from "./layout/layout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toFormData } from "axios";
import { LocalStoragekey } from "../../_constants/enums";
import { axiosInstance } from "../../service/axios_conf";
import { LocalStorageService } from "../../service/local_storage";

export const ForgotPassword = () => {
    const navigate = useNavigate();

    const [forgetPasswordData, setForgetPasswordData] = useState({
        email: ''
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    async function handleOnSubmit() {
        if (forgetPasswordData.email) {
            setErrorMessage('');
            setIsLoading(true);
            await axiosInstance.post(
                '/password/email', toFormData(forgetPasswordData),
            ).then((response) => {
                if (response.status == 200) {
                    LocalStorageService.setItem(LocalStoragekey.AUTH_EMAIL, forgetPasswordData.email);
                    navigate('/auth/otp-verification');
                }
                
            }).catch((ex) =>{
                setErrorMessage(ex?.message ?? '')
            })

            setIsLoading(false);
        }
    }

    return (
        <>
            <AuthenticationLayout>
                <form className="mt-8">
                    {errorMessage &&  <div className="p-3 my-4 rounded-lg bg-red-200 text-left text-sm text-gray-800">
                        {errorMessage}
                    </div>}
                    <Input
                        size={'sm'}
                        type="email"
                        label="E-Mail"
                        isReadOnly={isLoading}
                        onChange={(e) => {
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