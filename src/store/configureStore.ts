import { configureStore } from '@reduxjs/toolkit';

import { auth, publicData } from '@/store/modules';

const store = configureStore({
  reducer: {
    auth,
    publicData,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
