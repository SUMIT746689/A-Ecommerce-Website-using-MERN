import {useState,useEffect} from 'react'
import { useSelector } from 'react-redux';
import taka from '../../images/taka.png'
import plus from '../../images/plus.svg'
import minus from '../../images/minus.svg'

function Cart() {
    
    const [cartId,setCartId] = useState([]);
    const [cartProducts,setCartProducts] = useState();
    const [quantityDropdownShow,setQuantitydropdownShow] = useState(false);
    const [cartProductsQuantity,setCartProductsQuantity] = useState(1);

    const productsReducer = useSelector((state)=>state.productsReducer);
    const cartIdReducer = useSelector((state)=>state.cartIdReducer);

    console.log(cartIdReducer);
    

    //cart Products filter
    useEffect(()=>{
        if(productsReducer.products && cartIdReducer?.length>0){
            const products = cartIdReducer.map((cart,index)=>{
                return productsReducer.products.filter((value)=> cart.value.includes(value._id) )
            });
            setCartProducts(products);
        }
    },[cartIdReducer,productsReducer])
    

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
    console.log(cartProducts);
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

                                <div className='flex'>
                                {/* Quantity no  */}
                                    <div className='mr-6 relative'>
                                        <img src={minus} alt='minus'/>
                                        <button onClick={()=>quantityShowHandler()} id="dropdownDefault" data-dropdown-toggle="dropdown" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm my-4 px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Qty: {cartProductsQuantity} <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></button>
                                        <img src={plus} alt='plus'/>
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