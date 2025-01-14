import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  backet: JSON.parse(localStorage.getItem("backet") || "[]"),
};

export const CreateBacketSlice = createSlice({
  name: "CREATE_BACKET",
  initialState,
  reducers: {
    addToBacket(state, action) {
      const backet = [...state.backet, action.payload];
      state.backet = backet;
      localStorage.setItem("backet", JSON.stringify(backet));
    },
    deleteBacket(state, action) {
      const id = action.payload;
      if (typeof id !== "number") {
        console.error("Invalid payload for deleteBacket:", id);
        return;
      }
      const filterBacket = state.backet.filter(
        (el: { id: number }) => el.id !== id
      );
      state.backet = filterBacket;
      localStorage.setItem("backet", JSON.stringify(filterBacket));
    },
  },
});

export const { addToBacket, deleteBacket } = CreateBacketSlice.actions;
export default CreateBacketSlice.reducer;
