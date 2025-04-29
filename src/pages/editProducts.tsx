import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { saveProducts } from "../reduxSlices/check";
import { RootState } from '../store';  // ✅ correct import

export default function EditProducts() {


    const product_data = useSelector((state: RootState) => state.singleProduct)


    console.log(product_data.productsData)

    let handleSubmit = () => {

    }


    return (
        <>

            <div>editProducts</div>

            <button onClick={handleSubmit}>update Product</button>

        </>

    )
}
