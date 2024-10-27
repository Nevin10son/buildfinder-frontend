import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProfessionalViewProducts.css';

const ProfessionalViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editFormData, setEditFormData] = useState({
    productName: '',
    cost: '',
    discount: '',
    productDetails: '',
    specification: '',
    soldBy: '',
    description: ''
  });
  const [confirmDeleteProduct, setConfirmDeleteProduct] = useState(null); // State for delete confirmation

  useEffect(() => {
    fetchProfessionalProducts();
  }, []);

  const fetchProfessionalProducts = async () => {
    const professionalId = { professionalId: sessionStorage.getItem('userId') };
    try {
      const response = await axios.post(
        'http://localhost:8000/getProfessionalProducts',
        professionalId,
        {
          headers: {
            token: sessionStorage.getItem('token'),
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.data.Status === "Invalid Authentication") {
        setError("Authentication failed. Please log in again.");
      } else if (response.data.Status === "No products found for this professional") {
        setError("No products found for this professional.");
      } else {
        setProducts(response.data);
      }
    } catch (err) {
      setError("Error retrieving products.");
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:8000/deleteProduct/${productId}`, {
        headers: {
          token: sessionStorage.getItem('token'),
        },
      });
      setProducts(products.filter((product) => product._id !== productId));
      setConfirmDeleteProduct(null); // Close confirmation prompt after deletion
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product._id);
    setEditFormData({
      productName: product.productName,
      cost: product.cost,
      discount: product.discount,
      productDetails: product.productDetails,
      specification: product.specification,
      soldBy: product.soldBy,
      description: product.description
    });
  };

  const handleEditChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value
    });
  };

  const saveEdits = async () => {
    const updates = { ...editFormData };
    try {
      const response = await axios.put(
        'http://localhost:8000/editProduct',
        {
          productId: editingProduct,
          professionalId: sessionStorage.getItem('userId'),
          updates
        },
        {
          headers: {
            token: sessionStorage.getItem('token'),
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.Status === "Product updated successfully") {
        setProducts(products.map((product) =>
          product._id === editingProduct ? { ...product, ...updates } : product
        ));
        setEditingProduct(null);
      } else {
        setError(response.data.Status || "Error updating product.");
      }
    } catch (error) {
      console.error("Error saving edits:", error);
    }
  };

  return (
    <div className="professional-products-container">
      <h2 className="title">Professional's Products</h2>
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="products-list">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              <div className="product-image">
                <img
                  src={`http://localhost:8000/uploads/products/${product.productImages[0]?.url}`}
                  alt={product.productName}
                />
              </div>
              {editingProduct === product._id ? (
                <div className="edit-form">
                  <input
                    type="text"
                    name="productName"
                    value={editFormData.productName}
                    onChange={handleEditChange}
                    placeholder="Product Name"
                  />
                  <input
                    type="number"
                    name="cost"
                    value={editFormData.cost}
                    onChange={handleEditChange}
                    placeholder="Cost"
                  />
                  <input
                    type="number"
                    name="discount"
                    value={editFormData.discount}
                    onChange={handleEditChange}
                    placeholder="Discount"
                  />
                  <textarea
                    name="productDetails"
                    value={editFormData.productDetails}
                    onChange={handleEditChange}
                    placeholder="Product Details"
                  />
                  <textarea
                    name="specification"
                    value={editFormData.specification}
                    onChange={handleEditChange}
                    placeholder="Specification"
                  />
                  <input
                    type="text"
                    name="soldBy"
                    value={editFormData.soldBy}
                    onChange={handleEditChange}
                    placeholder="Sold By"
                  />
                  <textarea
                    name="description"
                    value={editFormData.description}
                    onChange={handleEditChange}
                    placeholder="Description"
                  />
                  <button className="save-button" onClick={saveEdits}>Save</button>
                  <button className="cancel-button" onClick={() => setEditingProduct(null)}>Cancel</button>
                </div>
              ) : (
                <div className="product-details">
                  <h3>{product.productName}</h3>
                  <p><strong>Cost:</strong> Rs {product.cost}</p>
                  <p><strong>Discount:</strong> {product.discount}%</p>
                  <p><strong>Details:</strong> {product.productDetails}</p>
                  <p><strong>Specification:</strong> {product.specification}</p>
                  <p><strong>Sold By:</strong> {product.soldBy}</p>
                  <p><strong>Description:</strong> {product.description}</p>
                  <button
                    className="delete-button"
                    onClick={() => setConfirmDeleteProduct(product._id)}
                  >
                    Delete Product
                  </button>
                  <button className="edit-button" onClick={() => handleEditClick(product)}>
                    Edit Product
                  </button>
                </div>
              )}
              {confirmDeleteProduct === product._id && (
                <div className="delete-confirmation">
                  <p>Are you sure you want to delete this product?</p>
                  <button className="confirm-delete-button" onClick={() => deleteProduct(product._id)}>Yes</button>
                  <button className="cancel-delete-button" onClick={() => setConfirmDeleteProduct(null)}>No</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfessionalViewProducts;
