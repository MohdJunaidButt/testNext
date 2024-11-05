// store.ts
import { Middleware, combineReducers, configureStore } from '@reduxjs/toolkit';

import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import AuthReducer, {
  authFailed,
  authenticateTokenAsync,
  updateCurrency,
} from './slices/AuthSlice';
import profileDataSlice from './slices/ProfileSlice';
import ProperyFormReducer from './slices/compareSlice';
import favoritiesReducer from './slices/favorities';
import leadFormReducer from './slices/leadForm';
import searchReducer from './slices/searchSlice';

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['Auth'],
};
export const loadAuthTokenMiddleware: Middleware =
  (store) => (next) => (action) => {
    if (action.type === 'persist/REHYDRATE') {
      const currency =
        typeof window !== 'undefined' ? localStorage.getItem('currency') : null;
      if (currency)
        store.dispatch(
          updateCurrency(JSON.parse(localStorage.getItem('currency') as string))
        );
      const token =
        typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (token) store.dispatch(authenticateTokenAsync(token) as any);
      else store.dispatch(authFailed());
    }
    return next(action);
  };

const rootReducer = combineReducers({
  form: leadFormReducer,
  favorities: favoritiesReducer,
  Properties: ProperyFormReducer,
  Auth: AuthReducer,
  search: searchReducer,
  profileData: profileDataSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loadAuthTokenMiddleware),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
