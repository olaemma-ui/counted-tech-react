import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { LocalStorageService } from "../service/local_storage";
import { LocalStoragekey } from "../_constants/enums";

interface ProtectedRouteProps{
    children?: ReactNode,
}

export const ProptectedRoute = (props: ProtectedRouteProps)=>{
    const navigate = useNavigate();
    
    const  isAuthenticated = LocalStorageService.getItem(LocalStoragekey.IS_AUTHENTICATED);
    
    const url = window.location.pathname;

    console.log({isAuthenticated});
    

    if(isAuthenticated && !(url.includes('auth') || url === "/")){
        return props.children;
    }else navigate('/');

    return (<>
        {props.children }
    </>);
}