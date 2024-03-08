import { Input } from "@nextui-org/react";
import { AuthenticationLayout } from "./layout/layout";
import { Button } from "flowbite-react";

export const Login = ()=>{

    return (<>
        <>
            <AuthenticationLayout>
                <form className="mt-8">
                    <Input size={'sm'} type="email" label="Email" className="shadow-large rounded-3xl mb-3 bg-[#FFFFFF]" />
                    <Input size={'sm'} type="email" label="Email" className="shadow-large rounded-3xl mb-3 bg-[#FFFFFF]" />

                    <Button>
                    #FFFFFF
                    </Button>
                </form>
            </AuthenticationLayout>
        </>
    </>);
}