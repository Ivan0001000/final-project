import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, updateProduct, sellProduct, deleteProduct } from '../redux/slices/productsSlice'; // Импортируем action для удаления товара
import Modal from '../components/Modal';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);

  const validateInput = () => /^[a-zA-Z0-9 ]{2,50}$/.test(productName) && /^[0-9]+$/.test(price);

  const handleAddOrUpdateProduct = () => {
    if (!validateInput()) {
      alert('Invalid input: Name should be 2-50 alphanumeric characters, price should be a number.');
      return;
    }

    if (editingProduct) {
      dispatch(updateProduct({ ...editingProduct, name: productName, price: parseFloat(price) }));
    } else {
      dispatch(addProduct({ id: Date.now(), name: productName, price: parseFloat(price) }));
    }

    closeModal();
  };

  const handleSellProduct = (product) => {
    const saleMessage = `Sold for $${product.price}`;
    dispatch(sellProduct({ ...product, saleMessage }));
  };

  const handleDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId)); 
  };

  const openModal = (product = null) => {
    setEditingProduct(product);
    setProductName(product ? product.name : '');
    setPrice(product ? product.price.toString() : '');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingProduct(null);
    setProductName('');
    setPrice('');
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1>Products</h1>
      <button onClick={() => openModal()}>Add Product</button>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
            {product.saleMessage ? (
              <div><strong>{product.saleMessage}</strong></div> 
            ) : (
              <>
                <button onClick={() => openModal(product)}>Edit</button>
                <button onClick={() => handleSellProduct(product)}>Sell</button>
                <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2>{editingProduct ? 'Edit Product' : 'Add Product'}</h2>
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button onClick={handleAddOrUpdateProduct}>
          {editingProduct ? 'Update' : 'Add'}
        </button>
      </Modal>
    </div>
  );
};

export default ProductsPage;
