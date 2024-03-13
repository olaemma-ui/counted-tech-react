import React, { ReactNode } from "react";
import appLogo from '../../../assets/COUNTED Logo 1.svg';
import { Link } from "react-router-dom";

import './style/style.css'

interface AuthenticationLayoutProps{
    children?: ReactNode,
    title?: string
}

export const AuthenticationLayout = (props : AuthenticationLayoutProps)=>{

    return (<>
      <div className="auth-body">
            <div className="max-w-[80em] bg-[#F4F4F4] overflow-y-auto max-h-[80vh] rounded-[30px] sm:p-12 p-8 mx-auto">
                {props.title && <h1 className="text-black text-4xl font-semibold mb-5"> {props.title} </h1>}
                <img src={appLogo} className="max-h-[10em] max-w-[10em]"  />
                {props.children}

                <div className="mt-5 md:flex justify-center gap-8">
                    <Link to={'/'}  className="text-black"> Datenschutzerklärung </Link>
                    <Link to={'/'} className="text-black" > Impressum </Link>

                    <Link to={'/'} className="text-black" > Support </Link>
                </div>

            </div>
      </div>
    </>);
}