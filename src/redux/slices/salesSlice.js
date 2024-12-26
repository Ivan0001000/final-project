import { createSlice } from '@reduxjs/toolkit';

const salesSlice = createSlice({
  name: 'sales',
  initialState: {
    sales: [
      { id: 1, car: 'Toyota Camry', client: 'John Smith', price: 30000 },
      { id: 2, car: 'BMW X5', client: 'Jane Doe', price: 60000 },
      { id: 3, car: 'Audi R8', client: 'Carlos Rodriguez', price: 120000 },
      { id: 4, car: 'Honda Civic', client: 'Alice Johnson', price: 20000 },
      { id: 5, car: 'Ford Mustang', client: 'David Brown', price: 40000 },
      { id: 6, car: 'Chevrolet Tahoe', client: 'Sophia Martinez', price: 45000 },
      { id: 7, car: 'Tesla Model S', client: 'Liam Williams', price: 85000 },
      { id: 8, car: 'Volkswagen Passat', client: 'Emma Davis', price: 25000 },
      { id: 9, car: 'Porsche Cayenne', client: 'Oliver Wilson', price: 95000 },
      { id: 10, car: 'Mercedes-Benz GLC', client: 'Isabella Taylor', price: 70000 },
    ],
  },

  reducers: {
    addSale: (state, action) => {
      state.sales.push(action.payload);
    },
    deleteSale: (state, action) => {
      state.sales = state.sales.filter(sale => sale.id !== action.payload);
    },
    updateSale: (state, action) => {
      const index = state.sales.findIndex(sale => sale.id === action.payload.id);
      if (index !== -1) {
        state.sales[index] = action.payload;
      }
    },
  },
});

export const { addSale, deleteSale, updateSale } = salesSlice.actions;
export default salesSlice.reducer;
