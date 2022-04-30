import {useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { cartId } from '../../redux/action';
import ProductsRating from '../../utilities/ProductsRating';

function ProductDescription() {
    let {productId} = useParams();
    let navigate = useNavigate();
    
    const [productDescription,setProductDescription] = useState(null);
    const [changeProductImage,setChangeProductImage] =useState()

    const productsReducer = useSelector((state)=>state.productsReducer);
    const dispatch = useDispatch();
    console.log(productId);

    useEffect(()=>{
      const productDescriptionFunction = () =>{
        if(productsReducer.products && productId){
          const selectProductDescription = productsReducer.products.filter((product)=>productId === product._id);
          if(selectProductDescription.length >0){
            setProductDescription(selectProductDescription);
          }
          else{
            return  navigate('/Errors')
          }
        }
      }
      productDescriptionFunction();
    },[productId,productsReducer]);
    console.log(productDescription);

    useEffect(()=>{
      if(productDescription && productDescription[0].thumbnail) setChangeProductImage(productDescription[0].thumbnail)
    }
    ,[productDescription])

    //change Image clck on images 
    const changeImageHandler =(url) =>{
      setChangeProductImage(url);
    }

    //cart button handle
    const addCartId =(id) =>{
      dispatch(cartId(id))
    }
  return (
  <>
    {productDescription && productDescription ? 
      <div className='md:grid md:grid-cols-4'>

        {/* product title price and rating */}
        <div className='md:col-start-3 md:col-end-5 p-3 text-xl md:text-2xl xl:text-4xl font-medium text-teal-500'>
          <div className='flex  justify-between'>
            <span className='pl-0.5'>{productDescription[0].title} </span>
            
          </div>
          <div className='flex pt-2'>
            { productDescription[0].rating ?
              <ProductsRating productRating={productDescription[0].rating}/>
              :
              ''
            }
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">{productDescription[0].rating}</span>
          </div>
        </div>

        {/* product image */}
        <div className='md:col-start-1 md:col-end-3 flex justify-center align-middle'>
          <img className="py-2 md:p-8 rounded-lg w-fit object-cover" src={changeProductImage} alt={productDescription[0].title}/>
        </div>
        
        <div className='md:col-start-1 md:col-end-3 flex justify-evenly flex-wrap border'>
            {
              productDescription[0]?.images?.length >0 ? 
                productDescription[0].images.map((url,index)=>
                  <div key={index} className='rounded focus:ring-teal-800'>
                    <img onClick={()=>changeImageHandler(url)} className="py-2  h-20 lg:h-32 w-fit object-cover " src={url} alt={index}/>
                  </div>
                )
                :
                ''
            }
        </div>
        {/* productes descriptions */}
        <div className='md:row-start-2 md:col-start-3 md:col-end-5 p-4'>
          <div className='flex flex-col pt-4 text-lg font-medium'>
            <span className=' text-sky-500 line-through dark:text-gray-200'>Price : {productDescription[0].price*84} Taka</span>
            <span className=' text-teal-400 dark:text-gray-200'>Discount : {productDescription[0].discountPercentage} %</span>
            <span className=' text-sky-500 dark:text-gray-200'>New Price : <span className='text-md'>{productDescription[0].price*84 - ((productDescription[0].price*84)*(productDescription[0].discountPercentage))/100}</span> Taka</span>
          </div>
          {
            !productDescription[0]?.size ?
              <div className=' text-sm 2xl:text-2xl font-semibold'>
                <div className='text-teal-500 dark:text-gray-200 font-mono text-lg 2xl:text-2xl font-bold py-3 tracking-wide '>
                  Size
                </div>
                {['md','xl','2xl','3xl'].map((value,index)=>
                <button type='button' className=' uppercase text-gray-600 focus:text-gray-100 border-2 dark:border-gray-400 hover:border-teal-500 hover: focus:ring-4 focus:bg-teal-700 focus:ring-blue-300 font-medium rounded-lg px-10 py-2.5 lg:px-12 mr-2 mb-2 focus:outline-none dark:focus:ring-blue-800' key={index}>
                  {value}
                </button>
                )}
              </div>
            :
            ''
          }
          {productDescription[0]?.stock ?
            <div className='mt-5'>
            {
              productDescription[0]?.stock>0 ? 

              <span className="text-sm lg:text-xl bg-green-100 text-green-800 font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">Status : {productDescription[0]?.stock} items in stock</span>
              :
              <span className="text-sm lg:text-xl bg-red-100 text-red-800 font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">Status : Out of stock</span>
            }
            </div>
            :
            ''
          }
          <button onClick={()=>addCartId(productDescription[0]?._id)} type='button' className='lg:text-xl w-full text-teal-50 hover:border-teal-500 hover: focus:ring-4 bg-teal-700 focus:ring-teal-300 font-medium rounded-md px-10 py-2.5 lg:px-12 my-7 focus:outline-none dark:focus:ring-teal-800' >
            Add to cart
          </button>
          <div className='py-5'>
            <div className='text-lg 2xl:text-2xl text-teal-500 dark:text-gray-300 font-semibold py-2'>
              Description
            </div>
            <div className=' text-gray-500 dark:text-gray-400'>
              {productDescription[0]?.description ? 
                productDescription[0]?.description
                :
                ''
              }
            </div>
          </div>
        </div>

        {/* Recent Products reviews */}
        <div className='md:col-start-1 md:col-end-5 p-4 bg-gray-50 dark:bg-gray-700'>
          <div className='text-lg xl:text-2xl font-semibold text-gray-600 dark:text-gray-200'>
            Recent reviews 
          </div>
          <div className='my-10 w-full h-0.5 bg-gray-300'>
          </div>
          <div className='py-2 w-full'>
              <div className='py-4'>
                <ProductsRating productRating={4}/>
              </div>
              <div className=' xl:text-xl text-gray-700 dark:text-gray-200 font-medium py-3'>
                Title of the review
              </div>
              <div className=' xl:text-xl text-gray-500 dark:text-gray-300 text-left text-ellipsis overflow-hidden '>
                sl;adffffffaaaaaaaaaaaaaaaaaaa  aaaaaaaaa aaaaaaaa aaaaaaaaaaaaaa aaaaaaa
              </div>
          </div>
          <div className='py-3 '>
              <span className=' xl:text-xl text-gray-700 dark:text-gray-200 font-medium py-3'>
                Mehedi H
              </span>
              <span className=' border-l-2 bg: border-gray-300 mx-4'></span>
              <span className='xl:text-xl text-gray-500 dark:text-gray-300 text-left text-ellipsis overflow-hidden '>
                2022
              </span>
          </div>
        </div>
      </div>
      : ''
    }
    
  </>
  
  )
}

export default ProductDescription