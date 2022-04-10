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

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/home' element={<Home/>}/>

        <Route  path='/products' element={
          <ProtectedRoute>
            <Products/>
          </ProtectedRoute>
        }/>
        
        <Route path='/auth' >
          <Route path='login' element={<Login/>}/>
          <Route path='signup' element={<Signup/>}/>
        </Route>
        
        <Route path='/' element={<Home/>}/>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
