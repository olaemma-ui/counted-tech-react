import React, { ReactNode } from "react";
import appLogo from '../../../assets/COUNTED Logo 1.svg';
import { Link } from "react-router-dom";


interface AuthenticationLayoutProps{
    children?: ReactNode,
}

export const AuthenticationLayout = (props : AuthenticationLayoutProps)=>{

    return (<>
        <div className="max-w-[70em] bg-[#F4F4F4] rounded-[30px] sm:p-12 p-8 mx-auto">

            <img src={appLogo} className="max-h-[10em] max-w-[10em]"  />
            {props.children}

            <div className="mt-3 md:flex gap-8">
                <Link to={'/'}  className="text-black"> Datenschutzerklärung </Link>
                <Link to={'/'} className="text-black" > Impressum </Link>

                <Link to={'/'} className="text-black" > Support </Link>
            </div>

        </div>
    </>);
}