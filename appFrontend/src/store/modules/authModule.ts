import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface InitialStateTypes {
  nickname: string;
  email: string;
}

const initialState: InitialStateTypes = {
  nickname: '',
  email: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveUserInfo: (state: InitialStateTypes, action: PayloadAction<InitialStateTypes>) => {
      state.email = action.payload.email;
      state.nickname = action.payload.nickname;
    },
  },
});

export const { saveUserInfo } = authSlice.actions;
export default authSlice.reducer;
