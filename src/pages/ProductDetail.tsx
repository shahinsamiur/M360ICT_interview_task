import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetProductByIdQuery } from '../RTXQuery/api';
import { saveSingleProductsData } from "../reduxSlices/singleProduct";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import "../css/ProductDetail.css"
import Header from '../components/Header';
import { FaRegUser } from "react-icons/fa";
import { IconType } from "react-icons"
import { Rate } from 'antd';

export default function ProductDetail() {


    interface Product {
        id: number;
        thumbnail: string;
        title: string;
        category: string;
        price: number;
        stock: number;
        rating: number;
        availabilityStatus: string;
        shippingInformation: string;
        brand: string;
        description: string;
        discountPercentage: number;
        returnPolicy: string;
        warrantyInformation: string;
        minimumOrderQuantity: number;
        sku: string;
        weight: number;
        dimensions: {
            width: number;
            height: number;
            depth: number;
        };
        tags: string[];
        meta: {
            barcode: string;
            qrCode: string;
        };
        images: string[];
        reviews: [{
            reviewer: string,
            comment: string;
            rating: number

        }];


    }


    interface IconStar {
        icon: IconType;
    }


    const [product, setProduct] = useState<Product | null>(null);

    let dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams();
    const id = params.id;
    const { data, isLoading, error } = useGetProductByIdQuery(id!);
    const product_data = useSelector((state: RootState) => state.singleProduct)


    useEffect(() => {
        if (isLoading) {
            console.log("loading"); // Log "loading" when data is being fetched
        }
        if (error) {
            console.log("error", error); // Log error if it occurs
        }
        if (data) {

            setProduct(data); // Dispatch action to save data to Redux store
            console.log("this is how", data)

        }
    }, [data, isLoading, error]); // Run the effect when data, loading state, or error changes




    const handleEidit = () => {
        navigate('/products/7/edit')
        dispatch(saveSingleProductsData(product))
    }


    const UserIcon = FaRegUser as React.ComponentType<React.SVGProps<SVGSVGElement>>;


    return (
        <div className='container'>
            {/* <Header /> */}
            {
                product ?

                    <div className="product-container">
                        <div className="product-main">
                            <img src={product.thumbnail} alt={product.title} className="product-thumbnail" />
                            <div className="product-info">
                                <h1>{product.title}</h1>
                                <p className="brand-category">{product.brand} | {product.category}</p>
                                <p className="description">{product.description}</p>
                                <p className="price">
                                    <span className="discounted-price">${(product.price * (1 - product.discountPercentage / 100)).toFixed(2)}</span>
                                    <span className="original-price">${product.price.toFixed(2)}</span>
                                    <span className="discount-badge">-{product.discountPercentage}% off</span>
                                </p>

                                <p className="stock-info">
                                    <span className={`stock-badge ${product.availabilityStatus.toLowerCase().replace(/\s/g, '-')}`}>
                                        {product.availabilityStatus}
                                    </span>
                                    <span className="stock-left">🛒 {product.stock} left</span>
                                </p>

                                <p className="rating"><Rate disabled defaultValue={product.rating} allowHalf={true} /></p>
                                <p><strong>Shipping:</strong> {product.shippingInformation}</p>
                                <p><strong>Warranty:</strong> {product.warrantyInformation}</p>
                                <p><strong>Return Policy:</strong> {product.returnPolicy}</p>
                                <p><strong>SKU:</strong> {product.sku}</p>
                                <p><strong>Min Order:</strong> {product.minimumOrderQuantity}</p>
                                <p><strong>Dimensions:</strong> {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} cm</p>
                                <p><strong>Weight:</strong> {product.weight}gm</p>
                                <img src={product.meta.qrCode} alt="QR Code" className="qr-code" />
                            </div>
                        </div>

                        <div className="gallery-section">
                            <h2>Gallery</h2>
                            <div className="gallery">
                                {product.images.map((img, i) => (
                                    <img key={i} src={img} alt={`product-${i}`} className="gallery-image" />
                                ))}
                            </div>
                        </div>

                        <div className="reviews-section">
                            <h2>Customer Reviews ({product.reviews.length})</h2>
                            {product.reviews.map((review, idx) => (
                                <div key={idx} className="review">
                                    <p className='review_box'>
                                        <UserIcon className="user-icon" />
                                        <Rate disabled defaultValue={review.rating} allowHalf={true} /></p>
                                    <p>{review.comment || "No comment provided."}</p>
                                </div>
                            ))}
                        </div>

                        <button className="edit-button" onClick={handleEidit}>Edit Product</button>

                    </div>


                    : null
            }
        </div>
    );
}
