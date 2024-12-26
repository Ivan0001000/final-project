import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addClient, updateClient, deleteClient } from '../redux/slices/clientsSlice';
import Modal from '../components/Modal';

const ClientsPage = () => {
  const dispatch = useDispatch();
  const clients = useSelector((state) => state.clients.clients);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('');
  const [editingClient, setEditingClient] = useState(null);

  const validateInput = () => {
    
    const isNameValid = /^[a-zA-Z ]{2,50}$/.test(clientName);

    const isPhoneValid = /^\+?\d{10,15}$/.test(phone);
    return isNameValid && isPhoneValid;
  };

  const handleAddOrUpdateClient = () => {
    if (!validateInput()) {
      alert('Invalid input: Name should be 2-50 alphabetic characters, phone should start with "+" and be between 10 and 15 digits.');
      return;
    }

    if (editingClient) {
      dispatch(updateClient({ ...editingClient, name: clientName, phone }));
    } else {
      dispatch(addClient({ id: Date.now(), name: clientName, phone }));
    }

    closeModal();
  };

  const openModal = (client = null) => {
    setEditingClient(client);
    setClientName(client ? client.name : '');
    setPhone(client ? client.phone : '');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingClient(null);
    setClientName('');
    setPhone('');
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1>Clients</h1>
      <button onClick={() => openModal()}>Add Client</button>
      <ul>
        {clients.map((client) => (
          <li key={client.id}>
            {client.name} - {client.phone}
            <button onClick={() => openModal(client)}>Edit</button>
            <button onClick={() => dispatch(deleteClient(client.id))}>Delete</button>
          </li>
        ))}
      </ul>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2>{editingClient ? 'Edit Client' : 'Add Client'}</h2>
        <input
          type="text"
          placeholder="Client Name"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone (e.g., +1234567890)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button onClick={handleAddOrUpdateClient}>
          {editingClient ? 'Update' : 'Add'}
        </button>
      </Modal>
    </div>
  );
};

export default ClientsPage;
