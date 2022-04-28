import React from 'react'
import { useParams } from 'react-router-dom'

function ProductDescription() {
    let {productId} = useParams();
    console.log(productId);
  return (
    
    <div className=' text-7xl'>ProductDescription</div>
  )
}

export default ProductDescription