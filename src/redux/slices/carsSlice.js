import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cars: [
    { id: 1, brand: 'Toyota', model: 'Camry', year: 2020, mileage: 15000, price: 25000 },
    { id: 2, brand: 'BMW', model: 'X5', year: 2021, mileage: 10000, price: 45000 },
    { id: 3, brand: 'Audi', model: 'R8', year: 2019, mileage: 5000, price: 120000 },
    { id: 4, brand: 'Honda', model: 'Civic', year: 2018, mileage: 25000, price: 15000 },
    { id: 5, brand: 'Ford', model: 'Mustang', year: 2022, mileage: 500, price: 35000 },
    { id: 6, brand: 'Chevrolet', model: 'Tahoe', year: 2017, mileage: 40000, price: 35000 },
    { id: 7, brand: 'Tesla', model: 'Model S', year: 2023, mileage: 200, price: 85000 },
    { id: 8, brand: 'Volkswagen', model: 'Passat', year: 2016, mileage: 35000, price: 18000 },
    { id: 9, brand: 'Porsche', model: 'Cayenne', year: 2021, mileage: 8000, price: 75000 },
    { id: 10, brand: 'Mercedes-Benz', model: 'GLC', year: 2020, mileage: 12000, price: 60000 },
  ],
};

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    addCar: (state, action) => {
      state.cars.push(action.payload);
    },
    updateCar: (state, action) => {
      const index = state.cars.findIndex(car => car.id === action.payload.id);
      if (index !== -1) state.cars[index] = action.payload;
    },
    deleteCar: (state, action) => {
      state.cars = state.cars.filter(car => car.id !== action.payload);
    },
  },
});

export const { addCar, updateCar, deleteCar } = carsSlice.actions;
export default carsSlice.reducer;
