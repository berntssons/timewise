 
import { combineReducers, legacy_createStore as createStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';

import remindersReducer from '@/features/reminders/remindersSlice';
import storage from '@/utils/storage';

const persistConfig = {
  key: 'root',
  storage,
};

// Using combineReducers and legacy createStore for compatibility with redux-persist
const rootReducer = combineReducers({
  reminders: remindersReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(persistedReducer);
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;