import { configureStore } from '@reduxjs/toolkit';

import { auth, subwaySearch } from '@/store/modules';

const store = configureStore({
  reducer: {
    auth,
    subwaySearch,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
