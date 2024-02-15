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
    saveUserInfo: (state, action: PayloadAction<InitialStateTypes>) => {
      state = action.payload;
    },
  },
});

export const { saveUserInfo } = authSlice.actions;
export default authSlice.reducer;
