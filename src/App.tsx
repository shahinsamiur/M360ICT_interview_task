
import './App.css';
import { Table } from "antd";
import { RootState } from './store';
import { useSelector, useDispatch } from 'react-redux';
import { saveProducts } from "./reduxSlices/check"
import { useGetUsersQuery } from './RTXQuery/api';
import { useEffect, useState } from 'react';
function  App() {

  interface Product {
    id: number;
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
    },{
      title: 'Product Name',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
    },
    {
      title: 'Availability Status',
      dataIndex: 'availabilityStatus',
      key: 'availabilityStatus',
    },
    {
      title: 'Shipping Info',
      dataIndex: 'shippingInformation',
      key: 'shippingInformation',
    },
    {
      title: 'Action',
      key: 'action',
      render: ( record:Product) => (
        <button onClick={() => 
          console.log(record.id)

        }>
          View Details
        </button>
      ),
    },
  ];
  

  // Function to handle the navigation to Product Detail View
  // const navigateToProductDetail = (productId:object) => {
  //   let data=productId.toString()
  //   // Implement navigation to the product detail page
  //   console.log(`Navigate to product detail page for product id: ${data}`);
  // };
  

  let dispatch = useDispatch()

  const product_data=useSelector((state:RootState)=>state.productsData.productsData)



  const { data, isLoading, error } =  useGetUsersQuery();

   // const [productData, setProductData] = useState<object[]>([]);
   const dataSource = product_data.products.map(item => ({
    ...item,
    key: item.id,  // Use 'id' as the unique key for each row
  }));

  useEffect(() => {
    if (isLoading) {
      console.log("loading"); // Log "loading" when data is being fetched
    }

    if (error) {
      console.log("error", error); // Log error if it occurs
    }

    if (data) {
  
      dispatch(saveProducts(data)); // Dispatch action to save data to Redux store
      // console.log("this is how",data.products)
    }
    
  
  
  }, [data, isLoading, error, dispatch]); // Run the effect when data, loading state, or error changes




  return (
    <>


    

    {
    product_data?  <Table dataSource={product_data.products} columns={columns} />:null
    }
    </>
  );
}

export default App;
