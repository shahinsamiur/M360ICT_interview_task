// counterSlice.js
import { createSlice } from '@reduxjs/toolkit';



interface CounterState {
    productsData: object[];
  }

const initialState = {
    productsData:{
        products:[]
    },
};

const counterSlice = createSlice({
  name: 'productsData',
  initialState,
  reducers: {
    saveProducts: (state,action) => {
      state.productsData=action.payload
    },
  
  },
});

export const {saveProducts} = counterSlice.actions;
export default counterSlice.reducer;
