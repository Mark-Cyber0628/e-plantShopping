import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // kosár elemei
  },
  reducers: {
    // Elem hozzáadása a kosárhoz
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.name === newItem.name);
      if (existingItem) {
        existingItem.quantity += 1;  // Ha már benne van, növeljük a mennyiséget
      } else {
        state.items.push({ ...newItem, quantity: 1 });  // Ha nincs, hozzáadjuk 1-es mennyiséggel
      }
    },

    // Elem eltávolítása név alapján
    removeItem: (state, action) => {
      const nameToRemove = action.payload; // Feltételezzük, hogy a payload maga a növény neve
      state.items = state.items.filter(item => item.name !== nameToRemove);
    },
    calculateTotalQuantity: (state) => {
      return state.items.reduce((total, item) => total + item.quantity, 0);
    },

    // Mennyiség frissítése az adott elemhez
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;  // payload-ban legyen név és mennyiség
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity = quantity;  // Beállítjuk az új mennyiséget
      }
    },
  },
});

// Exportáljuk az action-öket és a reducereket
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;
export default CartSlice.reducer;
