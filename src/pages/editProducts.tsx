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
import { saveProducts } from "../reduxSlices/check";
import { RootState } from '../store';  // ✅ correct import
import "../css/editProductPage.css"
const { Title } = Typography;
const { Option } = Select;

export default function EditProducts() {
    const [form] = Form.useForm();
    const [categories, setCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const product_data = useSelector((state: RootState) => state.singleProduct)


    console.log(product_data.productsData)


    const onFinish = async (values: any) => {
        setLoading(true);
        try {
        //   const response = await axios.patch(
        //     `https://dummyjson.com/products/${productId}`,
        //     values
        //   );
          message.success('Product updated successfully!');
          console.log('Updated Product:', );
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
          >
            <Form.Item
              label="Title"
              name="title"
              
              rules={[{ required: true, message: 'Please enter the product title.' }]}
            >
              <Input placeholder="Enter product title" />
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
    
            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: 'Please select a category.' }]}
            >
              <Select placeholder="Select a category">
                {categories.map((category) => (
                  <Option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
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
                        <InputNumber
                          min={0}
                          max={5}
                          placeholder="Rating"
                        />
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
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      icon={<PlusOutlined />}
                    >
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
    
