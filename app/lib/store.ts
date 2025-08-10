import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { CrmMenuSlice } from "./features/CrmMenuSlice";
import { api } from "./features/api";
import SessionSlice from "./features/SessionSlice";
import DataSlice from "./features/data";

export const makeStore = () => {
  return configureStore({
    reducer: {
      crmMenu: CrmMenuSlice.reducer,
      access: SessionSlice.reducer,
      [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
