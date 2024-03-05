import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface InitialStateTypes {
  nickname: string;
  email: string;
  isVerifiedUser: 'success auth' | 'fail auth' | 'yet';
}

const initialState: InitialStateTypes = {
  nickname: '',
  email: '',
  isVerifiedUser: 'yet',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveUserInfo: (
      state: InitialStateTypes,
      action: PayloadAction<Omit<InitialStateTypes, 'isVerifiedUser'>>,
    ) => {
      state.email = action.payload.email;
      state.nickname = action.payload.nickname;
    },
    getAuthorizationState: (
      state: InitialStateTypes,
      action: PayloadAction<InitialStateTypes['isVerifiedUser']>,
    ) => {
      state.isVerifiedUser = action.payload;
    },
  },
});

export const { saveUserInfo, getAuthorizationState } = authSlice.actions;
export default authSlice.reducer;
