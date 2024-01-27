import { configureStore } from '@reduxjs/toolkit';
import dataSlice from './dataSlice';
import { filterSlice, filteredDataSlice } from './filterSlice';

const store = configureStore({
  reducer: {
    data: dataSlice.reducer,
    filter: filterSlice.reducer,
    filteredData: filteredDataSlice.reducer,
  },
});

export default store;
