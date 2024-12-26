import { configureStore } from '@reduxjs/toolkit';
import carsReducer from './slices/carsSlice';
import clientsReducer from './slices/clientsSlice';
import productsReducer from './slices/productsSlice';
import salesReducer from './slices/salesSlice';

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    clients: clientsReducer,
    products: productsReducer,
    sales: salesReducer,
  },
});

export default store;
