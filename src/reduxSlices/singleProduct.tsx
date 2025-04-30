// counterSlice.js
import { createSlice } from '@reduxjs/toolkit';



interface CounterState {
    productsData: object;
  }

const initialState = {
    productsData:{
      id: 7,
      thumbnail: "https://cdn.dummyjson.com/products/images/fragrances/Chanel%20Coco%20Noir%20Eau%20De/thumbnail.png",
      title: "Chanel Coco Noir Eau De",
      category: "fragrances",
      price: 129.99,
      stock: 41,
      rating: 2.76,
      availabilityStatus: "In Stock",
      shippingInformation: "Ships in 1 month",
      brand: "Chanel",
      description: "Coco Noir by Chanel is an elegant and mysterious fragrance, featuring notes of grapefruit, rose, and sandalwood. Perfect for evening occasions.",
      discountPercentage: 18.64,
      returnPolicy: "60 days return policy",
      warrantyInformation: "1 week warranty",
      minimumOrderQuantity: 5,
      sku: "K71HBCGS",
      weight: 4,
      dimensions: {
        width: 21.27,
        height: 28,
        depth: 11.89
      },
      tags: ['fragrances', 'perfumes'],
      meta: {
        barcode: '1435582999795',
        qrCode: 'https://assets.dummyjson.com/public/qr-code.png',
        createdAt: '2024-05-23T08:56:21.619Z',
        updatedAt: '2024-05-23T08:56:21.619Z'
      },
      images: [
        'https://cdn.dummyjson.com/products/images/fragrances/Chanel%20Coco%20Noir%20Eau%20De/1.png',
        'https://cdn.dummyjson.com/products/images/fragrances/Chanel%20Coco%20Noir%20Eau%20De/2.png',
        'https://cdn.dummyjson.com/products/images/fragrances/Chanel%20Coco%20Noir%20Eau%20De/3.png'
      ],
      reviews: [
        {
          reviewer: "John Doe",
          comment: "Great fragrance, long-lasting.",
          rating: 5
        },
        {
          reviewer: "Jane Smith",
          comment: "Not my favorite, a bit too strong.",
          rating: 3
        },
        {
          reviewer: "Alice Johnson",
          comment: "Decent, but overpriced.",
          rating: 2
        }
      ]

}};

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
