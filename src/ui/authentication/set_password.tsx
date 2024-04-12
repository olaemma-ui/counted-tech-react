import { Input, Button } from "@nextui-org/react";
import { AuthenticationLayout } from "./layout/layout";
import { toFormData } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LocalStoragekey } from "../../_constants/enums";
import { axiosInstance } from "../../service/axios_conf";
import { LocalStorageService } from "../../service/local_storage";
import BasicDialog from "../dialogs/basic_dialog";
import { CheckedSuccessSvg } from "../../_components/svg_components";


export const SetPassword = ()=>{

    const navigate = useNavigate();

    
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [setPasswordData, setSetPasswordData] = useState({
        password: '',
        password_confirmation: '',
    });
    const email = LocalStorageService.getItem(LocalStoragekey.AUTH_EMAIL);
    const otp = LocalStorageService.getItem(LocalStoragekey.AUTH_OTP);


    async function handleOnSubmit() {
        console.log({
            token: otp,
            email: email,
            password: setPasswordData.password,
            password_confirmation: setPasswordData.password_confirmation,
        });
        
        if(setPasswordData.password && setPasswordData.password_confirmation){
            setErrorMessage('');
            setIsLoading(true);
            await axiosInstance.post(
                '/password/reset', toFormData({
                    token: otp,
                    email: email,
                    password: setPasswordData.password,
                    password_confirmation: setPasswordData.password_confirmation,
                }),
            ).then((resp) =>{
                if(resp.status == 200) setShowDialog(true);
                else setErrorMessage(resp?.message ?? '')
            })

            setIsLoading(false);
        }
    }

    if(!email || !otp) navigate('/auth/set-password');

    return (<>
            <AuthenticationLayout>
                <form className="mt-8">
                    {errorMessage &&  <div className="p-3 my-4 rounded-lg bg-red-200 text-left text-sm text-gray-800">
                        {errorMessage}
                    </div>}
                    <Input 
                        isReadOnly={isLoading} 
                        size={'sm'} 
                        type="password" 
                        label="neues Passwort" 
                        onChange={(e)=> {
                            setSetPasswordData({
                                ...setPasswordData,
                                password: e.target.value
                            })
                        }}
                        className="shadow-large rounded-3xl mb-3 bg-[#FFFFFF]" />
                    <Input 
                        isReadOnly={isLoading} 
                        size={'sm'} 
                        type="password" 
                        label="neues Passwort wiederholen" 
                        onChange={(e)=> {
                            setSetPasswordData({
                                ...setPasswordData,
                                password_confirmation: e.target.value
                            })
                        }}
                        className="shadow-large rounded-3xl mb-3 bg-[#FFFFFF]" />
                    
                    <Button 
                        isLoading={isLoading} 
                        onPress={handleOnSubmit}
                        className="bg-black block w-full text-white h-[50px] my-8"> 
                        Anmelden 
                    </Button>
                </form>
            </AuthenticationLayout>
            {showDialog && <BasicDialog
                icon={<>
                        <CheckedSuccessSvg width="100" height="100" className=" p-0 mx-auto"/>
                </>}
                message="Password reset successfully"
                onOkPress={()=>{
                    navigate('/')
                }}
                title="Success"
            />}
    </>);
}