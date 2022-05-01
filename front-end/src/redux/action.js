
export const user = (value)=> {
    return{ 
        type : 'USER',
        payload : value
    }
}

export const reRenderUser = ()=> {
    return{  
        type : 'RERENDER'
    }
}

export const products = (value)=> {
    return{  
        type : 'PRODUCTS',
        payload : value
    }
}

export const category = (value) =>{
    return {
        type : 'PRODUCTCATEGORY',
        payload : value
    }
}

export const cartId = (value) =>{
    return {
        type : 'CARTID',
        payload : {
            id: value,
            quantity : 1
            }
    }
}
export const cartIdQuantity = (value) =>{
    return {
        type : 'CARTIDQUANTITY',
        payload : {
            ...value
            }
    }
}
