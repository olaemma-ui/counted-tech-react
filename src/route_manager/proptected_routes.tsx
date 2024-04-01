import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps{
    children?: ReactNode,
}

export const ProptectedRoute = (props: ProtectedRouteProps)=>{
    const navigate = useNavigate();
    
    const  isAuthenticated = localStorage.getItem("isAuthenticated");
    
    const url = window.location.pathname;

    if(isAuthenticated && !(url.includes('auth') || url === "/")){
        return props.children;
    }else navigate('/');

    return (<>
        {props.children }
    </>);
}