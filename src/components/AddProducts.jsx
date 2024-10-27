import React, { useState } from 'react';
import axios from 'axios';
import './AddProducts.css'
import Navbar from './NavBar';


const AddProducts = () => {
  const [productData, setProductData] = useState({
    professionalId: sessionStorage.getItem('userId'),
    productName: '',
    cost: '',
    discount: '',
    productDetails: '',
    specification: '',
    soldBy: '',
    description: '',
  });
  const [productImages, setProductImages] = useState([]);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setProductImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(productData).forEach((key) => formData.append(key, productData[key]));
    Array.from(productImages).forEach((file) => formData.append('productImages', file));

    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.post('http://localhost:8000/addProducts', formData, {
        headers: {
          token,
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Product added successfully');
    } catch (error) {
      console.error('Error adding product:', error);
      setMessage('Failed to add product');
    }
  };

  return (
    <div className="add-product-container">
      <Navbar/>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit} className="product-form">
        
        <label>
          Product Name:
          <input type="text" name="productName" value={productData.productName} onChange={handleChange} />
        </label>
        <label>
          Cost:
          <input type="number" name="cost" value={productData.cost} onChange={handleChange} />
        </label>
        <label>
          Discount:
          <input type="number" name="discount" value={productData.discount} onChange={handleChange} />
        </label>
        <label>
          Product Details:
          <input type="text" name="productDetails" value={productData.productDetails} onChange={handleChange} />
        </label>
        <label>
          Specification:
          <input type="text" name="specification" value={productData.specification} onChange={handleChange} />
        </label>
        <label>
          Sold By:
          <input type="text" name="soldBy" value={productData.soldBy} onChange={handleChange} />
        </label>
        <label>
          Description:
          <textarea name="description" value={productData.description} onChange={handleChange}></textarea>
        </label>
        <label>
          Product Images:
          <input type="file" multiple onChange={handleImageChange} />
        </label>
        <button type="submit">Add Product</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default AddProducts;
