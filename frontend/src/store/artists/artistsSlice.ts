import { createSlice } from '@reduxjs/toolkit';
import { Artist } from '../../types';
import { RootState } from '../../app/store';
import { fetchArtists, fetchArtistsAdmin } from './artistsThunks';

interface ArtistsState {
  artists: Artist[];
  loading: boolean;
  error: boolean;
}

const initialState: ArtistsState = {
  artists: [],
  loading: false,
  error: false,
};

const artistsSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtists.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchArtists.fulfilled, (state, { payload: artists }) => {
        state.loading = false;
        state.artists = artists;
      })
      .addCase(fetchArtists.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
    builder
      .addCase(fetchArtistsAdmin.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchArtistsAdmin.fulfilled, (state, { payload: artists }) => {
        state.loading = false;
        state.artists = artists;
      })
      .addCase(fetchArtistsAdmin.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const artistsReducer = artistsSlice.reducer;

export const selectArtists = (state: RootState) => state.artists.artists;
export const selectArtistsLoading = (state: RootState) => state.artists.loading;
