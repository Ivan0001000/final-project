import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [
    { id: 1, name: 'Car Engine', price: 3000 },
    { id: 2, name: 'Car Transmission', price: 2500 },
    { id: 3, name: 'Car Battery', price: 200 },
    { id: 4, name: 'Car Alternator', price: 450 },
    { id: 5, name: 'Car Radiator', price: 700 },
    { id: 6, name: 'Car Air Filter', price: 100 },
    { id: 7, name: 'Car Brake Pads', price: 150 },
    { id: 8, name: 'Car Shock Absorber', price: 250 },
    { id: 9, name: 'Car Steering Wheel', price: 350 },
    { id: 10, name: 'Car Clutch', price: 400 },
    { id: 11, name: 'Car Fuel Pump', price: 500 },
    { id: 12, name: 'Car Timing Belt', price: 200 },
    { id: 13, name: 'Car Wiper Blades', price: 30 },
    { id: 14, name: 'Car Headlights', price: 150 },
    { id: 15, name: 'Car Taillights', price: 120 },
    { id: 16, name: 'Car Side Mirrors', price: 180 },
    { id: 17, name: 'Car Window Regulator', price: 250 },
    { id: 18, name: 'Car Air Conditioning Compressor', price: 1200 },
    { id: 19, name: 'Car Heater Core', price: 350 },
    { id: 20, name: 'Car Door Lock', price: 100 },
    { id: 21, name: 'Car Fuel Injector', price: 150 },
    { id: 22, name: 'Car Muffler', price: 200 },
    { id: 23, name: 'Car Exhaust Pipe', price: 300 },
    { id: 24, name: 'Car Windshield', price: 400 },
    { id: 25, name: 'Car Brake Discs', price: 250 },
    { id: 26, name: 'Car Brake Calipers', price: 300 },
    { id: 27, name: 'Car CV Joint', price: 180 },
    { id: 28, name: 'Car Radiator Fan', price: 220 },
    { id: 29, name: 'Car Fuel Tank', price: 500 },
    { id: 30, name: 'Car Timing Chain', price: 400 },
    { id: 31, name: 'Car Axle', price: 600 },
    { id: 32, name: 'Car Differential', price: 700 },
    { id: 33, name: 'Car Oil Filter', price: 40 },
    { id: 34, name: 'Car Timing Gears', price: 150 },
    { id: 35, name: 'Car Sway Bar', price: 250 },
    { id: 36, name: 'Car Fuel Tank Cap', price: 50 },
    { id: 37, name: 'Car Windshield Washer Pump', price: 120 },
    { id: 38, name: 'Car Gearbox', price: 1500 },
    { id: 39, name: 'Car Steering Rack', price: 1000 },
    { id: 40, name: 'Car Dashboard', price: 800 },
    { id: 41, name: 'Car Bumper', price: 250 },
    { id: 42, name: 'Car Fender', price: 300 },
    { id: 43, name: 'Car Tailpipe', price: 180 },
    { id: 44, name: 'Car Fog Lights', price: 120 },
    { id: 45, name: 'Car Wheel Bearing', price: 200 },
    { id: 46, name: 'Car Timing Cover', price: 250 },
    { id: 47, name: 'Car Oil Pan', price: 350 },
    { id: 48, name: 'Car Cylinder Head', price: 1500 },
    { id: 49, name: 'Car Tensioner Pulley', price: 120 },
    { id: 50, name: 'Car Turbocharger', price: 2500 },
  ],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action) => {
      const index = state.products.findIndex((product) => product.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter((product) => product.id !== action.payload);
    },
    sellProduct: (state, action) => {
      const index = state.products.findIndex((product) => product.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = { ...state.products[index], saleMessage: action.payload.saleMessage };
      }
    },
  },
});

export const { addProduct, updateProduct, deleteProduct, sellProduct } = productsSlice.actions;
export default productsSlice.reducer;
