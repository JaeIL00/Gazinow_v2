import { SubwayLine } from '@/global/apis/entity';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface StationDataTypes {
  stationName: string;
  stationLine: SubwayLine;
}

interface InitialStateTypes {
  stationType: null | '출발역' | '도착역';
  searchText: string;
  isSearchedPath: boolean;
  selectedStation: {
    departure: StationDataTypes;
    arrival: StationDataTypes;
  };
}

const initialState: InitialStateTypes = {
  stationType: null,
  searchText: '',
  isSearchedPath: false,
  selectedStation: {
    departure: {
      stationName: '',
      stationLine: null,
    },
    arrival: {
      stationName: '',
      stationLine: null,
    },
  },
};

const subwaySearchSlice = createSlice({
  name: 'subwaySearch',
  initialState,
  reducers: {
    getStationType: (state, action: PayloadAction<InitialStateTypes['stationType']>) => {
      state.stationType = action.payload;
    },
    getSearchText: (state, action: PayloadAction<InitialStateTypes['searchText']>) => {
      state.searchText = action.payload;
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
    changeIsSearchedPath: (state, action: PayloadAction<boolean>) => {
      state.isSearchedPath = action.payload;
    },
    initialize: (state) => {
      state.isSearchedPath = false;
      state.selectedStation = {
        departure: {
          stationName: '',
          stationLine: null,
        },
        arrival: {
          stationName: '',
          stationLine: null,
        },
      };
      state.stationType = null;
    },
  },
});

export const {
  getStationType,
  getSearchText,
  getSeletedStation,
  changeIsSearchedPath,
  initialize,
} = subwaySearchSlice.actions;
export default subwaySearchSlice.reducer;
