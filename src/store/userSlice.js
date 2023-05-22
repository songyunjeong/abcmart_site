import { createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: "user",
  initialState: { name: "Mark", age: 28 },
  reducers: {
    modifyName(state) {
      state.name = "마크";
    },
    increaseAge(state, number) {
      state.age += number.payload;
    },
  },
});

export let { modifyName, increaseAge } = user.actions;

export default user;
