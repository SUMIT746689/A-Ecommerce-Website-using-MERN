
import { Navigate, Route, useNavigate } from "react-router-dom";


export function ProtectedRoute({children,isAuthorized}) {

    return isAuthorized.user ? children : <Navigate to="/auth/login" />;
  
}

export function PrivateRoute({children,isAuthorized}){
    console.log(isAuthorized)
    return isAuthorized.user ? <Navigate to="/"/> : children ;
}