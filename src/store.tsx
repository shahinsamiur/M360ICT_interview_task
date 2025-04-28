
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './reduxSlices/check'; 
import {api} from './RTXQuery/api'
export const store = configureStore({
  reducer: {
    productsData: counterReducer,
    [api.reducerPath]: api.reducer

    
  },


  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware), 



  
});


export type RootState = ReturnType<typeof store.getState>;
