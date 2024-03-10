import { Input, Button } from "@nextui-org/react";
import { AuthenticationLayout } from "./layout/layout";

export const ForgotPassword = ()=>{

    return (
        <>
            <AuthenticationLayout>
                <form className="mt-8">
                    <Input size={'sm'} type="email" label="E-Mail" className="shadow-large rounded-3xl mb-3 bg-[#FFFFFF]" />

                    
                    <Button  className="bg-black block w-full text-white h-[50px] mt-8 my-8"> Anfragen </Button>
                </form>
            </AuthenticationLayout>
    </>);
}