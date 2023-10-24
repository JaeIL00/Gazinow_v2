import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { SubwayInfoResponse } from '@/types/apis';

interface InitialStateTypes {
  stationType: null | '출발' | '도착';
  searchResult: SubwayInfoResponse;
}

const initialState: InitialStateTypes = {
  stationType: null,
  searchResult: [],
};

const subwaySearchSlice = createSlice({
  name: 'subwaySearch',
  initialState,
  reducers: {
    getStationType: (state, action: PayloadAction<InitialStateTypes['stationType']>) => {
      state.stationType = action.payload;
    },
    getSearchResult: (state, action: PayloadAction<InitialStateTypes['searchResult']>) => {
      state.searchResult = action.payload;
    },
  },
});

export const { getStationType, getSearchResult } = subwaySearchSlice.actions;
export default subwaySearchSlice.reducer;
