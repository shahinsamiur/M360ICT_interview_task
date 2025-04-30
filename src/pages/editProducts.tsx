import React, { useEffect, useState } from 'react';
import {
  Form,
  Input,
  InputNumber,
  Button,
  Select,
  Space,
  Typography,
  message,
  Divider,
} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { saveProducts } from "../reduxSlices/allProductData";
import { RootState } from '../store';  // ✅ correct import
import "../css/editProductPage.css"
import { useGetCategoriesQuery ,useUpdateProductMutation  } from '../API/api';
const { Title } = Typography;
const { Option } = Select;

export default function EditProducts() {

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
    reviews: { reviewer: string; comment: string; rating: number }[];  // Changed to an array of objects
  }

  interface categories {
    slug: string,
    name: string,
    url: string

  }

  const { data, isLoading, error } = useGetCategoriesQuery();

  const [form] = Form.useForm();
  const [categories, setCategories] = useState<categories[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isLoading) {}
    if (error) {
      console.log("error", error); // Log error if it occurs
    }
    if (data) {

      setCategories(data)


    }
  }, [data, isLoading, error]); // Run the effect when data, loading state, or error changes






  const product_data: Product = useSelector((state: RootState) => state.singleProduct.productsData)

  useEffect(() => {
    if (product_data) {
      form.setFieldsValue({
        reviews: product_data.reviews || [],
      });
    }
  }, [form, product_data]);
  
  const [updateProduct, { isLoading: updateLoading, isSuccess, isError: updateError }] = useUpdateProductMutation();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const productId = product_data.id; // your product's ID
      console.log("final output : ",values)
      await updateProduct({ id: productId, data: values }).unwrap();
      if(isSuccess){
        message.success('Product updated successfully!');

      }
    } catch (error) {
      message.error('Failed to update product.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem' }}>
      <Title level={2}>Edit Product</Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        initialValues={{
          title: product_data.title,
          description: product_data.description,  // Initialize title here
          price: product_data.price,
          discountPercentage: product_data.discountPercentage,
          stock: product_data.stock,
          brand: product_data.brand,
          categories:product_data.category
        }}
      >
        <Form.Item
          label="Title"
          name="title"

          rules={[{ required: true, message: 'Please enter the product title.' }]}
        >
          <Input placeholder="Enter product title" value={product_data.title} />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please enter the product description.' }]}
        >
          <Input.TextArea rows={4} placeholder="Enter product description" />
        </Form.Item>

        <Form.Item
          label="Price ($)"
          name="price"
          rules={[{ required: true, message: 'Please enter the product price.' }]}
        >
          <InputNumber
            min={0}
            style={{ width: '100%' }}
            placeholder="Enter product price"
          />
        </Form.Item>

        <Form.Item
          label="Discount Percentage (%)"
          name="discountPercentage"
          rules={[{ required: true, message: 'Please enter the discount percentage.' }]}
        >
          <InputNumber
            min={0}
            max={100}
            style={{ width: '100%' }}
            placeholder="Enter discount percentage"
          />
        </Form.Item>

        <Form.Item
          label="Stock"
          name="stock"
          rules={[{ required: true, message: 'Please enter the stock quantity.' }]}
        >
          <InputNumber
            min={0}
            style={{ width: '100%' }}
            placeholder="Enter stock quantity"
          />
        </Form.Item>

        <Form.Item
          label="Brand"
          name="brand"
          rules={[{ required: true, message: 'Please enter the brand name.' }]}
        >
          <Input placeholder="Enter brand name" />
        </Form.Item>

        <Form.Item //catagory
          label="Category"
          name="category"
          rules={[{ required: false, message: 'Please select a category.' }]}
        >
          <Select placeholder="Select a category" defaultValue={product_data.category}>
            {categories.map((item: categories) => (
              <Option key={item.slug} value={item.slug}>
                {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
              </Option>
            ))}
          </Select>

        </Form.Item>

        <Divider orientation="left">Reviews</Divider>

        <Form.List name="reviews">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: 'flex', marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, 'rating']}
                    rules={[{ required: true, message: 'Please enter a rating.' }]}
                  >
                    <InputNumber min={0} max={5} placeholder="Rating" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'comment']}
                    rules={[{ required: true, message: 'Please enter a comment.' }]}
                  >
                    <Input placeholder="Comment" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                  Add Review
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>


        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Update Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

