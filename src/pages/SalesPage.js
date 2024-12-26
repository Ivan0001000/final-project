import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addSale, updateSale, deleteSale } from '../redux/slices/salesSlice';
import Modal from '../components/Modal';

const SalesPage = () => {
  const dispatch = useDispatch();
  const sales = useSelector((state) => state.sales.sales);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [car, setCar] = useState('');
  const [client, setClient] = useState('');
  const [price, setPrice] = useState('');
  const [editingSale, setEditingSale] = useState(null);

  const validateInput = () => 
    /^[a-zA-Z0-9 ]{2,50}$/.test(car) &&
    /^[a-zA-Z ]{2,50}$/.test(client) &&
    /^[0-9]+$/.test(price);

  const handleAddOrUpdateSale = () => {
    if (!validateInput()) {
      alert('Invalid input: Car name and client name should be 2-50 alphanumeric characters, and price should be a number.');
      return;
    }

    if (editingSale) {
      dispatch(updateSale({ ...editingSale, car, client, price: parseInt(price) }));
    } else {
      dispatch(addSale({ id: Date.now(), car, client, price: parseInt(price) }));
    }

    closeModal();
  };

  const handleSale = (sale) => {
    dispatch(deleteSale(sale.id));

    const soldMessage = {
      id: sale.id,
      car: sale.car,
      client: sale.client,
      price: sale.price,
      sold: true,
    };

    dispatch(addSale(soldMessage)); 
  };

  const openModal = (sale = null) => {
    setEditingSale(sale);
    setCar(sale ? sale.car : '');
    setClient(sale ? sale.client : '');
    setPrice(sale ? sale.price.toString() : '');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingSale(null);
    setCar('');
    setClient('');
    setPrice('');
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1>Sales</h1>
      <button onClick={() => openModal()}>Add Sale</button>
      <ul>
        {sales.map((sale) => (
          <li key={sale.id}>
            {sale.sold ? (
              <div>
                <strong>Car:</strong> {sale.car} <br />
                <strong>Client:</strong> {sale.client} <br />
                <strong>Price:</strong> ${sale.price.toLocaleString()} <br />
                <strong>Status:</strong> Sold
              </div>
            ) : (
              <>
                <strong>Car:</strong> {sale.car} <br />
                <strong>Client:</strong> {sale.client} <br />
                <strong>Price:</strong> ${sale.price.toLocaleString()} <br />
                <button onClick={() => openModal(sale)}>Edit</button>
                <button onClick={() => handleSale(sale)}>Sell</button>
              </>
            )}
          </li>
        ))}
      </ul>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2>{editingSale ? 'Edit Sale' : 'Add Sale'}</h2>
        <input
          type="text"
          placeholder="Car Name"
          value={car}
          onChange={(e) => setCar(e.target.value)}
        />
        <input
          type="text"
          placeholder="Client Name"
          value={client}
          onChange={(e) => setClient(e.target.value)}
        />
        <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button onClick={handleAddOrUpdateSale}>
          {editingSale ? 'Update' : 'Add'}
        </button>
      </Modal>
    </div>
  );
};

export default SalesPage;
