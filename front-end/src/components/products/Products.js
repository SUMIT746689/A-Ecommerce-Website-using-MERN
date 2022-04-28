import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { products } from "../../redux/action"
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import Loader from "../loader/Loader";


function Products() {

    const dispatch = useDispatch();
    const ratingArray = [1,2,3,4,5];
    const [displayProducts,setDisplayProducts]=useState([]);
    let navigate = useNavigate();
    const productsReducer = useSelector((state)=>state.productsReducer);
    
    let {category} = useParams();
    
    console.log(category);
    
    useEffect(()=>{
        if(productsReducer.products){
            setDisplayProducts(productsReducer.products)
        }   
    },[productsReducer,category==='all'])
    
    
    //product category 
    const productCategoryReducer = useSelector((state)=>state.productCategoryReducer);
    
    useEffect(()=>{
        if(!productCategoryReducer.includes(category) && category && category !== 'all' ){ 
            setDisplayProducts([]);
            return  navigate(`${category}`)
        };
        if(productCategoryReducer.includes(category) && productsReducer.products){
            const data= productsReducer.products.filter((value,index)=> value.category === category);
            console.log(data);
            setDisplayProducts(data);
        }
    },[category,productsReducer])
    
    // if(category && productCategoryReducer.find(category)){

    // }
    console.log(displayProducts);
    
    


    return(
        <>
        <div className="grid gap-0.5  md:gap-1 lg:gap-2 mt-4 mb-4 px-0.5 md:px-1 grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
            {displayProducts ?
        
                displayProducts.map((product)=>
            
            <div key={product._id} className="max-w-sm bg-white rounded-sm lg:rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                <Link to={`/products/${category}/${product._id}`} className="flex justify-center align-middle h-64">
                    <img className="py-2 md:p-8 rounded-t-lg w-fit object-cover" src={product.thumbnail} alt={product.title}/>
                </Link>
                <div className="px-5 pb-5">
                    <a href="#">
                        <h5 className="text-sm lg:text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                            {`${product.description.slice(0,25)} ...`}
                        </h5>
                    </a>
                    <div className="flex items-center mt-2.5 mb-5">
                        {product?.rating ? 
                            <div className="flex">
                            {
                            
                            ratingArray.map((value)=>

                                <div key={value}>
                                    {
                                        value <=Math.round(product.rating) ?
                                        <svg className="w-5 h-5 fill-yellow-500  " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                        :
                                        <svg className="w-5 h-5 fill-yellow-100 dark:fill-yellow-50" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    }
                                    
                                </div>
                                    
                            )
                            }    
                            </div>
                            
                            :
                            ''
                        
                        }
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">{product.rating}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text:md lg:text-xl font-bold text-gray-900 dark:text-white"> Taka : {product.price *80}</span>
                        <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-sm lg:rounded-lg text-sm px-2 py-1 lg:px-5 lg:py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a>
                    </div>
                </div>
            </div>
            )
            :
            <Loader/>
            }
        </div>
        </>
    )
}

export default Products