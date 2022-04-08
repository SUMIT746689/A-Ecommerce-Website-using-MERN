import React from 'react';
import signUpPageImage from "../../../images/signup.svg";

export default function Signup() {
  
  function formSubmit (e){
    e.preventDefault();
  }

  return (
    <section className="h-screen">
  <div className="container px-6 py-12 h-full">
    <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
      <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
        <img src={signUpPageImage}
          className="w-full"
          alt="Phone img"
        />
      </div>
      <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
      {/* this is a login  Form */}
        <form onSubmit={formSubmit}>
          <div className="mb-6 font-bold text-2xl font-serif text-blue-600 text-center ">
            Create a Account
          </div>
          {/* <!-- User name input --> */}
          <div className="mb-6">
            <input
              name="name"
              type="text"
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Full name"
            />
          </div>
          {/* <!-- Email input --> */}
          <div className="mb-6">
            <input
              name="email"
              type="text"
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Email address"
            />
          </div>
          {/* <!-- Mobile input --> */}
          <div className="mb-6">
            <input
              name="mobile"
              type="text"
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Phone number"
            />
          </div>

          {/* <!-- Password input --> */}
          <div className="mb-6">
            <input
              name="password"
              type="password"
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Password"
            />
          </div>
          
          {/* <!--Confirm Password input --> */}
          <div className="mb-6">
            <input
              type="password"
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Confirm password"
            />
          </div>


          <div className="flex justify-between items-center mb-6">
           
            
          </div>

          {/* <!-- Submit button --> */}
          <button
            type="submit"
            className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
          >
            Submit
          </button>

          <div
            className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
          >
          </div>
          <div className='text-amber-500 font-medium mb-9'>
            Already have an account ?
          </div>
        </form>
      </div>
    </div>
  </div>
</section>
  )
}
