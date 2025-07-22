import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = { access: "" };
const SessionSlice = createSlice({
  initialState: initialState,
  name: "access",
  reducers: {
    setAccess: (state, action: PayloadAction<string>) => {
      state.access = action?.payload;
    },
  },
});
export default SessionSlice;
export const { setAccess } = SessionSlice.actions;
