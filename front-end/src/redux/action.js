
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