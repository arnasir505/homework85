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
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { usersReducer } from '../store/users/usersSlice';
import { trackHistoryReducer } from '../store/trackHistory/trackHistorySlice';
import { artistsReducer } from '../store/artists/artistsSlice';
import { albumsReducer } from '../store/albums/albumsSlice';
import { tracksReducer } from '../store/tracks/tracksSlice';
import { newArtistReducer } from '../store/newArtist/newArtistSlice';
import { newAlbumReducer } from '../store/newAlbum/newAlbumSlice';

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
  tracks: tracksReducer,
  newArtist: newArtistReducer,
  newAlbum: newAlbumReducer,
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
