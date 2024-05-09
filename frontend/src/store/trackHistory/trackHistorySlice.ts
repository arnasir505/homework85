import { createSlice } from '@reduxjs/toolkit';
import { HistoryTrack } from '../../types';
import { fetchTrackHistory } from './trackHistoryThunks';
import { RootState } from '../../app/store';

interface TrackHistoryState {
  tracks: HistoryTrack[];
  loading: boolean;
  error: boolean;
}

const initialState: TrackHistoryState = {
  tracks: [],
  loading: false,
  error: false,
};

const trackHistory = createSlice({
  name: 'trackHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrackHistory.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchTrackHistory.fulfilled, (state, { payload: tracks }) => {
        state.loading = false;
        state.tracks = tracks;
      })
      .addCase(fetchTrackHistory.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const trackHistoryReducer = trackHistory.reducer;

export const selectTrackHistory = (state: RootState) =>
  state.trackHistory.tracks;
export const selectTrackHistoryLoading = (state: RootState) =>
  state.trackHistory.loading;
