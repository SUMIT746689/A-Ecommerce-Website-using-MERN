import {useState,useEffect} from 'react'
import { useSelector } from 'react-redux';
import taka from '../../images/taka.png'

function Cart() {
    sessionStorage.setItem('cart',JSON.stringify([{id:'mehedi',qty:5},{id:'hasan',qty:10}]))
    const [cartId,setCartId] = useState([]);
    const [cartProducts,setCartProducts] = useState();
    const [quantityDropdownShow,setQuantitydropdownShow] = useState(false);
    const [cartProductsQuantity,setCartProductsQuantity] = useState(1);

    const productsReducer = useSelector((state)=>state.productsReducer);
    const cartIdReducer = useSelector((state)=>state.cartIdReducer);

    console.log(cartIdReducer);
    const localStorageData = localStorage.getItem('cartId');
    useEffect(()=>{
        if(localStorageData){
            setCartId((data)=>[...data,localStorageData])
        }
    },[localStorageData])

    //cart Products filter
    useEffect(()=>{
        if(productsReducer.products && cartId){
            const products = productsReducer.products.filter((value)=> cartId.includes(value._id) )
            setCartProducts(products);
        }
    },[localStorageData,cartId,productsReducer])
    

    //quantity dropdown show handler
    const quantityShowHandler=(quantity=false)=>{
        console.log(quantity)
        setQuantitydropdownShow((value)=>!value);
        if(quantity) {setCartProductsQuantity(quantity)};
    }
    //delete cart item handle
    const deleteCartItemHandler =(deleteId)=>{
        console.log(deleteId);


    }
    console.log(cartId);
    //console.log(cartProducts)
  return (
      
    <>
        {
            cartProducts ? 
            <div className=' lg:max-w-6xl m-2 p-4 bg-gray-100 dark:bg-gray-700'>
                <div className=' text-gray-500 dark:text-gray-200 text-2xl font-semibold mb-4'>Shopping Cart</div>
                {
                    cartProducts.map((product)=>
                    <div key={product._id} className=''>
                        <div className='flex justify-center border-t-2 border-gray-300 my-7 '></div>
                        <div className='sm:grid grid-cols-6 gap-4 justify-center align-middle'>
                            <div className=' col-start-1 col-end-3  flex justify-center align-middle '>
                                <img className='object-cover max-h-32 md:max-h-40 my-auto' src={product.thumbnail} alt={product.title}/>
                            </div>
                            <div className='py-4 col-start-3 col-end-7'>
                                <div className='text-gray-500 dark:text-gray-200 text-sm sm:text-lg'><span className='font-semibold'>{product.title}</span><br/>{product.category}: {product.description}</div>
                                <div className={`${product.stock ? ' text-green-600' : 'text-red-600'} py-1`}>{product.stock ? 'In stock' : 'Out of stock'}</div>
                            </div>
                            <div className='col-start-3 col-end-7'>
                                <span className=' flex text-sky-500 dark:text-gray-200'>
                                    <img className=' h-5 mr-2' src={taka} alt='Taka'/>
                                    <span className='text-md'>{product.price*84 - ((product.price*84)*(product.discountPercentage))/100}
                                    </span>
                                </span>

                                {/* Quantity no Dropdown menu */}
                                <div className='flex'>
                                    <div className='mr-6 relative'>
                                        <button onClick={()=>quantityShowHandler()} id="dropdownDefault" data-dropdown-toggle="dropdown" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm my-4 px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Qty: {cartProductsQuantity} <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></button>
                                        
                                        <div className={`${quantityDropdownShow ? '' : 'hidden'} absolute max-w-fit z-10 bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700`}>
                                            <ul className="py-1 w-20 text-xs 2xl:text-sm text-gray-700 dark:text-gray-200">
                                                {
                                                    [1,2,3,4,5,6,7,8,9].map((quantity,index)=>
                                                    <li key={index}>
                                                        <span onClick={()=>quantityShowHandler(quantity)} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{quantity}</span>
                                                    </li>
                                                    )
                                                }
                                                <li>
                                                    <span  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">10 +</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div onClick={()=>deleteCartItemHandler(product._id)} className=' cursor-pointer text-xs 2xl:text-sm text-teal-700 dark:text-gray-200 border-x-2 px-6 my-auto'>
                                        Delete
                                    </div>
                                </div>
                            </div> 
                        </div>
                    </div>
                    )
                }
            </div>
            :
            ''      
        }
    </>
  )
}

export default Cart