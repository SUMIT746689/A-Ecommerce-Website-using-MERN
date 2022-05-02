
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
if(localStorage.getItem('cart')){
    defaultSessionCartId = JSON.parse(localStorage.getItem('cart'));            
}

export const cartIdReducer = (state=defaultSessionCartId,action)=>{
    switch(action.type){
        case 'CARTID' :
            
            const data = state ;
            if(state===null) state = [action.payload] ;
            else state=[...data,action.payload];
            
            localStorage.setItem('cart',JSON.stringify(state));
            return state ;
        
        case 'DELETECARTID':
            console.log(action.payload);
            const afterDelete = state.filter((value)=> action.payload !== value.id )
            
            localStorage.setItem('cart',JSON.stringify(afterDelete));
            
            return afterDelete;


        case 'CARTIDQUANTITY' :
            if(state?.length > 0 && action.payload){
                console.log(action.payload);

                const updatedData = state.map((data)=>{
                    if(data.id === action.payload.id){
                        return action.payload
                    }
                    else return data
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
