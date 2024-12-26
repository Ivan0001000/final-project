import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  clients: [
    { id: 1, name: 'John Smith', phone: '+1234567890' },
    { id: 2, name: 'Jane Doe', phone: '+0987654321' },
    { id: 3, name: 'Carlos Rodriguez', phone: '+1122334455' },
    { id: 4, name: 'Alice Johnson', phone: '+1222333444' },
    { id: 5, name: 'David Brown', phone: '+1444555666' },
    { id: 6, name: 'Sophia Martinez', phone: '+1555666777' },
    { id: 7, name: 'Liam Williams', phone: '+1999888777' },
    { id: 8, name: 'Emma Davis', phone: '+1777666555' },
    { id: 9, name: 'Oliver Wilson', phone: '+1888999444' },
    { id: 10, name: 'Isabella Taylor', phone: '+1666444333' },
  ],
};


const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    addClient: (state, action) => {
      state.clients.push(action.payload);
    },
    updateClient: (state, action) => {
      const index = state.clients.findIndex(client => client.id === action.payload.id);
      if (index !== -1) state.clients[index] = action.payload;
    },
    deleteClient: (state, action) => {
      state.clients = state.clients.filter(client => client.id !== action.payload);
    },
  },
});

export const { addClient, updateClient, deleteClient } = clientsSlice.actions;
export default clientsSlice.reducer;