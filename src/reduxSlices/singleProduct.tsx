// counterSlice.js
import { createSlice } from '@reduxjs/toolkit';



interface CounterState {
    productsData: object;
  }

const initialState = {
    productsData:{
        products:{}
    },
};

const counterSlice = createSlice({
  name: 'singleProduct',
  initialState,
  reducers: {
    saveSingleProductsData: (state,action) => {
      state.productsData=action.payload
    },
  
  },
});

export const {saveSingleProductsData} = counterSlice.actions;
export default counterSlice.reducer;
