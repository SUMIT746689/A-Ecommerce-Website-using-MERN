
import { Navigate, Route, useNavigate } from "react-router-dom";


export function ProtectedRoute({children,isAuthorized}) {

    return isAuthorized ? children : <Navigate to="/auth/login" />;
  
}

export function PrivateRoute({children,isAuthorized}){
    console.log(isAuthorized)
    return isAuthorized ? <Navigate to="/"/> : children ;
}