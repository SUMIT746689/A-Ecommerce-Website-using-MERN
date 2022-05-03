
const initialState=0 ;

export const userReducer = (state=initialState,action)=>{

    switch(action.type){
        case 'USER' :
            state = action.payload;
            return state ;
            
        
        default : return state ;
    }
}

export const reRenderUserReducer = (state=false,action)=>{
    switch(action.type){
        case 'RERENDER' :
            return !state ;

        default : return state ;
    }
}

export const productsReducer = (state=[],action)=>{
    switch(action.type){
        case 'PRODUCTS' :
            state = action.payload;
            return state ;

        default : return state ;
    }
}

export const productCategoryReducer = (state=[],action)=>{
    switch(action.type){
        case 'PRODUCTCATEGORY' :
            state = action.payload;
            return state ;

        default : return state ;
    }
}

let defaultSessionCartId = null ;
const localStorageData = localStorage.getItem('cart') || null 
if(localStorageData){
    console.log(localStorageData);
    defaultSessionCartId = JSON.parse(localStorage.getItem('cart'));            
}

export const cartItemReducer = (state=defaultSessionCartId,action)=>{
    switch(action.type){
        case 'CARTITEM' :
            
            const data = state ;
            if(state===null) state = [action.payload] ;
            else state=[...data,action.payload];
            
            localStorage.setItem('cart',JSON.stringify(state));
            return state ;
        
        case 'DELETECARTITEM':
            console.log(action.payload);
            const afterDelete = state.filter((value)=>  value._id !==action.payload  )
            
            localStorage.setItem('cart',JSON.stringify(afterDelete));
            
            return afterDelete;


        case 'CARTITEMDQUANTITYUPDATE' :
            if(state?.length > 0 && action.payload){
                console.log(action.payload);
                const copyState = state ;  
                
                const updatedData = copyState.map((data)=>{
                    if(data._id === action.payload.id){
                        const copyData = {...data}
                        copyData['quantity'] = action.payload.quantity;
                        console.log(copyData);
                        return copyData ;
                    }
                    else{
                        return data;
                    }
                });
                
                localStorage.setItem('cart',JSON.stringify(updatedData));
                console.log(updatedData);
    
                return updatedData ;
            }
            else{
                return state ;
            }
                
            

        default : return state ;
    }
}
