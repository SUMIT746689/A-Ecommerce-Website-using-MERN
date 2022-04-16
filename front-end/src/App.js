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
import {PrivateRoute, ProtectedRoute} from './utilities/ProtectedRoute';
import ErrorPage from './components/errorPage/ErrorPage';
import { useEffect, useState } from "react";
import Varify from './components/authentication/varify/Varify';
import Footer from './components/footer/Footer';

function App() {
    const [isAuthorized,setIsAuthorized] = useState(false);
    const [fetchData,setFetchData] = useState(false);

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
    },[fetchData]);
  return (
    <BrowserRouter>
      <Nav isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized}/>
      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/' element={<Home/>}/>
        <Route  path='/products' element={
          <ProtectedRoute isAuthorized={isAuthorized} >
            <Products/>
          </ProtectedRoute>
        }/>
        
        <Route path='/auth' >

          <Route path='varify' element={
            <PrivateRoute isAuthorized={isAuthorized}>
              <Varify setFetchData={setFetchData} isAuthorized ={isAuthorized}/>
            </PrivateRoute>
          }/>
          
          <Route path='login' element={
            <PrivateRoute isAuthorized={isAuthorized}>
              <Login setIsAuthorized={setIsAuthorized} />
            </PrivateRoute>
          }/>
          <Route path='signup' element={
            <PrivateRoute isAuthorized={isAuthorized}>
              <Signup/>
            </PrivateRoute>
          }/>
         
        </Route>
        
        <Route path='*' element={<ErrorPage/>}/>
        
      </Routes>
      {isAuthorized ? <Footer/> : '' }
      
    </BrowserRouter>
  );
}

export default App;
