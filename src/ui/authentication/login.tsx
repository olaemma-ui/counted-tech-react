import { Input, Button } from "@nextui-org/react";
import { AuthenticationLayout } from "./layout/layout";
import { Link } from "react-router-dom";


export const Login = ()=>{

    return (<>
        <>
            <AuthenticationLayout>
                <form className="mt-8">
                    <Input size={'sm'} type="email" label="E-Mail" className="shadow-large rounded-3xl mb-3 bg-[#FFFFFF]" />
                    <Input size={'sm'} type="password" label="Passwort" className="shadow-large rounded-3xl mb-3 bg-[#FFFFFF]" />
                    <Link to="" className="text-black mb-5 mt-3 block w-full text-right"> Passwort vergessen </Link>
                    <Button  className="bg-black block w-full text-white h-[50px]"> Anmelden </Button>
                </form>
            </AuthenticationLayout>
        </>
    </>);
}