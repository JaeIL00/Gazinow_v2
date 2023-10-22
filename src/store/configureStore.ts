import { configureStore } from '@reduxjs/toolkit';

import { auth, publicData, subwaySearch } from '@/store/modules';

const store = configureStore({
  reducer: {
    auth,
    publicData,
    subwaySearch,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
