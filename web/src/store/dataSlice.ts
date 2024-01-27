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

interface DataState {
  cardData: CardData[];
  loadedRecords: number;
  uniqueLocations: string[];
  uniqueBrands: string[];
  uniqueBodyType: string[];
}


const initialState: DataState = {
  cardData: [],
  loadedRecords: 5,
  uniqueLocations: [],
  uniqueBrands: [],
  uniqueBodyType:[]
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setCardData: (state, action: PayloadAction<CardData[]>) => {
      state.cardData = action.payload;
      state.uniqueLocations = Array.from(
        new Set(action.payload.map((card) => card.location)),
      );
      state.uniqueBrands = Array.from(
        new Set(action.payload.map((card) => card.brand)),
      );
      state.uniqueBodyType = Array.from(
        new Set(action.payload.map((card) => card.bodyType)),
      );
    },
    setLoadedRecords: (state, action: PayloadAction<number>) => {
      state.loadedRecords = action.payload;
    },
    addCard: (state, action: PayloadAction<CardData>) => {
      state.cardData.push(action.payload);
    },
    updateCard: (state, action: PayloadAction<CardData>) => {
      const updatedCardIndex = state.cardData.findIndex(
        (card) => card.id === action.payload.id,
      );
      if (updatedCardIndex !== -1) {
        state.cardData[updatedCardIndex] = action.payload;
      }
    },
  },
});

export const { setCardData, setLoadedRecords, addCard, updateCard } = dataSlice.actions;
export default dataSlice;
