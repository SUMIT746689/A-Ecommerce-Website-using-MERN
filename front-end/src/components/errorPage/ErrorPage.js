import { Link } from 'react-router-dom';
import errorImage from '../../images/errorImage.svg';

function ErrorPage() {
    
  return (
    <section className="h-screen flex justify-center align-bottom">

        
        <div className=" flex justify-center align-middle flex-col ">
            <div className='flex justify-center align-middle w-full'>
                <div className="  w-7/12 sm:w-4/12 xl:w-3/12">
                    <img src={errorImage}
                    className="flex justify-center align-middle animate-bounce w-full  px-12 py-1 fill-blue-600"
                    alt="Error img"
                    />
                </div>
            </div>
            <div className='text-center text-6xl font-md text-blue-400 pt-6'>
               404 
            </div>
            <div className='text-center font-serif p-6 w-12/12 max-w-screen-sm'>
            <span className=' text-xl font-medium font-sans'>This Page Isn't Available</span> <br></br>
            The link may be broken, or the page may have been removed. Check to see if the link you're trying to open is correct.
            </div>
            <div className='flex justify-center align-bottom'>
                <button
                    className="border-2 border-opacity-0 hover:border-blue-600 hover:border-opacity-100  hover:bg-inherit text:text-sm sm:text-lg hover:text-blue-700 inline-block px-7 py-3 bg-blue-600 text-white font-medium leading-snug rounded shadow-md  hover:shadow-lg focus:bg-blue-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-300 active:shadow-lg transition duration-150 ease-in-out w-56"
                >
                    <Link to='/home' >
                        <span className=' text-lg sm:text-2xl font-bold text-center animate-ping'>{'<'}</span> Go HOME
                    </Link>
                </button>
            </div>

        </div>
    </section>
  )
}

export default ErrorPage