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

type Topping = {
  name: string;
  price: number;
};

type CurrentConfiguration = {
  toppings: Topping[];
  size: string;
  discount: undefined | boolean;
  quantity: number;
  total: undefined | number;
};

type StorageState = {
  hoveredTopping: HoveredTopping;
  firebaseConfig: FirebaseConfig;
  authenticatedUser: AuthenticatedUser;
  currentConfiguration: CurrentConfiguration;
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
  currentConfiguration: {
    toppings: [],
    size: "",
    discount: undefined,
    quantity: 1,
    total: undefined,
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
    setCurrentConfiguration: (
      state,
      action: PayloadAction<CurrentConfiguration>
    ) => {
      state.currentConfiguration = action.payload;
    },
  },
});

export const {
  setHoveredTopping,
  setFirebaseConfig,
  setAuthenticatedUser,
  setCurrentConfiguration,
} = storageSlice.actions;

export default storageSlice.reducer;
