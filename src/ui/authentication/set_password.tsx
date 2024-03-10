import { Input, Button } from "@nextui-org/react";
import { AuthenticationLayout } from "./layout/layout";


export const SetPassword = ()=>{

    return (<>
            <AuthenticationLayout>
                <form className="mt-8">
                    <Input size={'sm'} type="password" label="neues Passwort" className="shadow-large rounded-3xl mb-3 bg-[#FFFFFF]" />
                    <Input size={'sm'} type="password" label="neues Passwort wiederholen" className="shadow-large rounded-3xl mb-3 bg-[#FFFFFF]" />
                    
                    <Button  className="bg-black block w-full text-white h-[50px] my-8"> Anmelden </Button>
                </form>
            </AuthenticationLayout>
    </>);
}