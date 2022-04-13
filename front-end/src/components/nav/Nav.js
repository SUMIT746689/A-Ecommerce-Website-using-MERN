import { useState,useEffect,useRef } from 'react';
import { Link } from 'react-router-dom';
import style from './Nav.module.css';

export default function Nav({isAuthorized,setIsAuthorized}) {

    const [showDropDown,setShowDropDown] = useState(false);
    const dropDownElement = useRef();

    //logout handler
    const logoutHandle = async()=>{
        await fetch ('/auth/logout',{
            method : 'POST'
        })
        .then(res=>res.json())
        .then(data=>{setIsAuthorized(false);console.log(data.status)})
        .catch((err)=>{console.log(err)})
    }

    const dropdownItemsHandle = ()=>{
        setShowDropDown(()=>!showDropDown);
        //showDropDown ? dropDownElement.current=dropDownElement.current + 'block' : dropDownElement.current ='hidden'
        console.log(dropDownElement)
        console.log()
    }

    const dropdownItems = 
    <div ref={dropDownElement} className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
        <Link to="/home" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
            Home
        </Link>
        <Link to="/products" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
            Products
        </Link>
        <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
            Blog
        </a>
        </div>
        <div>
        {   
            !isAuthorized ? 
                <div className="lg:flex w-20 lg:w-auto">
            
                    <Link to="/auth/login" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0 mr-3" >Login</Link>
                    <Link to="/auth/signup" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0" >Signup</Link>
                </div>
            :   
                <div className='lg:flex'>
                    <div to="/auth/login" className="flex justify-start text-sm py-2 leading-none rounded text-white  hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0 mr-3" >
                        <img className='border-2 rounded-full w-10' src={isAuthorized.user.avatar} alt='userImages'/>
                        <div className='ml-2 pt-3'>{isAuthorized.user.name}</div>
                    </div> 
                    <div onClick={logoutHandle} className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-3 lg:h-8">Log out </div>
                </div>
        }
        
        </div>
    </div> ;
  return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
            <span className="font-semibold text-xl tracking-tight">Total Solution</span>
        </div>
        <div className="block lg:hidden">
            <button onClick={dropdownItemsHandle} className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
            </button>
        </div>
        <div ref={dropDownElement} className="w-full hidden flex-grow lg:flex lg:items-center lg:w-auto">
            <div className="text-sm lg:flex-grow">
            <Link to="/home" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                Home
            </Link>
            <Link to="/products" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                Products
            </Link>
            <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
                Blog
            </a>
            </div>
            <div>
            {   
                !isAuthorized ? 
                    <div className="lg:flex w-20 lg:w-auto">
                
                        <Link to="/auth/login" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0 mr-3" >Login</Link>
                        <Link to="/auth/signup" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0" >Signup</Link>
                    </div>
                :   
                    <div className='lg:flex'>
                        <div to="/auth/login" className="flex justify-start text-sm py-2 leading-none rounded text-white  hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0 mr-3" >
                            <img className='border-2 rounded-full w-10' src={isAuthorized.user.avatar} alt='userImages'/>
                            <div className='ml-2 pt-3'>{isAuthorized.user.name}</div>
                        </div> 
                        <div onClick={logoutHandle} className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-3 lg:h-8">Log out </div>
                    </div>
            }
            
            </div>
        </div> 
        {
            showDropDown ?
            dropdownItems
        :
        ''
        }
        
    </nav>
  )
}
