const initialState=0 ;
let user = {}

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
