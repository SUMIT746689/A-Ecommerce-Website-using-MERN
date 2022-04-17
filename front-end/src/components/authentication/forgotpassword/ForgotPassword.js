import {useState} from 'react'
import { useNavigate } from 'react-router-dom';

function ForgotPassword({setFetchData}) {

const [forgotpasswordNumber,setFogotPasswordNumber] = useState('');
const [forgotpasswordNumberError,setFogotPasswordNumberError] = useState('');
const [optGenarateSuccess,setOptGenarateSuccess] = useState(false);

const [mobile,setMobile] = useState('');
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


//handle input forgot password number
const forgotpasswordNumberhandle = (e)=>{
    setFogotPasswordNumber(e.target.value)
}

//sending forgot password verifacation in server
const sendForgotPasswordVerification = async() =>{
    
    //set errors default
    setFogotPasswordNumberError('');

    //if number correct then send data
    if(!isNaN(Number(forgotpasswordNumber)) && forgotpasswordNumber.length ===11){
        await fetch('/auth/forgotpassword',
        {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({mobile :'+88'+forgotpasswordNumber})
        })
        .then(data=>data.json())
        .then(data=>{
            console.log(data);
            if(data.message){
                setOptGenarateSuccess(data);
            }
            if(data.errors){
                setFogotPasswordNumberError(data.errors);
            }
        })
        .catch(err=>{console.log(err)})
    }
    else{
        setFogotPasswordNumberError({
            common : {
                msg : 'Input 11 digit valid BD number'
            }
        })
    }
}

console.log(optGenarateSuccess)
// otp values gets from inputs
function otpValue (e){
    const valueData = {...value}
    valueData[e.target.name]= String(e.target.value);
    setValue(valueData);
    console.log(value)
}

//total input value
let total = value.one+value.two+value.three+value.four+value.five+value.six ;

console.log(total.length !== 6);

//otp verify handle
async function varifyHandle(){

    //set errors null
    setErrors({});
    //check if 6 no input or not
    if(total.length !== 6) {
        return setErrors({
            common : {
                msg : 'required 6 valid input'
            }
        })
    }

    //varify otp via api call
    await fetch('/auth/forgotpassword/otpverify',{
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({value :total})
    })
    .then(data=>data.json())
    .then(data=>{
        if(data.verify){
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

  return (
    <div className="h-screen py-20 px-3">
        <div className="container mx-auto ">
            <div className=" rounded-lg  max-w-sm mx-auto md:max-w-sm shadow-lg">
                <div className="w-full">
                    <div className="bg-white min-h-80 h-fit py-3 rounded text-center flex flex-col justify-center align-middle">
                        <h1 className="text-2xl text-sky-900 font-bold ">Account Reset Password</h1>
                        {
                            !optGenarateSuccess.message ?
                                <div className="mb-4 mt-6 px-4">
                                    <label className=" block text-gray-700 text-md font-bold mb-2" htmlFor="username">
                                        Mobile
                                    </label>
                                    {forgotpasswordNumberError.common ? <div className=' text-red-600 mb-4'>{`! ${forgotpasswordNumberError.common.msg}`}</div> : '' } 
                                    {forgotpasswordNumberError.mobile ? <div className=' text-red-600 mb-4'>{`! ${forgotpasswordNumberError.mobile.msg}`}</div> : '' } 
                            
                                    <div className='relative'>
                                        <input onChange={forgotpasswordNumberhandle} className="shadow appearance-none border rounded w-full pl-14 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Input mobile number"/>
                                        <p className='absolute top-2 left-2 pr-2 text-md font-bold text-stone-600 border-r-2'>+88</p>
                                    </div>
                                    <button onClick={sendForgotPasswordVerification} type='button' className="flex mx-auto mt-4 px-6 py-1 font-medium border-2 rounded-md border-emerald-600 lg:inline-block lg:mt-0 text-teal-700 hover:text-teal-700 hover:border-teal-400 ease-in-out active:bg-slate-100">
                                        Send verification
                                    </button>
                                </div>
                                :
                                ''
                        }

                        {
                            optGenarateSuccess.message ?
                            <>
                                {optGenarateSuccess.user?.mobile ? <div className='mt-3 font-semibold text-cyan-400 text-lg'>{optGenarateSuccess.user.mobile}</div> : ''}
                                {errors.common ? <div className=' text-red-600'>{`! ${errors.common.msg}`}</div> : '' } 
                                <div name="otp" className="grid grid-cols-6 md:gap-4 align-middle justify-center text-center mt-5"> 
                                    <input onChange={otpValue} className="m-2 border h-8 w-8 md:h-10 md:w-10 text-center form-control rounded hover:border-pink-500 text-teal-600 font-medium" type="text" name="one" maxLength="1"   /> 
                                    <input onChange={otpValue} className="m-2 border h-8 w-8 md:h-10 md:w-10 text-center form-control rounded hover:border-pink-500 text-teal-600 font-medium" type="text" name="two" maxLength="1"   /> 
                                    <input onChange={otpValue} className="m-2 border h-8 w-8 md:h-10 md:w-10 text-center form-control rounded hover:border-pink-500 text-teal-600 font-medium" type="text" name="three" maxLength="1" /> 
                                    <input onChange={otpValue} className="m-2 border h-8 w-8 md:h-10 md:w-10 text-center form-control rounded hover:border-pink-500 text-teal-600 font-medium" type="text" name="four" maxLength="1"  /> 
                                    <input onChange={otpValue} className="m-2 border h-8 w-8 md:h-10 md:w-10 text-center form-control rounded hover:border-pink-500 text-teal-600 font-medium" type="text" name="five" maxLength="1"  /> 
                                    <input onChange={otpValue} className="m-2 border h-8 w-8 md:h-10 md:w-10 text-center form-control rounded hover:border-pink-500 text-teal-600 font-medium" type="text" name="six" maxLength="1"   /> 
                                </div>
                                <button onClick={varifyHandle} type='button' className="flex mx-auto mt-4 px-6 py-1 font-medium border-2 rounded-md border-emerald-600 lg:inline-block lg:mt-0 text-teal-700 hover:text-teal-700 hover:border-teal-400 ease-in-out active:bg-slate-100">
                                    Submit
                                </button>
                                <div className="flex justify-center text-center mt-5"> <button onClick={otpResend} className="flex items-center text-blue-700 hover:text-blue-900 cursor-pointer"><span className="font-bold">Resend OTP</span><i className='bx bx-caret-right ml-1'></i></button> </div> 
                                </>
                            :
                            ''
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ForgotPassword