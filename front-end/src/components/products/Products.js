import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { cartId, products } from "../../redux/action"
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import Loader from "../loader/Loader";
import ProductsRating from "../../utilities/ProductsRating";


function Products() {

    const [displayProducts,setDisplayProducts]=useState([]);
    const [carts,setCarts]=useState([]);

    let navigate = useNavigate();

    const dispatch = useDispatch();
    const productsReducer = useSelector((state)=>state.productsReducer);
    const cartIdReducer = useSelector((state)=>state.cartIdReducer);

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

    //add to cart handle
    const addCartId =(id) =>{
        dispatch(cartId(id));
      }

    //already cart or not
    useEffect(()=>{
        if(cartIdReducer?.length>0 && cartIdReducer[0] !==null ){
            const data = cartIdReducer.reduce((previous,current)=> [current.id,...previous] ,[])
            setCarts(data);
        }
        
      },[cartIdReducer])

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
                    <div>
                        <h5 className="text-sm lg:text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                            {`${product.description.slice(0,25)} ...`}
                        </h5>
                    </div>
                    <div className="flex items-center mt-2.5 mb-5">
                        {product?.rating ? 
                            <ProductsRating productRating={product.rating}/>
                            :
                            ''
                        
                        }
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">{product.rating}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text:md lg:text-xl font-bold text-gray-900 dark:text-white"> Taka : {product.price *80}</span>
                        {
                            carts ?
                                carts.includes(product._id) ?
                                    <Link to='/cart' className=" cursor-pointer text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-sm lg:rounded-lg text-sm px-2 py-1 lg:px-5 lg:py-2.5 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800">Added into cart</Link>
                                    :
                                    <div onClick={()=>addCartId(product._id)} className=" cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-sm lg:rounded-lg text-sm px-2 py-1 lg:px-5 lg:py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</div>
                            :
                            ''
                        }
                        
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