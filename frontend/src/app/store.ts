import storage from 'redux-persist/lib/storage';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import { usersReducer } from '../store/users/usersSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { trackHistoryReducer } from '../store/trackHistorySlice';
import { artistsReducer } from '../store/artists/artistsSlice';
import { albumsReducer } from '../store/albums/albumsSlice';

const userPersistConfig = {
  key: 'spotify:users',
  storage,
  whiteList: ['user'],
};

const rootReducer = combineReducers({
  users: persistReducer(userPersistConfig, usersReducer),
  trackHistory: trackHistoryReducer,
  artists: artistsReducer,
  albums: albumsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
