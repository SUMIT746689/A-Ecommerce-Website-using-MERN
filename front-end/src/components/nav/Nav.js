import { useState,useRef } from 'react';
import { Link } from 'react-router-dom';
import style from './Nav.module.css';
import defaultUserImage from '../../images/defaultUserPhoto.svg'

export default function Nav({isAuthorized,setFetchData}) {

    const [showDropDown,setShowDropDown] = useState(false);
    const dropDownElement = useRef();

    //logout handler
    const logoutHandle = async()=>{
        await fetch ('/auth/logout',{
            method : 'POST'
        })
        .then(res=>res.json())
        .then(data=>{setFetchData((e)=>!e)})
        .catch((err)=>{console.log(err)})
    }

    const dropdownItemsHandle = ()=>{
        setShowDropDown(()=>!showDropDown);
        //showDropDown ? dropDownElement.current=dropDownElement.current + 'block' : dropDownElement.current ='hidden'
        console.log(dropDownElement)
    }

    const dropdownItems = 
    <div ref={dropDownElement} className="w-full block flex-grow lg:hidden">
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
            !isAuthorized.user ? 
                <div className="lg:flex w-20 lg:w-auto">
            
                    <Link to="/auth/login" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0 mr-3" >Login</Link>
                    <Link to="/auth/signup" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0" >Signup</Link>
                </div>
            :   
                <div className='lg:flex'>
                    <div to="/auth/login" className="flex justify-start text-sm py-2 leading-none rounded text-white  hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0 mr-3" >
                        {
                            isAuthorized.user?.avatar ?
                                <img className='border-2 rounded-full w-10' src={isAuthorized.user?.avatar} alt='userImages'/>
                            :
                                <img className='border-2 rounded-full w-10' src={defaultUserImage} alt='userImages'/>
                        }
                        <div className='ml-2 pt-3'>{isAuthorized.user?.name}</div>
                    </div> 
                    <div onClick={logoutHandle} className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-3 lg:h-8">Log out </div>
                </div>
        }
        
        </div>
    </div> ;
  return (
    <>
    <nav className="flex p lg:h-0 lg:hidden visible lg:invisible items-center justify-between flex-wrap bg-teal-500 dark:bg-gray-800 dark:text-white p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
            <span className="font-semibold text-xl tracking-tight">Total Solution</span>
        </div>
        <div className="block ">
            <button onClick={dropdownItemsHandle} className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
            </button>
        </div>
        {/* <div ref={dropDownElement} className="w-full hidden flex-grow lg:flex lg:items-center lg:w-auto">
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
                !isAuthorized.user ? 
                    <div className="lg:flex w-20 lg:w-auto">
                        <Link to="/auth/login" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0 mr-3" >Login</Link>
                        <Link to="/auth/signup" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0" >Signup</Link>
                    </div>
                :   
                    <div className='lg:flex'>
                        <div to="/auth/login" className="flex justify-start text-sm  leading-none rounded transition-all text-white hover:bg-white hover:bg-opacity-80  hover:border-transparent hover:text-teal-500 mt-4 px-2 lg:mt-0 mr-3" >
                            {isAuthorized.user?.avatar ?
                                <img className='border-2 rounded-full w-10' src={isAuthorized.user?.avatar} alt='userImages'/>
                            :
                                <img className='border-2 rounded-full w-10' src={defaultUserImage} alt='userImages'/>   
                            }
                            <div className='ml-2 pt-3'>{isAuthorized.user?.name}</div>
                        </div> 
                        <div onClick={logoutHandle} className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-1 lg:h-8">Log out </div>
                    </div>
            }
            
            </div>
        </div>  */}
        {
            showDropDown ?
            dropdownItems
        :
        ''
        }
        
    </nav>
    <aside className="hidden lg:block lg:sticky lg:left-0 lg:top-0 lg:w-64 2xl:w-80 h-screen invisible lg:visible bg-gray-50" aria-label="Sidebar">
        <div className="w-full overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800">
            <a href="https://flowbite.com" className="flex items-center pl-2.5 mb-5">
                {/* <img src="/docs/images/logo.svg" className="h-6 mr-3 sm:h-7" alt="Flowbite Logo" /> */}
                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Total Solution</span>
            </a>
            <ul className="space-y-2">
                <li>
                    <Link to='/home' className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    <svg className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                    <span className="ml-3">Home</span>
                    </Link>
                </li>
                <li>
                    <Link to='/dashboard' className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                    <span className="flex-1 ml-3 whitespace-nowrap">Dashboard</span>
                    <span className="inline-flex justify-center items-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span>
                    </Link>
                </li>
                <li>
                    <Link to='/inbox' className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
                    <span className="flex-1 ml-3 whitespace-nowrap">Inbox</span>
                    <span className="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200">3</span>
                    </Link>
                </li>
                <li>
                    <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                    <span className="flex-1 ml-3 whitespace-nowrap">Users</span>
                    </a>
                </li>
                <li>
                    <Link to="/products" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"></path></svg>
                    <span className="flex-1 ml-3 whitespace-nowrap">Products</span>
                    </Link>
                </li>
                {
                    !isAuthorized.user ? 
                    <>
                        <li>
                            <Link to='/auth/login' className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd"></path></svg>
                            <span className="flex-1 ml-3 whitespace-nowrap">Log In</span>
                            </Link>
                        </li>
                        <li>
                            <Link to='/auth/signup' className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clip-rule="evenodd"></path></svg>
                            <span className="flex-1 ml-3 whitespace-nowrap">Sign Up</span>
                            </Link>
                        </li>
                    </>
                    :
                    <>
                        <li>
                            <Link to='auth/signup' className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            {isAuthorized.user?.avatar ?
                                <img className='border-2 rounded-full w-10' src={isAuthorized.user?.avatar} alt='userImages'/>
                            :
                                <img className='border-2 rounded-full w-10' src={defaultUserImage} alt='userImages'/>   
                            }
                            <span className="flex-1 ml-3 whitespace-nowrap">{isAuthorized.user?.name}</span>
                            </Link>
                        </li>
                        <li>
                            <Link to='/auth/logout' className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clip-rule="evenodd"></path></svg>
                            <span className="flex-1 ml-3 whitespace-nowrap">Log Out</span>
                            </Link>
                        </li>
                    </>
                }
                
            </ul>
        </div>
    </aside>
    </>
  )
}
