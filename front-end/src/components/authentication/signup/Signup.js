import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import signUpPageImage from "../../../images/signup.svg";

export default function Signup() {
  const [formValue,setFormValue] = useState({});
  const [formResponse,setFormResponse] = useState({});
  const navigate = useNavigate();

  //input fields value 
  const formValueChange =(event)=>{
    const formValueCopy = {...formValue};
    formValueCopy[event.target.name] = event.target.value
    setFormValue(formValueCopy);
  }
  console.log(formValue);

  //form submit handle
  async function formSubmit (e){
    e.preventDefault();
    
    console.log(formValue);

    if(formValue.confirmPassword === formValue.password){
      await fetch('/auth/signup',{
      method : 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body : JSON.stringify(formValue),
     
    })
      .then((data)=>data.json())
      .then((data)=>{
        setFormResponse(data);
        if(data.message){
          return navigate('/auth/verify');
        }
      })
      .catch((err)=>{console.log(err)})
      }
    else{
      setFormResponse({
        errors :{
          confirmPassword :{
            msg : 'passwords did not mached'
          }
        } 
      })
    }
    
  }
  console.log(formResponse)
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
          {
              formResponse.errors?.common ? 
              <div className="p-4 mb-4 text-sm text-yellow-700 bg-yellow-100 rounded-lg dark:bg-yellow-200 dark:text-yellow-800" role="alert">
                <span className="font-medium">!</span> {formResponse.errors?.common?.msg }
              </div>
              : ''
            }
          {/* <!-- User name input --> */}
          <div className="mb-6">
            <input
              name="name"
              type="text"
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Full name"
              onChange={formValueChange}
              required
            />
            {
              formResponse.errors?.name ? 
              <p className="text-red-500 text-sm italic pt-5">{formResponse.errors?.name?.msg}</p>
              : ''
            }
          </div>
          {/* <!-- Email input --> */}
          <div className="mb-6">
            <input
              name="email"
              type="text"
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Email address"
              onChange={formValueChange}
              required
            />
            {
              formResponse.errors?.email ? 
              <p className="text-red-500 text-sm italic pt-5">{formResponse.errors?.email?.msg}</p>
              : ''
            }
          </div>
          {/* <!-- Mobile input --> */}
          <div className="mb-6">
            
            <input
              name="mobile"
              type="text"
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Phone number"
              onChange={formValueChange}
              required
            />
            {
              formResponse.errors?.mobile ? 
              <p className="text-red-500 text-sm italic pt-5">{formResponse.errors?.mobile?.msg}</p>
              : ''
            }
          </div>

          {/* <!-- Password input --> */}
          <div className="mb-6">
            <input
              name="password"
              type="password"
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Password"
              onChange={formValueChange}
              required
            />
            {
              formResponse.errors?.password ? 
              <p className="text-red-500 text-sm italic pt-5">{formResponse.errors?.password?.msg}</p>
              : ''
            }
          </div>
          
          {/* <!--Confirm Password input --> */}
          <div className="mb-6">
            <input
              name = 'confirmPassword'
              type="password"
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Confirm password"
              onChange={formValueChange}
            />
            {
              formResponse.errors?.confirmPassword ? 
              <p className="text-red-500 text-sm italic pt-5">{formResponse.errors?.confirmPassword?.msg}</p>
              : ''
            }
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
            <Link to='/auth/login'> Already have an account ?</Link> 
          </div>
        </form>
      </div>
    </div>
  </div>
</section>
  )
}
