import {useState,useEffect} from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import ProductsRating from '../../utilities/ProductsRating';

function ProductDescription() {
    let {productId} = useParams();
    let navigate = useNavigate();
    
    const [productDescription,setProductDescription] = useState(null);
    const [changeProductImage,setChangeProductImage] =useState()

    const productsReducer = useSelector((state)=>state.productsReducer);
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
  return (
  <>
    <div>
      {productDescription && productDescription ? 
        <div>
          {/* product title price and rating */}
          <div className='p-3 text-lg font-medium text-teal-500'>
            <div className='flex  justify-between'>
              <span className='pl-1'>{productDescription[0].title} </span>
              <span className=' text-fuchsia-600 dark:text-gray-200'>TAKA : {productDescription[0].price}</span>
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
          <img className="py-2 md:p-8 rounded-lg w-fit object-cover" src={changeProductImage} alt={productDescription[0].title}/>
          
          <div className='flex justify-evenly flex-wrap'>
              {
                productDescription[0]?.images?.length >0 ? 
                  productDescription[0].images.map((url,index)=>
                    <div key={index} className='rounded'>
                      <img onClick={()=>changeImageHandler(url)} className="py-2  h-20 lg:h-32 w-fit object-cover" src={url} alt={index}/>
                    </div>
                  )
                  :
                  ''
              }
          </div>
          {/* productes descriptions */}
          <div className='p-4'>
            {
              !productDescription[0]?.size ?
                <div className=' text-sm lg:text-2xl font-semibold'>
                  <div className='text-teal-500 dark:text-gray-200 font-mono text-lg font-bold py-3 tracking-wide '>
                    Size
                  </div>
                  {['md','xl','2xl','3xl'].map((value,index)=>
                  <button type='button' className=' uppercase text-gray-600 focus:text-gray-100 border-2 dark:border-gray-400 hover:border-teal-500 hover: focus:ring-4 focus:bg-blue-700 focus:ring-blue-300 font-medium rounded-lg px-10 py-2.5 mr-2 mb-2 focus:outline-none dark:focus:ring-blue-800' key={index}>
                    {value}
                  </button>
                  )}
                </div>
              :
              ''
            }
            <div className=' py-5'>
              <div className='text-lg text-teal-500 dark:text-gray-300 font-semibold py-2'>
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
        </div>
        : ''
      }
      
    </div>  
  </>
  
  )
}

export default ProductDescription