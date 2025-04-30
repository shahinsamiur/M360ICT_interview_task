

import { Table } from "antd";
import { RootState } from '../store';
import { useSelector, useDispatch } from 'react-redux';
import { saveProducts } from "../reduxSlices/allProductData";
import { useGetUsersQuery } from '../API/api';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/productPage.css';
function App() {
  const navigate = useNavigate();

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
    // Add any other properties you need here
  }


  const columns = [

    {
      title: 'Index',
      dataIndex: 'id',
      key: 'ID',
      render: (index: number) => {
        return (
          <div className="index_cel">
            {index}
          </div>
        );
      },
    },

    {
      title: 'Image',
      dataIndex: 'thumbnail',
      key: 'avatar',
      render: (thumbnail: string) => {
        return (
          <img
            src={thumbnail}
            alt="avatar"
            style={{ width: 50, height: 40, borderRadius: '50%' }}
          />
        );
      },
    },



    {
      title: 'Product Name',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => {

        return (
          // <div className="rating">

          <span className="box_gray category">
            {category}
          </span>
          // </div>

        )
      }
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => {

        return (
          <div className="rating">

            <span className="box_gray">
              {price}
            </span>
          </div>

        )
      }
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating: number) => {

        return (
          <div className="rating">

            <span className={` ${rating > 4 ? 'box_green' : rating > 3 ? 'box_yellow' : 'box_red'} rating`}>
              {rating}
            </span>
          </div>

        )
      }
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      render: (stock: number) => {

        return (
          <div className="rating">

            <span className="box_gray">
              {stock}
            </span>
          </div>

        )
      }

    },

    {
      title: 'Availability Status',
      dataIndex: 'availabilityStatus',
      key: 'availabilityStatus',
      render: (availabilityStatus: string) => {

        return (
          <div className={
            availabilityStatus.toLowerCase().trim() === "in stock"
              ? "box_green"
              : availabilityStatus.toLowerCase().trim() === "low stock"
                ? "box_red"
                : "box_yellow"
          }>

            <span className="text">{availabilityStatus}</span>

          </div>

        )
      }
    },
    {
      title: 'Shipping Info',
      dataIndex: 'shippingInformation',
      key: 'shippingInformation',
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: Product) => (
        <button onClick={() =>
          navigateToProductDetail(record)

        } className="table_button">
          View Details
        </button>
      ),
    },
  ];


  //   Function to handle the navigation to Product Detail View
  const navigateToProductDetail = (productId: Product) => {
    navigate(`/products/${productId.id}`)
  };


  let dispatch = useDispatch()

  const product_data = useSelector((state: RootState) => state.productsData.productsData)



  const { data, isLoading, error } = useGetUsersQuery();

  // const [productData, setProductData] = useState<object[]>([]);
  const dataSource = product_data.products.map(item => ({
    ...(item as Product),
    key: (item as Product).id,
  }));


  useEffect(() => {
    if (isLoading) {
    }

    if (error) {
      console.log("error", error); // Log error if it occurs
    }

    if (data) {

      dispatch(saveProducts(data)); // Dispatch action to save data to Redux store
    }



  }, [data, isLoading, error, dispatch]); // Run the effect when data, loading state, or error changes



  return (
    <>


      <div className="wraper">
        {
          product_data ? <Table dataSource={dataSource} columns={columns} className="no-right-border" /> : null
        }

      </div>


    </>
  );
}

export default App;
