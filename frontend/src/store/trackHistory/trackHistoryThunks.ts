import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { HistoryTrack } from '../../types';

export const addTrackToHistory = createAsyncThunk<void, string>(
  'trackHistory/add',
  async (trackId) => {
    try {
      await axiosApi.post('/track_history', {
        track: trackId,
      });
    } catch (error) {
      throw error;
    }
  }
);

export const fetchTrackHistory = createAsyncThunk<HistoryTrack[]>(
  'trackHistory/fetchAll',
  async () => {
    try {
      const response = await axiosApi.get<HistoryTrack[]>('/track_history');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
