import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../axiosApi';
import { RootState } from '../app/store';
import { HistoryTrack } from '../types';

export const addTrackToHistory = createAsyncThunk<
  void,
  string,
  { state: RootState }
>('trackHistory/add', async (trackId, thunkApi) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${thunkApi.getState().users.user?.token}`,
      },
    };
    const data = {
      track: trackId,
    };

    await axiosApi.post('/track_history', data, config);
  } catch (error) {
    console.log(error);
  }
});

export const fetchTrackHistory = createAsyncThunk<
  HistoryTrack[],
  string
>('trackHistory/fetchAll', async (token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axiosApi.get<HistoryTrack[]>(
      '/track_history',
      config
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error
  }
});
