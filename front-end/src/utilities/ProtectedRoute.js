
import { Navigate, useNavigate } from "react-router-dom";


function ProtectedRoute({isAuthorized,login,children,signup}) {
    

    console.log('value' , isAuthorized, login)
    console.log(!isAuthorized) ;

    if(isAuthorized === false){
        return <Navigate to='/auth/login' replace />
    }
    else if(isAuthorized === true && login === 'login' ){
        return <Navigate to='/home' replace />
    }
    else{
        return children
    }
  
}

export default ProtectedRoute