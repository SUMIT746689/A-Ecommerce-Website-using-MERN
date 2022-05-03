import {useEffect,useState} from 'react'
import { useSelector } from 'react-redux';


function CartTotal({cartTotalInfo,cartItemReducer}) {

  return (
    <div>
        {
            cartItemReducer && cartItemReducer?.length >0 ? 
            <div className=' xs:text-lg xl:text-2xl font-semibold text-gray-700 dark:text-gray-200'>
                SubTotal ( <span className='text-teal-600'> Total {cartTotalInfo.subTotal} </span> ): <span className='text-teal-600'>{cartTotalInfo.totalPrice} </span> taka
                <div type='button' className='flex justify-center align-middle cursor-pointer text-xs xs:text-sm w-full text-yellow-100 hover:border-yellow-500 hover: focus:ring-4 bg-yellow-700 focus:ring-yellow-300 font-medium rounded-md px-10 py-2.5 lg:px-12 my-7 focus:outline-none dark:focus:ring-yellow-800'>
                    Proceed to checkout
                </div>
            </div>
            :
            ''
        }
        
    </div>
  )
}

export default CartTotal