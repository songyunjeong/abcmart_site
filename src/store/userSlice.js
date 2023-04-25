import { createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: "user",
  initialState: { name: "송윤정", age: 28 },
  reducers: {
    modifyName(state) {
      state.name = "Yunjeong Song";
    },
    increaseAge(state, number) {
      state.age += number.payload;
    },
  },
});

export let { modifyName, increaseAge } = user.actions;

export default user;
