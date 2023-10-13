import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { SubwayInfoResponse } from '@/types/apis';

interface InitialStateTypes {
  subwayInfo: SubwayInfoResponse;
}

const initialState: InitialStateTypes = {
  subwayInfo: [],
};

const publicDataSlice = createSlice({
  name: 'publicData',
  initialState,
  reducers: {
    getPublicSubwayInfo: (state, action: PayloadAction<SubwayInfoResponse>) => {
      state.subwayInfo = action.payload;
    },
  },
});

export const { getPublicSubwayInfo } = publicDataSlice.actions;
export default publicDataSlice.reducer;
