import { RawSubwayLineName } from '@/global/apis/entity';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface StationDataTypes {
  stationName: string;
  stationLine: RawSubwayLineName;
}

interface InitialStateTypes {
  stationType: null | '출발역' | '도착역';
  searchText: string;
  selectedStation: {
    departure: StationDataTypes;
    arrival: StationDataTypes;
  };
  issueId: number | null;
}

const initialState: InitialStateTypes = {
  stationType: null,
  searchText: '',
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
  issueId: null,
};

const stationSearchSlice = createSlice({
  name: 'stationSearch',
  initialState,
  reducers: {
    getStationType: (state, action: PayloadAction<InitialStateTypes['stationType']>) => {
      state.stationType = action.payload;
    },
    getSearchText: (state, action: PayloadAction<InitialStateTypes['searchText']>) => {
      state.searchText = action.payload;
    },
    getSeletedStation: (state, action: PayloadAction<InitialStateTypes['selectedStation']>) => {
      state.selectedStation = action.payload;
    },
    swapStation: (state, action: PayloadAction<InitialStateTypes['selectedStation']>) => {
      state.selectedStation = {
        departure: action.payload.arrival,
        arrival: action.payload.departure,
      };
    },
    initialize: (state) => {
      state.stationType = null;
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
    getIssueId: (state, action: PayloadAction<InitialStateTypes['issueId']>) => {
      state.issueId = action.payload;
    },
  },
});

export const {
  swapStation,
  getStationType,
  getSearchText,
  getSeletedStation,
  initialize,
  getIssueId,
} = stationSearchSlice.actions;
export default stationSearchSlice.reducer;
