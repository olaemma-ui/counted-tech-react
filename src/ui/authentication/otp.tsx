
import { Button } from "@nextui-org/react";
import { AuthenticationLayout } from "./layout/layout";

//@ts-ignore
import OTPInput from "otp-input-react";
import { useState } from "react";
import { toFormData } from "axios";
import { LocalStoragekey } from "../../_constants/enums";
import { axiosInstance } from "../../service/axios_conf";
import { LocalStorageService } from "../../service/local_storage";
import { useNavigate } from "react-router-dom";



export const OtpVerification = ()=>{
    const navigate = useNavigate();

    
    const [OTP, setOTP] = useState("");
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const email = LocalStorageService.getItem(LocalStoragekey.AUTH_EMAIL);



    const otpStyle = {
        height: '60px',
        width: '60px'
    };

    async function handleOnSubmit() {
        console.log({
            token: OTP,
            email
        });
        
        if(OTP){
            setErrorMessage('');
            setIsLoading(true);
            await axiosInstance.post(
                '/password/otp', toFormData({
                    token: OTP,
                    email
                }),
            ).then((response) =>{
                if (response.status == 200) {   
                    LocalStorageService.setItem(LocalStoragekey.AUTH_OTP, OTP);
                    navigate('/auth/set-password');
                }

            }).catch((ex) =>{
                setErrorMessage(ex?.message ?? '')
            })
            setIsLoading(false);
        }
    }

    if(!email) navigate('/auth/forget-password');


    return (<>
            <AuthenticationLayout>
                <form className="mt-8">
                    {errorMessage &&  <div className="p-3 my-4 rounded-lg bg-red-200 text-left text-sm text-gray-800">
                        {errorMessage}
                    </div>}
                    <OTPInput 
                        value={OTP} 
                        onChange={setOTP} 
                        autoFocus 
                        OTPLength={4} 
                        otpType="number" 
                        disabled={isLoading}
                        inputStyles={{...otpStyle}}
                        className="w-fit mx-auto" 
                        
                        inputClassName="rounded-lg shadow-lg text-lg font-bold text-black bg-white"
                        secur />
                    <Button 
                        isLoading={isLoading} 
                        onPress={handleOnSubmit}
                        className="bg-black block w-full text-white h-[50px] my-8"> Anmelden </Button>
                </form>
            </AuthenticationLayout>
    </>);
}