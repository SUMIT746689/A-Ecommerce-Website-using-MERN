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
if(sessionStorage.getItem('cart')){
    defaultSessionCartId = JSON.parse(sessionStorage.getItem('cart'));            
}

export const cartIdReducer = (state=defaultSessionCartId,action)=>{
    switch(action.type){
        case 'CARTID' :
            
            // if(sessionStorage.getItem('cart')){
            //     const sessionCartId = JSON.parse(sessionStorage.getItem('cart'));
            //     console.log(JSON.parse(sessionStorage.getItem('cart')));
            //     state = [...sessionCartId,action.payload]
            // }
             
            
            if(state===null) state = [action.payload] ;
            else state=[...state,action.payload];
            
            
            sessionStorage.setItem('cart',JSON.stringify(state));
            return state ;

        default : return state ;
    }
}
