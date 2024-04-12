import { ReactNode, useState } from "react";
import appLogo from '../../../assets/COUNTED Logo 1.svg';
import { Link } from "react-router-dom";

import './style/style.css'
import AllgemeineuDialog from "../../dialogs/allgemeine_dialog";
import DateenschuDialog from "../../dialogs/dateenschu_dialog";
import ImpersumDialog from "../../dialogs/impersum";
import { Button } from "@nextui-org/react";

interface AuthenticationLayoutProps{
    children?: ReactNode,
    title?: string
}

export const AuthenticationLayout = (props : AuthenticationLayoutProps)=>{

    
    const [impressumDialog, setImpressumDialog] = useState<boolean>(false);
    const [allgemeine, setAllgemeine] = useState<boolean>(false);
    const [dateenschu, setDateenschu] = useState<boolean>(false);



    return (<>
      <div className="auth-body">
            <div className="max-w-[80em] bg-[#F4F4F4] overflow-y-auto max-h-[80vh] rounded-[30px] sm:p-12 p-4 mx-auto">
                {props.title && <h1 className="text-black text-4xl font-semibold mb-5"> {props.title} </h1>}
                <img src={appLogo} className="max-h-[10em] max-w-[10em]"  />
                {props.children}

                <div className="mt-5 flex flex-wrap justify-center gap-8 items-center">
                    <Button onPress={()=>{
                        setDateenschu(true);
                    }} className="bg-[#F4F4F4] p-0 tex-sm text-black">
                        Datenschutzerklärung
                    </Button> 

                    <Button onPress={()=>{
                        setImpressumDialog(true);
                    }} className="bg-[#F4F4F4] p-0 text-sm text-black">
                        Impressum 
                    </Button>   

                    <Link to={'/'} className="text-black text-sm" > Support </Link>
                </div>

            </div>
      </div>

      {impressumDialog && <ImpersumDialog
            onClose={()=> {setImpressumDialog(false)}} 
            isOpen={impressumDialog} />}

        {allgemeine && <AllgemeineuDialog
            onClose={()=> {setAllgemeine(false)}} 
            isOpen={allgemeine} />}

        {dateenschu && <DateenschuDialog
            onClose={()=> {setDateenschu(false)}} 
            isOpen={dateenschu} />}

    </>);
}
