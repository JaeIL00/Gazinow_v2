import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { SubwayPublicDataTypes } from '@/types/apis';

export interface StationDataTypes {
  name: string;
  code: string;
}

interface InitialStateTypes {
  subwayPublicData: SubwayPublicDataTypes[];
  stationType: null | '출발역' | '도착역';
  searchResult: SubwayPublicDataTypes[];
  selectedStation: {
    departure: StationDataTypes;
    arrival: StationDataTypes;
  };
}

const initialState: InitialStateTypes = {
  subwayPublicData: [],
  stationType: null,
  searchResult: [],
  selectedStation: {
    departure: {
      name: '',
      code: '',
    },
    arrival: {
      name: '',
      code: '',
    },
  },
};

const subwaySearchSlice = createSlice({
  name: 'subwaySearch',
  initialState,
  reducers: {
    getSubwayPublicData: (state, action: PayloadAction<InitialStateTypes['subwayPublicData']>) => {
      state.subwayPublicData = action.payload;
    },
    getStationType: (state, action: PayloadAction<InitialStateTypes['stationType']>) => {
      state.stationType = action.payload;
    },
    getSearchResult: (state, action: PayloadAction<InitialStateTypes['searchResult']>) => {
      state.searchResult = action.payload;
    },
    getSeletedStation: (
      state,
      action: PayloadAction<{
        actionType: 'departure' | 'arrival';
        stationData: StationDataTypes;
      }>,
    ) => {
      const { actionType, stationData } = action.payload;
      state.selectedStation[actionType] = stationData;
    },
  },
});

export const { getSubwayPublicData, getStationType, getSearchResult, getSeletedStation } =
  subwaySearchSlice.actions;
export default subwaySearchSlice.reducer;
