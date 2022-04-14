import Loader from './components/loader/Loader';
import './App.css';
import Nav from './components/nav/Nav';
import {
  BrowserRouter ,
  Routes,
  Route,
} from "react-router-dom";
import Login from './components/authentication/login/Login';
import Home from './components/home/Home';
import Signup from './components/authentication/signup/Signup';
import Products from './components/products/Products';
import ProtectedRoute from './utilities/ProtectedRoute';
import ErrorPage from './components/errorPage/ErrorPage';
import { useEffect, useState } from "react";
import Varify from './components/authentication/varify/Varify';

function App() {
    const [isAuthorized,setIsAuthorized] = useState(false);

    useEffect (()=>{
         const authentication = async()=>{
            await fetch('/isAuth')
                .then(data=>data.json())
                .then(data=>{
                  setIsAuthorized(data);
                  console.log(data);
                })
                .catch(err=>{console.log(err)})
         }
        authentication();
    },[]);
  return (
    <BrowserRouter>
      <Nav isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized}/>
      <Routes>
        <Route path='/home' element={<Home/>}/>

        <Route  path='/products' element={
          <ProtectedRoute isAuthorized={isAuthorized}>
            <Products/>
          </ProtectedRoute>
        }/>
        
        <Route path='/auth' >

          <Route path='varify' element={
            //<ProtectedRoute login='login' isAuthorized={isAuthorized}>
              <Varify isAuthorized ={isAuthorized}/>
            //</ProtectedRoute>
          }/>
          
          <Route path='login' element={
            //<ProtectedRoute login='login' isAuthorized={isAuthorized}>
              <Login setIsAuthorized={setIsAuthorized} />
            //</ProtectedRoute>
          }/>
          <Route path='signup' element={
            //<ProtectedRoute signup='signup' isAuthorized={isAuthorized}>
              <Signup/>
            //</ProtectedRoute>
          }/>
         
        </Route>
        <Route path='/' element={<Home/>}/>
        <Route path='*' element={<ErrorPage/>}/>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
