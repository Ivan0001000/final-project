import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addCar, updateCar, deleteCar } from '../redux/slices/carsSlice';
import Modal from '../components/Modal';

const CarsPage = () => {
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.cars.cars);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [carBrand, setCarBrand] = useState('');
  const [carModel, setCarModel] = useState('');
  const [carYear, setCarYear] = useState('');
  const [carMileage, setCarMileage] = useState('');
  const [carPrice, setCarPrice] = useState('');
  const [editingCar, setEditingCar] = useState(null);

  const validateInput = () => 
    /^[a-zA-Z0-9 ]{2,50}$/.test(carBrand) &&
    /^[a-zA-Z0-9 ]{2,50}$/.test(carModel) &&
    /^[0-9]{4}$/.test(carYear) &&
    /^[0-9]+$/.test(carMileage) &&
    /^[0-9]+$/.test(carPrice);

  const handleAddOrUpdateCar = () => {
    if (!validateInput()) {
      alert('Invalid input. Please make sure all fields are filled correctly.');
      return;
    }

    const carData = {
      id: editingCar ? editingCar.id : Date.now(),
      brand: carBrand,
      model: carModel,
      year: parseInt(carYear),
      mileage: parseInt(carMileage),
      price: parseFloat(carPrice),
    };

    if (editingCar) {
      dispatch(updateCar(carData));
    } else {
      dispatch(addCar(carData));
    }

    closeModal();
  };

  const openModal = (car = null) => {
    setEditingCar(car);
    setCarBrand(car ? car.brand : '');
    setCarModel(car ? car.model : '');
    setCarYear(car ? car.year.toString() : '');
    setCarMileage(car ? car.mileage.toString() : '');
    setCarPrice(car ? car.price.toString() : '');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingCar(null);
    setCarBrand('');
    setCarModel('');
    setCarYear('');
    setCarMileage('');
    setCarPrice('');
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1>Cars</h1>
      <button onClick={() => openModal()}>Add Car</button>
      <ul>
        {cars.map((car) => (
          <li key={car.id}>
            {car.brand} {car.model} ({car.year}) - ${car.price}
            <button onClick={() => openModal(car)}>Edit</button>
            <button onClick={() => dispatch(deleteCar(car.id))}>Delete</button>
          </li>
        ))}
      </ul>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2>{editingCar ? 'Edit Car' : 'Add Car'}</h2>
        <input
          type="text"
          placeholder="Brand"
          value={carBrand}
          onChange={(e) => setCarBrand(e.target.value)}
        />
        <input
          type="text"
          placeholder="Model"
          value={carModel}
          onChange={(e) => setCarModel(e.target.value)}
        />
        <input
          type="text"
          placeholder="Year"
          value={carYear}
          onChange={(e) => setCarYear(e.target.value)}
        />
        <input
          type="text"
          placeholder="Mileage"
          value={carMileage}
          onChange={(e) => setCarMileage(e.target.value)}
        />
        <input
          type="text"
          placeholder="Price"
          value={carPrice}
          onChange={(e) => setCarPrice(e.target.value)}
        />
        <button onClick={handleAddOrUpdateCar}>{editingCar ? 'Update' : 'Add'}</button>
      </Modal>
    </div>
  );
};

export default CarsPage;
