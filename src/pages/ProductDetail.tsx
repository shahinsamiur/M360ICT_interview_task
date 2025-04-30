import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetProductByIdQuery } from '../API/api';
import { saveSingleProductsData } from '../reduxSlices/singleProduct';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import '../css/ProductDetail.css';
import { FaRegUser } from 'react-icons/fa';
import { Rate } from 'antd';
import { IconContext } from 'react-icons';
// Product interface for strong typing
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
    reviews: Array<{
        reviewer: string;
        comment: string;
        rating: number;
    }>;
}

export default function ProductDetail() {
    const [product, setProduct] = useState<Product | null>(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const { data, isLoading, error } = useGetProductByIdQuery(id!);

    useEffect(() => {
        if (data) {
            setProduct(data);
        }
        if (error) {
            console.error('Fetch error:', error);
        }
    }, [data, error]);

    const handleEdit = () => {
        if (product) {
            dispatch(saveSingleProductsData(product));
            navigate(`/products/${product.id}/edit`);
        }
    };
    const UserIcon = FaRegUser as unknown as React.FC<{ className?: string }>;
    return (
        <div className="container">
            {product && (
                <div className="product-container">
                    <div className="product-main">
                        <img src={product.thumbnail} alt={product.title} className="product-thumbnail" />

                        <div className="product-info">
                            <h1>{product.title}</h1>
                            <p className="brand-category">{`${product.brand} | ${product.category}`}</p>
                            <p className="description">{product.description}</p>

                            <div className="price">
                                <span className="discounted-price">
                                    ${((product.price * (1 - product.discountPercentage / 100)).toFixed(2))}
                                </span>
                                <span className="original-price">${product.price.toFixed(2)}</span>
                                <span className="discount-badge">-{product.discountPercentage}% off</span>
                            </div>

                            <div className="stock-info">
                                <span className={`stock-badge ${product.availabilityStatus.toLowerCase().replace(/\s/g, '-')}`}>
                                    {product.availabilityStatus}
                                </span>
                                <span className="stock-left">🛒 {product.stock} left</span>
                            </div>

                            <div className="rating">
                                <Rate disabled defaultValue={product.rating} allowHalf={true} />
                            </div>

                            <p><strong>Shipping:</strong> {product.shippingInformation}</p>
                            <p><strong>Warranty:</strong> {product.warrantyInformation}</p>
                            <p><strong>Return Policy:</strong> {product.returnPolicy}</p>
                            <p><strong>SKU:</strong> {product.sku}</p>
                            <p><strong>Min Order:</strong> {product.minimumOrderQuantity}</p>
                            <p><strong>Dimensions:</strong> {`${product.dimensions.width} x ${product.dimensions.height} x ${product.dimensions.depth} cm`}</p>
                            <p><strong>Weight:</strong> {product.weight} gm</p>

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
                                <div className='review_box'>
                                    <IconContext.Provider value={{ className: 'user-icon' }}>
                                        <UserIcon />
                                    </IconContext.Provider>
                                    <Rate disabled defaultValue={review.rating} allowHalf={true} />
                                    <span className="rating-value">({review.rating})</span>
                                </div>
                                <p>{review.comment || "No comment provided."}</p>
                            </div>
                        ))}
                    </div>

                    <button className="edit-button" onClick={handleEdit}>Edit Product</button>
                </div>
            )}
        </div>
    );
}