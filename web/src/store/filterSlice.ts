import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CardData {
  id: number;
  model: string;
  color: string;
  manufacturer: string;
  location: string;
  owners: string;
  transmission: string;
  externalFitments: string;
  insuranceValidUntil: string;
  kms: string;
  photo: string;
  brand: string;
  bodyType: string;
  price: string;
  fuelType: string;
}

interface FilterState {
  location: string | null;
  bodyType: string | null;
  brand: string[] | null;
  owners: string | null;
  budget: string[] | null;
  fuelType: string | null;
  transmission: string | null;
}

interface FilteredDataState {
  filteredData: CardData[];
}

const initialFilterState: FilterState = {
  location: null,
  bodyType: null,
  brand: null,
  owners: null,
  budget: null,
  fuelType: null,
  transmission: null,
};

const initialFilteredDataState: FilteredDataState = {
  filteredData: [],
};

const filterSlice = createSlice({
  name: 'filter',
  initialState: initialFilterState,
  reducers: {
    setLocation: (state, action: PayloadAction<string | null>) => {
      state.location = action.payload;
    },
    setBodyType: (state, action: PayloadAction<string | null>) => {
      state.bodyType = action.payload;
    },
    setBrand: (state, action: PayloadAction<string | null>) => {
      if (state.brand === null) {
        state.brand = [];
      }
      if (action.payload !== null) {
        if (state.brand.includes(action.payload))
          state.brand = state.brand.filter((item) => item !== action.payload);
        else state.brand.push(action.payload);
      }
    },
    setOwners: (state, action: PayloadAction<string | null>) => {
      state.owners = action.payload;
    },
    setBudget: (state, action: PayloadAction<string | null>) => {
      if (state.budget === null) {
        state.budget = [];
      }
      if (action.payload !== null) {
        if (state.budget.includes(action.payload))
          state.budget = state.budget.filter((item) => item !== action.payload);
        else state.budget.push(action.payload);
      }
    },
    setFuelType: (state, action: PayloadAction<string | null>) => {
      state.fuelType = action.payload;
    },
    setTransmission: (state, action: PayloadAction<string | null>) => {
      state.transmission = action.payload;
    },
  },
});

const filteredDataSlice = createSlice({
  name: 'filteredData',
  initialState: initialFilteredDataState,
  reducers: {
    setFilteredData: (state, action: PayloadAction<CardData[]>) => {
      state.filteredData = action.payload;
    },
  },
});

export const {
  setLocation,
  setBodyType,
  setBrand,
  setOwners,
  setBudget,
  setFuelType,
  setTransmission,
} = filterSlice.actions;

export const { setFilteredData } = filteredDataSlice.actions;

export { filterSlice, filteredDataSlice };
