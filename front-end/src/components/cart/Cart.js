import {useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import taka from '../../images/taka.png'
import plus from '../../images/plus.svg'
import minus from '../../images/minus.svg'
import { cartIdQuantity } from '../../redux/action';

function Cart() {
    
    const [cartProducts,setCartProducts] = useState();
    const [cartProductsQuantity,setCartProductsQuantity] = useState(1);

    const productsReducer = useSelector((state)=>state.productsReducer);
    const cartIdReducer = useSelector((state)=>state.cartIdReducer);

    const dispatch = useDispatch();
    console.log(cartIdReducer);
    

    //cart Products filter
    useEffect(()=>{
        if(productsReducer.products && cartIdReducer?.length>0){
            const products = cartIdReducer.map((cart,index)=>{
                return productsReducer.products.filter((value)=> cart?.id?.includes(value._id) )
            });
            setCartProducts(products);
        }
    },[cartIdReducer,productsReducer])
    

    //quantity plus minus handler
    const quantityMinusHandler =(id,stockAvailable)=>{
        const getCart = cartIdReducer.filter((value)=>value.id === id )
        console.log(getCart)
        if(getCart && getCart?.length > 0 && getCart[0].quantity >1){
            dispatch(cartIdQuantity({id,quantity:getCart[0].quantity-1}))
        }
    }
    const quantityPlusHandler =(id,quantity,stockAvailable)=>{
        
        if(cartProductsQuantity< stockAvailable ) {
            setCartProductsQuantity((value)=>value+1)
            console.log(stockAvailable)
        };
    }

    useEffect(()=>{

    },[])

    //delete cart item handle
    const deleteCartItemHandler =(deleteId)=>{
        console.log(deleteId);
    }
    console.log(cartIdReducer,cartProductsQuantity);
    //console.log(cartProducts)
  return (
      
    <>
        {
            cartProducts && cartProducts?.length>0 && cartProducts[0]?.length>0 ? 
            <div className=' lg:max-w-6xl m-2 p-4 bg-gray-100 dark:bg-gray-700'>
                <div className=' text-gray-500 dark:text-gray-200 text-2xl font-semibold mb-4'>Shopping Cart</div>
                {
                    cartProducts.map((product)=>
                    <div key={product[0]._id} className=''>
                        <div className='flex justify-center border-t-2 border-gray-300 my-7 '></div>
                        <div className='sm:grid grid-cols-6 gap-4 justify-center align-middle'>
                            <div className=' col-start-1 col-end-3  flex justify-center align-middle '>
                                <img className='object-cover max-h-32 md:max-h-40 my-auto' src={product[0].thumbnail} alt={product[0].title}/>
                            </div>
                            <div className='py-4 col-start-3 col-end-7'>
                                <div className='text-gray-500 dark:text-gray-200 text-sm sm:text-lg'><span className='font-semibold'>{product[0].title}</span><br/>{product[0].category}: {product[0].description}</div>
                                <div className={`${product[0].stock ? ' text-green-600' : 'text-red-600'} py-1`}>{product[0].stock ? 'In stock' : 'Out of stock'}</div>
                            </div>
                            <div className='col-start-3 col-end-7'>
                                <span className=' flex text-sky-500 dark:text-gray-200'>
                                    <img className=' h-5 mr-2' src={taka} alt='Taka'/>
                                    <span className='text-md'>{product[0].price*84 - ((product[0].price*84)*(product[0].discountPercentage))/100}
                                    </span>
                                </span>

                                <div className='flex mt-4'>

                                {/* Quantity no  */}
                                    <span className='text-center my-auto text-lg font-semibold text-gray-700 dark:text-gray-200'>Quantity :</span>
                                    <div  className=' ml-4 mr-6 relative fill-gray-700 dark:fill-gray-200 w-36 lg:w-40'>
                                        <div onClick={()=>quantityMinusHandler(product[0]._id,product[0].stock)} className='hover:fill-gray-500 dark:fill-gray-400 absolute left-0 w-12 top-3 lg:top-4 border-r-2 px-3'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 10h24v4h-24z"/></svg>
                                        </div>
                                        <input type="text" className="bg-gray-50 border border-gray-300 text-teal-600 text-lg lg:text-2xl font-bold rounded-sm focus:ring-blue-500 focus:border-blue-500 block pl-14 py-2.5 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled>
                                        {cartIdReducer[0][product[0]._id]?.category}
                                        </input>
                                        <div onClick={()=>quantityPlusHandler(product[0]._id,product[0].stock)} className='hover:fill-gray-500 dark:fill-gray-400 absolute right-0 w-12 px-3 top-3 lg:top-4 ml-2 border-l-2'  >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>
                                        </div>
                                    </div>

                                    {/* delete cart */}
                                    <div onClick={()=>deleteCartItemHandler(product[0]._id)} className=' cursor-pointer text-xs 2xl:text-sm text-teal-700 dark:text-gray-200 border-x-2 px-6 my-auto'>
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