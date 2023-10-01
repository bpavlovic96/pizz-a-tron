import { configureStore } from "@reduxjs/toolkit";
import storageReducer from "./Slice";

const store = configureStore({
  reducer: {
    storage: storageReducer,
  },
});

export default store;
