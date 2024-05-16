import { createSlice } from '@reduxjs/toolkit';
import { Track } from '../../types';
import { RootState } from '../../app/store';
import { fetchTracks, fetchTracksAdmin } from './tracksThunks';

interface TracksState {
  tracks: Track[];
  loading: boolean;
  error: boolean;
  album: {
    title: string;
    artist: {
      name: string;
    };
  } | null;
}

const initialState: TracksState = {
  tracks: [],
  loading: false,
  error: false,
  album: null,
};

const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracks.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchTracks.fulfilled, (state, { payload: tracksByAlbum }) => {
        state.loading = false;
        state.tracks = tracksByAlbum.tracks;
        state.album = tracksByAlbum.album || null;
      })
      .addCase(fetchTracks.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
    builder
      .addCase(fetchTracksAdmin.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchTracksAdmin.fulfilled, (state, { payload: tracks }) => {
        state.loading = false;
        state.tracks = tracks;
      })
      .addCase(fetchTracksAdmin.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const tracksReducer = tracksSlice.reducer;

export const selectTracks = (state: RootState) => state.tracks.tracks;
export const selectTracksLoading = (state: RootState) => state.tracks.loading;
export const selectTracksAlbumAndArtistName = (state: RootState) =>
  state.tracks.album;
