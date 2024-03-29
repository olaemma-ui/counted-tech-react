
import { Button } from "@nextui-org/react";
import { AuthenticationLayout } from "./layout/layout";

//@ts-ignore
import OTPInput from "otp-input-react";
import { useState } from "react";



export const OtpVerification = ()=>{
    const [OTP, setOTP] = useState("");

    const otpStyle = {
        height: '60px',
        width: '60px'
    };

    return (<>
            <AuthenticationLayout>
                <form className="mt-8">
                    <OTPInput 
                        value={OTP} 
                        onChange={setOTP} 
                        autoFocus 
                        OTPLength={4} 
                        otpType="number" 
                        disabled={false}
                        inputStyles={{...otpStyle}}
                        className="w-fit mx-auto" 
                        inputClassName="rounded-lg shadow-lg text-lg font-bold text-black bg-white"
                        secur />
                    <Button  className="bg-black block w-full text-white h-[50px] my-8"> Anmelden </Button>
                </form>
            </AuthenticationLayout>
    </>);
}