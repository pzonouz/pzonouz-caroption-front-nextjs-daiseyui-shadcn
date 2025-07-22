import { createSlice } from "@reduxjs/toolkit";

export interface CrmMenu {
  show: Boolean;
}
const initialState: CrmMenu = { show: false };
export const CrmMenuSlice = createSlice({
  name: "crmMenuShow",
  initialState: initialState,
  reducers: {
    CrmMenuShow: (state) => {
      state.show = true;
    },
    CRMMEenuHide: (state) => {
      state.show = false;
    },
    CRMMenuToggel: (state) => {
      if (state.show) {
        state.show = false;
        return;
      }
      state.show = true;
    },
  },
});

export const { CrmMenuShow, CRMMEenuHide, CRMMenuToggel } =
  CrmMenuSlice.actions;
export default CrmMenuSlice.reducer;
