import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetProductByIdQuery } from '../RTXQuery/api';
import { saveSingleProductsData } from "../reduxSlices/singleProduct";
import { useSelector, useDispatch } from 'react-redux';




export default function ProductDetail() {
    let dispatch=useDispatch()
    const navigate = useNavigate()
    const params = useParams();
    const id = params.id;
    const { data, isLoading, error } = useGetProductByIdQuery(id!);


    useEffect(() => {
        if (isLoading) {
            console.log("loading"); // Log "loading" when data is being fetched
        }
        if (error) {
            console.log("error", error); // Log error if it occurs
        }
        if (data) {

             dispatch(saveSingleProductsData(data)); // Dispatch action to save data to Redux store
            console.log("this is how", data)
        }
    }, [data, isLoading, error]); // Run the effect when data, loading state, or error changes




    const handleEidit = () => {
        navigate('/products/7/edit')
    }



    return (
        <>


            <div>ProductDetail___{id}</div>
            <button onClick={handleEidit}>edit that product </button>
        </>
    )
}
