import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";


function ProtectedRoute({children}) {
    const [isAuthorized,setIsAuthorized] = useState(true);
    useEffect(()=>{
         const authentication = async()=>{
            await fetch('/isAuth')
                .then(data=>data.json())
                .then(data=>{setIsAuthorized(data)})
                .catch(err=>{console.log(err)})
         }
        authentication();
    },[]);
    if(!isAuthorized){
        return <Navigate to='/auth/login' replace />
    }else{
        return children
    }
  
}

export default ProtectedRoute