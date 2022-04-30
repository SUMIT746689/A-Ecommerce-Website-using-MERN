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
import { useDispatch ,useSelector} from 'react-redux';
import { user,category,products } from './redux/action';
import ProductDescription from './components/productDescription/ProductDescription';
import Cart from './components/cart/Cart';


function App() {
  
    const dispatch = useDispatch();
    const userReducer = useSelector((state)=>state.userReducer);
    const reRenderUserReducer = useSelector((state)=>state.reRenderUserReducer);
    const productsReducer = useSelector((state)=>state.productsReducer);
    //productscetagory
    const [productsCetagory,setProductsCetagory] = useState(null);

    console.log(reRenderUserReducer);
    //for user 
    useEffect (()=>{
         const authentication = async()=>{
            await fetch('/isAuth')
                .then(data=>data.json())
                .then(data=>{
                  dispatch(user(data))
                  console.log(data);
                })
                .catch(err=>{console.log(err)})
         }
        authentication();
    },[reRenderUserReducer]);
    
    //for products
  useEffect(()=>{
    fetch('/products/',{
          method : "GET"
    })
    .then((res)=>res.json())
    .then((data)=>{
      dispatch(products(data))
    })
    .catch((err)=>{console.log(err)})
  },[])
    //for productsCetagory
    useEffect( ()=>{
      const fun =async ()=>{
          if(productsReducer.products){
              const productsReducerCategory = productsReducer.products.map((value)=>value.category);
              const uniqueCategory = new Set(productsReducerCategory);
              console.log(uniqueCategory);
              dispatch(category([...uniqueCategory]));
              setProductsCetagory([...uniqueCategory]);
          }
      }
      fun()
  },[productsReducer]);
  console.log(productsCetagory);

  return (
    <BrowserRouter>
    {/* <Loader/> */}
    <div className='lg:flex lg:justify-center lg:lign-middle m-0 p-0 b-0 dark:bg-gray-900'>
      <Nav className='lg:min-w-fit'/>
      <div className='lg:grow p-0 m-0'  >
      <Routes >
        
        <Route path='/home' element={<Home/>}/>
        <Route  path='/products'>
          
          <Route path=':category' element={<Products/>}/>
          <Route path=':category/:productId' element={<ProductDescription/>}/>
        </Route>
        <Route path='/dashboard'
            element={<Dashboard/>}
        />
        <Route path='/cart'
            element={<Cart/>}
        />
        <Route path='/auth' >
          <Route  path='forgotpassword'
            element={
              <PrivateRoute >
                <ForgotPassword />
              </PrivateRoute>
          }/>
          <Route path='verify' element={
            <PrivateRoute>
              <Verify />
            </PrivateRoute>
          }/>
          
          <Route path='login' element={
            <PrivateRoute >
              <Login />
            </PrivateRoute>
          }/>
          <Route path='signup' element={
            <PrivateRoute >
              <Signup/>
            </PrivateRoute>
          }/>
         
        </Route>
        <Route path='/' element={<Home/>}/>
        <Route path='*' element={<ErrorPage/>}/>
        
      </Routes>
      {userReducer.user ? <Footer/> : '' }
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
