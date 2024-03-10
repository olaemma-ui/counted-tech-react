import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Login } from "../ui/authentication/login";

interface ProtectedRouteProps{
    children?: ReactNode,
}

export const ProptectedRoute = (props: ProtectedRouteProps)=>{
    const navigate = useNavigate();
    
    const  isAuthenticated = localStorage.getItem("isAuthenticated");
    
    const url = window.location.pathname;


    if (url.includes('login') || url === "/") {
        if(isAuthenticated) navigate('/dashboard');
        else return props.children;
    }else{
        // if(!isAuthenticated) navigate('/');
    }

    return (<>
        {props.children }    
        {/* { isAuthenticated && props.children }    
        { !isAuthenticated && <Login/>} */}
    </>);
}