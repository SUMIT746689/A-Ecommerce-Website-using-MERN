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
import Verify from './components/authentication/verify/Verify';
import Footer from './components/footer/Footer';
import ForgotPassword from './components/authentication/forgotpassword/ForgotPassword';
import Dashboard from './components/dashboard/Dashboard';

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
    {/* <Loader/> */}
    <div className='lg:flex'>
      <Nav className='lg:w-64 2xl:w-80' isAuthorized={isAuthorized} setFetchData={setFetchData}/>
      <div className='lg:grow' >
      <Routes >
        <Route path='/home' element={<Home/>}/>
        <Route  path='/products' element={
          <ProtectedRoute isAuthorized={isAuthorized} >
            <Products/>
          </ProtectedRoute>
        }/>
        <Route path='/dashboard'
            element={<Dashboard/>}
        />
        
        <Route path='/auth' >
          <Route  path='forgotpassword'
            element={
              <PrivateRoute isAuthorized={isAuthorized}>
                <ForgotPassword setFetchData={setFetchData}/>
              </PrivateRoute>
          }/>
          <Route path='verify' element={
            <PrivateRoute isAuthorized={isAuthorized}>
              <Verify setFetchData={setFetchData} isAuthorized ={isAuthorized}/>
            </PrivateRoute>
          }/>
          
          <Route path='login' element={
            <PrivateRoute isAuthorized={isAuthorized}>
              <Login fetchData={fetchData} setFetchData={setFetchData} setIsAuthorized={setIsAuthorized} />
            </PrivateRoute>
          }/>
          <Route path='signup' element={
            <PrivateRoute isAuthorized={isAuthorized}>
              <Signup/>
            </PrivateRoute>
          }/>
         
        </Route>
        <Route path='/' element={<Home/>}/>
        <Route path='*' element={<ErrorPage/>}/>
        
      </Routes>
      {isAuthorized.user ? <Footer/> : '' }
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
