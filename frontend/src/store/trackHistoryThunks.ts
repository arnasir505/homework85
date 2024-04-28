import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../axiosApi';
import { RootState } from '../app/store';

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

    const response = await axiosApi.post('/track_history', data, config);
  } catch (error) {
    console.log(error)
  }
});
