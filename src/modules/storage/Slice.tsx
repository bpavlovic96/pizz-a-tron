import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type HoveredTopping = {
  price: number;
  id: number | null;
};

type FirebaseConfig = {
  [key: string]: string;
};

export type Topping = {
  emoji: string;
  topping: string;
  price: number;
  id: number;
};

type AuthenticatedUser = string | null;

type InitialSize = {
  S: number;
  M: number;
  L: number;
  [key: string]: number;
};

type Discount = {
  [key: string]: number;
};

export type InitialConfiguration = {
  toppings: Topping[];
  size: InitialSize;
  discount: Discount;
  quantity: number;
  total: number;
};

type CurrentSize = {
  size: string;
  price: number;
};

type ShippingInformation = {
  street: string;
  city: string;
  postalCode: string;
  county: string;
};

export type CurrentConfiguration = {
  toppings: Topping[];
  size: CurrentSize;
  discount: number;
  quantity: number;
  total: number;
  ready: boolean;
  shippingInformation: ShippingInformation;
  finished: boolean;
};

type DiscountDetails = {
  isDiscountApplied: boolean;
  discountWord: string;
};

type StorageState = {
  hoveredTopping: HoveredTopping;
  firebaseConfig: FirebaseConfig;
  authenticatedUser: AuthenticatedUser;
  initialConfiguration: InitialConfiguration;
  currentConfiguration: CurrentConfiguration;
  discountDetails: DiscountDetails;
};

const initialState: StorageState = {
  hoveredTopping: {
    price: 0,
    id: null,
  },
  firebaseConfig: {},
  authenticatedUser: null,
  initialConfiguration: {
    toppings: [],
    size: { S: 0, M: 0, L: 0 },
    discount: {},
    quantity: 1,
    total: 0,
  },
  currentConfiguration: {
    toppings: [],
    size: { size: "", price: 0 },
    discount: 0,
    quantity: 1,
    total: 0,
    ready: false,
    shippingInformation: { street: "", city: "", postalCode: "", county: "" },
    finished: false,
  },
  discountDetails: {
    isDiscountApplied: false,
    discountWord: "",
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
    setInitialConfiguration: (state, action: PayloadAction<InitialConfiguration>) => {
      state.initialConfiguration = action.payload;
    },
    setCurrentConfiguration: (state, action: PayloadAction<CurrentConfiguration>) => {
      state.currentConfiguration = action.payload;
    },
    setDiscountDetails: (state, action: PayloadAction<DiscountDetails>) => {
      state.discountDetails = action.payload;
    },
  },
});

export const {
  setHoveredTopping,
  setFirebaseConfig,
  setAuthenticatedUser,
  setInitialConfiguration,
  setCurrentConfiguration,
  setDiscountDetails,
} = storageSlice.actions;

export default storageSlice.reducer;
