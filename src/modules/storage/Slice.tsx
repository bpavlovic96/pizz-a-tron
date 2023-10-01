import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type HoveredTopping = {
  price: number;
  key: number | null;
};

type FirebaseConfig = {
  [key: string]: string;
};

type AuthenticatedUser = {
  authenticatedUser: string;
};

type StorageState = {
  hoveredTopping: HoveredTopping;
  firebaseConfig: FirebaseConfig;
  authenticatedUser: AuthenticatedUser;
};

const initialState: StorageState = {
  hoveredTopping: {
    price: 0,
    key: null,
  },
  firebaseConfig: {},
  authenticatedUser: {
    authenticatedUser: "",
  },
};

export type RootState = {
  storage: StorageState;
};

export const storageSlice = createSlice({
  name: "storage",
  initialState,
  reducers: {
    setHoveredTopping: (state, action: PayloadAction<HoveredTopping>) => {
      state.hoveredTopping = action.payload;
    },
    setFirebaseConfig: (state, action: PayloadAction<FirebaseConfig>) => {
      state.firebaseConfig = action.payload;
    },
    setAuthenticatedUser: (state, action: PayloadAction<AuthenticatedUser>) => {
      state.authenticatedUser = action.payload;
    },
  },
});

export const { setHoveredTopping, setFirebaseConfig, setAuthenticatedUser } =
  storageSlice.actions;

export default storageSlice.reducer;
