import { Input, Button } from "@nextui-org/react";
import { AuthenticationLayout } from "./layout/layout";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { LoginRequest } from "../../interface/request/auth_request";
import { validateEmail, validatePassword } from "../../urils/validation";
import { axiosInstance, toFormData } from "../../service/axios_conf";
import { LoginResponseConvert } from "../../interface/response/login_response";
import { LocalStorageService } from "../../service/local_storage";
import { LocalStoragekey } from "../../_constants/enums";


export const Login = ()=>{

    const navigate = useNavigate();

    const [loginData, setLoginData] = useState<LoginRequest>({});

    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    const [errorMessage, setErrorMessage] = useState<string>('');

    const [error, setError] = useState({
        email: '', password: ''
    });


    function hanldEmailOnchange(element: any) {
        const emailValid = validateEmail(element.target.value);
        
        if(!emailValid){
            return setError({
                ...error,
                email: 'Invalid email address',
            })
        }
        setLoginData({
            ...loginData,
            email: element.target.value
        })
        setError({
            ...error,
            email: '',
        })
    }

    function hanldPasswordOnchange(element: any) {
        setLoginData({
            ...loginData,
            password: element.target.value
        })
    }

    async function handleOnSubmit() {
        
        if(loginData.email && loginData.password){
            setErrorMessage('');
            setIsLoading(true);
            await axiosInstance.post(
                '/company-login', toFormData(loginData),
            ).then((response) =>{
                console.log(response.data);
                
                if(typeof(response.data) === typeof('')) setErrorMessage(response.data);
                else {
                    var loginResp = LoginResponseConvert.toLoginResponse(JSON.stringify(response.data));

                    if (loginResp.status) {
                        LocalStorageService.setItem(LocalStoragekey.IS_AUTHENTICATED, true);
                        LocalStorageService.setItem(LocalStoragekey.BEARER_TOKEN, loginResp.user?.token);
                        navigate('/dashboard');
                    }else setErrorMessage(loginResp.message ??  'Status [Not active]');
                }

            })
            .catch((error) => {
                setErrorMessage('Error occurred, try again')
            })

            setIsLoading(false);
        }
    }

    return (<>
        <>
            <AuthenticationLayout>
                <div className="mt-8">
                    {errorMessage && <div className="text-left text-red-500 mb-5 p-4 rounded-lg bg-red-200">
                        {errorMessage}
                    </div>}
                    <Input 
                        size={'sm'} 
                        type="email" 
                        label="E-Mail" 
                        name="email"
                        isReadOnly = {isLoading}
                        onChange={hanldEmailOnchange}
                        classNames={{
                            inputWrapper: `${error.email && 'border border-red-600'}`
                        }}
                        className="shadow-large rounded-3xl" />
                    <small className="text-red-500 block mb-3 pl-3 text-left">
                        {error.email}
                    </small>
                    <Input 
                        size={'sm'} 
                        type="password" 
                        label="Passwort" 
                        name="passord"
                        isReadOnly = {isLoading}
                        onChange={hanldPasswordOnchange}
                        classNames={{
                            inputWrapper: `${error.password && 'border border-red-600'}`
                        }}
                        className="shadow-large rounded-3xl bg-[#FFFFFF]" />
                    <small className="text-red-500 block mb-3 pl-3 text-left">
                        {error.password}
                    </small>

                    <Link to="" className="text-black mb-5 mt-3 block w-full text-right"> Passwort vergessen </Link>
                    <Button onPress={handleOnSubmit} isLoading={isLoading} className="bg-black block w-full text-white h-[50px]"> Anmelden </Button>
                </div>
            </AuthenticationLayout>
        </>
    </>);
}