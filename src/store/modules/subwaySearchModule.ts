import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { SubwayInfoResponse } from '@/types/apis';

interface InitialStateTypes {
  subwayPublicData: SubwayInfoResponse;
  stationType: null | '출발' | '도착';
  searchResult: SubwayInfoResponse;
}

const initialState: InitialStateTypes = {
  subwayPublicData: [],
  stationType: null,
  searchResult: [],
};

const subwaySearchSlice = createSlice({
  name: 'subwaySearch',
  initialState,
  reducers: {
    getSubwayPublicData: (state, action: PayloadAction<SubwayInfoResponse>) => {
      state.subwayPublicData = action.payload;
    },
    getStationType: (state, action: PayloadAction<InitialStateTypes['stationType']>) => {
      state.stationType = action.payload;
    },
    getSearchResult: (state, action: PayloadAction<InitialStateTypes['searchResult']>) => {
      state.searchResult = action.payload;
    },
  },
});

export const { getSubwayPublicData, getStationType, getSearchResult } = subwaySearchSlice.actions;
export default subwaySearchSlice.reducer;
