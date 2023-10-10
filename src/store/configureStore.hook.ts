import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';

import { AppDispatch, RootState } from '@/store/configureStore';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelect: TypedUseSelectorHook<RootState> = useSelector;
