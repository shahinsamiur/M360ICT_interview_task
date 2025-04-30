
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './reduxSlices/allProductData'; 
import singleProduct from './reduxSlices/singleProduct'; 

import {api} from './API/api'
export const store = configureStore({
  reducer: {
    productsData: counterReducer,
    singleProduct:singleProduct,
    [api.reducerPath]: api.reducer

    
  },


  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware), 



  
});


export type RootState = ReturnType<typeof store.getState>;
