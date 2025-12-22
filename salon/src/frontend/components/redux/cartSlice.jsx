import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [
    {
      id: 1,
      name: "Ultimate Rolling Paper with Filter",
      img: "/product/product_1_2.jpg",
      qty: 1,
      price: 80,
    },
    {
      id: 2,
      name: "Verka Standard Fresh Milk",
      img: "/product/category_2_1.png",
      qty: 1,
      price: 63,
    },
  ],
  delivery: 25,
  handling: 2,
  smallCart: 20,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increaseQty: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.qty += 1;
    },

    decreaseQty: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.qty > 1) item.qty -= 1;
    },

    removeItem: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
  },
});

export const { increaseQty, decreaseQty, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
