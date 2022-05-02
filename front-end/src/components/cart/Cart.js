import {useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import taka from '../../images/taka.png'
import { ReactComponent as YourSvg } from '../../images/searching-data.svg'

import { cartIdQuantity, deleteCartId } from '../../redux/action';
import { Link } from 'react-router-dom';
import CartTotal from './CartTotal';

function Cart() {
    
    const [cartProducts,setCartProducts] = useState();
    const [cartProductsQuantity,setCartProductsQuantity] = useState();

    const productsReducer = useSelector((state)=>state.productsReducer);
    const cartIdReducer = useSelector((state)=>state.cartIdReducer);

    const dispatch = useDispatch();
    console.log(cartIdReducer);
    

    //cart Products filter
    useEffect(()=>{
        if(productsReducer.products && cartIdReducer?.length>0){
            
            const data = cartIdReducer.reduce((previous,current)=> [current.id,...previous] ,[])     
            console.log(data);
            
            const products = productsReducer.products.filter((value)=>data.includes(value._id));
            console.log(products)
            setCartProducts(products);
        }
    },[cartIdReducer,productsReducer])
    

    //quantity plus minus handler
    const quantityMinusHandler =(id,stockAvailable)=>{
        console.log(id)
        const getCart = cartIdReducer.filter((value)=>value.id === id )
        
        if(getCart && getCart?.length > 0 && getCart[0].quantity >1){
            dispatch(cartIdQuantity({id,quantity:getCart[0].quantity-1}));
            console.log(getCart)
        }
    }
    const quantityPlusHandler =(id,stockAvailable)=>{
        
        const getCart = cartIdReducer.filter((value)=>value.id === id )
        
        if(getCart && getCart?.length > 0 && getCart[0].quantity < stockAvailable){
            dispatch(cartIdQuantity({id,quantity:getCart[0].quantity+1}));
            console.log(getCart)
        }
    }


    //delete cart item handle
    const deleteCartItemHandler =(deleteId)=>{
        dispatch(deleteCartId(deleteId));
        console.log(deleteId);
    }
    console.log(cartProducts);
    //console.log(cartProducts)
  return (
      
    <>
        {
            cartProducts && cartProducts?.length>0  ?
            <div className='grid gap-2'>
                <div className=' xl:max-w-4xl m-2 p-4 bg-gray-100 dark:bg-gray-700'>
                    <div className=' text-gray-500 dark:text-gray-200 text-2xl font-semibold mb-4'>Shopping Cart</div>
                    {
                        cartProducts.map((product)=>
                        <div key={product._id} className=''>
                            <div className='flex justify-center border-t-2 border-gray-300 my-7 '></div>
                            <div className='sm:grid sm:h-52 grid-rows-4 grid-cols-6 gap-4 justify-center align-middle'>
                                <div className=' row-start-1 row-end-4 col-start-1 col-end-3  flex justify-center align-middle '>
                                    <img className='object-cover max-h-48 md:max-h-56' src={product.thumbnail} alt={product.title}/>
                                </div>
                                <div className=' overflow-hidden row-start-1 row-end-3 py-4 col-start-3 col-end-7'>
                                    <div className='text-gray-500 dark:text-gray-200 text-sm sm:text-lg'><span className='font-semibold'>{product.title}</span><br/>{product.category}: {product.description}</div>
                                    <div className={`${product.stock ? ' text-green-600' : 'text-red-600'} py-1`}>{product.stock ? 'In stock' : 'Out of stock'}</div>
                                </div>
                                <div className=' sm:mt-5 row-start-3 row-end-5 col-start-3 col-end-7'>
                                    <span className=' flex text-sky-500 dark:text-gray-200'>
                                        <img className=' h-5 mr-2' src={taka} alt='Taka'/>
                                        <span className='text-md'>{product.price*84 - ((product.price*84)*(product.discountPercentage))/100}
                                        </span>
                                    </span>

                                    <div className='flex flex-wrap '>

                                    {/* Quantity no  */}
                                        <span className=' mt-6 my-auto text-lg font-semibold text-gray-700 dark:text-gray-200'>Quantity :</span>
                                        <div  className=' mt-4 overflow-x-auto ml-4 mr-6 relative fill-gray-700 dark:fill-gray-200 w-36 lg:w-40'>
                                            <div onClick={()=>quantityMinusHandler(product._id,product.stock)} className='hover:fill-gray-500 dark:fill-gray-400 absolute left-0 w-12 top-3 lg:top-4 border-r-2 px-3'>
                                                <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"><path d="M0 10h24v4h-24z"/></svg>
                                            </div>
                                            <div  className=" bg-gray-50 border border-gray-300 text-teal-600 text-lg lg:text-2xl font-bold rounded-sm focus:ring-blue-500 focus:border-blue-500 block pl-14 py-2.5 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  >
                                            {   
                                                cartIdReducer && cartIdReducer?.length >0 ?
                                                    cartIdReducer.map((data,index)=>
                                                        <span key={index}>
                                                        {
                                                        
                                                        data.id === product._id ?
                                                            data.quantity
                                                        
                                                            :
                                                            ''
                                                        }
                                                        </span>
                                                    )
                                                :
                                                ''
                                            }
                                            </div>
                                            <div onClick={()=>quantityPlusHandler(product._id,product.stock)} className='hover:fill-gray-500 dark:fill-gray-400 absolute right-0 w-12 px-3 top-3 lg:top-4 ml-2 border-l-2'  >
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>
                                            </div>
                                            
                                        </div>

                                        {/* delete cart */}
                                        <div onClick={()=>deleteCartItemHandler(product._id)} className=' mt-8 cursor-pointer text-xs md:text-sm 2xl:text-sm text-teal-700 dark:text-gray-200 border-x-2 px-6 my-auto'>
                                            Delete
                                        </div>
                                    </div>
                                </div> 
                            </div>
                        </div>
                        )
                    }
                    <div>SubTotal() : </div>
                </div>
                {/* cart Total */}
                <div className=' p-4 m-2 bg-gray-100'>
                    <CartTotal cartProducts={cartProducts} cartIdReducer={cartIdReducer} />
                </div>
            </div>
            :
            <div className='sm:flex lg:max-w-6xl m-2 p-4 bg-gray-100 dark:bg-gray-700'>
                
                <YourSvg className=' h-40 md:h-52'/>
                <div>
                    <div className='sm:mt-4 text-gray-500 dark:text-gray-200 text-2xl 2xl:text-4xl font-semibold mb-4'>Your Cart is empty</div>
                    <Link to='/products/all' className='text-teal-600 cursor-pointer'>
                        Check All products
                    </Link>
                </div>
            </div>      
        }
    </>
  )
}

export default Cart