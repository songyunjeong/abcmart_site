import { createSlice } from "@reduxjs/toolkit";

let cart = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    increaseCount(state, action) {
      let i = state.findIndex((a) => {
        return a.id === action.payload;
      });
      state[i].count++;
    },
    decreaseCount(state, action) {
      let i = state.findIndex((a) => {
        return a.id === action.payload;
      });
      if (state[i].count > 1) {
        state[i].count--;
      }
    },
    addItem(state, action) {
      const i = state.findIndex((a) => {
        return a.id === action.payload.id;
      });
      if (i > -1) {
        state[i].count++;
      } else {
        state.push(action.payload);
      }
    },
    deleteItem(state, action) {
      let i = state.findIndex((a) => {
        return a.i === action.payload;
      });
      state.splice(i, 1);
    },
  },
});

export let { deleteItem, addItem, decreaseCount, increaseCount } = cart.actions;

export default cart;
