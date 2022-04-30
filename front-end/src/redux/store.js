import { configureStore } from '@reduxjs/toolkit'
import {userReducer,reRenderUserReducer,productsReducer,productCategoryReducer,cartIdReducer} from './reducer';

const store = configureStore({
    reducer :{
        userReducer,
        reRenderUserReducer,
        productsReducer,
        productCategoryReducer,
        cartIdReducer
    }
},window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store ;