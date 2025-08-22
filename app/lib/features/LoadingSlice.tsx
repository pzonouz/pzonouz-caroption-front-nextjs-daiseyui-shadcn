import { createSlice } from "@reduxjs/toolkit";

export interface Loading {
  show: boolean;
}
const initialState: Loading = { show: false };
export const LoadingSlice = createSlice({
  name: "loading",
  initialState: initialState,
  reducers: {
    LoadingShow: (state) => {
      state.show = true;
    },
    LoadingHide: (state) => {
      state.show = false;
    },
  },
});

export const { LoadingHide, LoadingShow } = LoadingSlice.actions;
export default LoadingSlice.reducer;
