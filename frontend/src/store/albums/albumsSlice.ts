import { createSlice } from '@reduxjs/toolkit';
import { Album } from '../../types';
import { RootState } from '../../app/store';
import { fetchAlbums } from './albumsThunks';

interface AlbumsState {
  albums: Album[];
  loading: boolean;
  error: boolean;
  artistName: string | null;
}

const initialState: AlbumsState = {
  albums: [],
  loading: false,
  error: false,
  artistName: null,
};

const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchAlbums.fulfilled, (state, { payload: albums }) => {
        state.loading = false;
        state.albums = albums;
        state.artistName = albums[0].artist.name;
      })
      .addCase(fetchAlbums.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const albumsReducer = albumsSlice.reducer;

export const selectAlbums = (state: RootState) => state.albums.albums;
export const selectAlbumsLoading = (state: RootState) => state.albums.loading;
export const selectAlbumsArtistName = (state: RootState) =>
  state.albums.artistName;
