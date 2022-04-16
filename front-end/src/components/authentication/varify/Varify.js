import {useState,useEffect} from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

function Varify({setFetchData,isAuthorized}) {

    const [value,setValue] = useState([{
        one : '',
        two : '',
        three : '',
        four : '',
        five : '',
        six : ''
    }]);


    const [errors,setErrors] =useState({});
    const navigate = useNavigate()

    function otpValue (e){
        const valueData = {...value}
        valueData[e.target.name]= String(e.target.value);
        setValue(valueData);
        console.log(value)
    }

    //total input value
    let total = value.one+value.two+value.three+value.four+value.five+value.six ;
    
    console.log(total.length !== 6);

    
    async function varifyHandle(){

        //set errors null
        setErrors({});
        //check if 6 no input or not
        if(total.length !== 6) {
            return setErrors({
                errors : {
                    common : {
                        msg : 'required 6 valid input'
                    }
                }
            })
        }
        //varify otp via api call
        await fetch('/auth/varify',{
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({value :total})
        })
        .then(data=>data.json())
        .then(data=>{
            if(data.varify){
                setFetchData(true);
                navigate('/');
            }
            console.log(data);
            if(data.errors){
                setErrors(data.errors);
            }
        })
        .catch(err=>{console.log(err.message)})
        console.log('clicked');
    }

    //varify OTP resend handle
    const otpResend = async() =>{
        //set errors null
        setErrors({});
        
        //varify otp via api call
        await fetch('/auth/resendotp',{
            method : 'POST'
        })
        .then(data=>data.json())
        .then(data=>{

            if(data.errors){
                setErrors(data.errors);
            }
        })
        .catch(err=>{console.log(err.message)})

    }

    //console.log(errors)
  return (
    <div className="h-screen py-20 px-3">
        <div className="container mx-auto ">
            <div className=" rounded-lg max-w-sm mx-auto md:max-w-sm shadow-lg">
                <div className="w-full">
                    <div className="bg-white h-80 py-3 rounded text-center">
                        <h1 className="text-2xl text-sky-900 font-bold ">OTP Verification</h1>
                        <div className="flex flex-col mt-4"> <span>Enter the OTP you received at</span> <span className="font-bold">{isAuthorized.user?.mobile ? `${isAuthorized.user.mobile.slice(0,6)} . . . . . ${isAuthorized.user.mobile.slice(11)}`: ''}</span> </div>
                        {errors.common ? <div className=' text-red-600'>{`! ${errors.common.msg}`}</div> : '' } 
                        <div name="otp" className="flex flex-row justify-center text-center px-2 mt-5"> 
                            <input onChange={otpValue} className="m-2 border h-10 w-10 text-center form-control rounded hover:border-pink-500" type="text" name="one" maxLength="1"  /> 
                            <input onChange={otpValue} className="m-2 border h-10 w-10 text-center form-control rounded hover:border-pink-500" type="text" name="two" maxLength="1" /> 
                            <input onChange={otpValue} className="m-2 border h-10 w-10 text-center form-control rounded hover:border-pink-500" type="text" name="three" maxLength="1"  /> 
                            <input onChange={otpValue} className="m-2 border h-10 w-10 text-center form-control rounded hover:border-pink-500" type="text" name="four" maxLength="1" /> 
                            <input onChange={otpValue} className="m-2 border h-10 w-10 text-center form-control rounded hover:border-pink-500" type="text" name="five" maxLength="1"  /> 
                            <input onChange={otpValue} className="m-2 border h-10 w-10 text-center form-control rounded hover:border-pink-500" type="text" name="six" maxLength="1"  /> 
                        </div>
                        <button onClick={varifyHandle} type='button' className="flex mx-auto mt-4 px-6 py-1 font-medium border-2 rounded-md border-emerald-600 lg:inline-block lg:mt-0 text-teal-700 hover:text-teal-700 hover:border-teal-400 ease-in-out active:bg-slate-100">
                            Submit
                        </button>
                        <div className="flex justify-center text-center mt-5"> <button onClick={otpResend} className="flex items-center text-blue-700 hover:text-blue-900 cursor-pointer"><span className="font-bold">Resend OTP</span><i className='bx bx-caret-right ml-1'></i></button> </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Varify