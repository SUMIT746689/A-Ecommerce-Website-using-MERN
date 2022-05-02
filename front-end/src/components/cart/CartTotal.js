import {useEffect,useState} from 'react'


function CartTotal({cartProducts,cartIdReducer}) {
    console.log(cartProducts);
    const [cartIdArray,setCartIdArray]=useState()
    useEffect(()=>{
        if(cartIdReducer && cartIdReducer?.length>0 && cartProducts){
            
            cartProducts.map((value)=>{
                cartIdReducer.reduce((previous,current)=> [current.id,...previous] ,[])
            })
            const data = cartIdReducer.reduce((previous,current)=> [current.id,...previous] ,[])     
            console.log(data);
            setCartIdArray(data);
            data.reduce((previous,current)=> [current.id,...previous] ,[])
            // const products = productsReducer.products.filter((value)=>data.includes(value._id));
            // console.log(products)
            // setCartProducts(products);
        }
    },[cartIdReducer])
  return (
    <div>
        {
            cartProducts && cartProducts?.length >0 ? 
            ''
            :
            ''
        }
    </div>
  )
}

export default CartTotal