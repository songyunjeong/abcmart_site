import { createSlice } from "@reduxjs/toolkit";

let cart = createSlice({
  name: "cart",
  initialState: [
    { id: 0, name: "White and Black", count: 2 },
    { id: 2, name: "Grey Yordan", count: 1 },
  ],
  reducers: {
    increaseCount(state, id) {
      state.map((_, i) => {
        return state[i].id === id.payload && state[i].count++;
      });
    },
    addItem(state, action) {
      state.push(action.payload);
    },
  },
});

export let { addItem, increaseCount } = cart.actions;

export default cart;
