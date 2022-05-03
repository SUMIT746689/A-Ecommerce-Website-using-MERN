
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

export const cartItem = (value) =>{
    return {
        type : 'CARTITEM',
        payload : {
            ...value,
            quantity : 1
            }
    }
}
export const deleteCartItem = (value) =>{
    return {
        type : 'DELETECARTITEM',
        payload : value
    }
}

export const cartItemQuantityUpdate = (value) =>{
    return {
        type : 'CARTITEMDQUANTITYUPDATE',
        payload : value
    }
}

