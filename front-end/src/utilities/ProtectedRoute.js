
import { useSelector } from "react-redux";
import { Navigate, Route, useNavigate } from "react-router-dom";


export function ProtectedRoute({children}) {
    const userReducer = useSelector((state)=>state.userReducer);
    return userReducer?.user ? children : <Navigate to="/auth/login" />;
  
}

export function PrivateRoute({children,isAuthorized}){
    console.log(isAuthorized)
    return isAuthorized?.user ? <Navigate to="/"/> : children ;
}