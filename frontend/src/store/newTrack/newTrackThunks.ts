import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { ValidationError } from '../../types';
import axiosApi from '../../axiosApi';
import { isAxiosError } from 'axios';

export const addNewTrack = createAsyncThunk<
  void,
  undefined,
  { state: RootState; rejectValue: ValidationError }
>('newTrack/add', async (_, { getState, rejectWithValue }) => {
  try {
    const title = getState().newTrack.data.title;
    const album = getState().newTrack.data.album;
    const duration = getState().newTrack.data.duration;

    const trackData = {
      title: title,
      album: album,
      duration: duration,
    };

    await axiosApi.post('/tracks', trackData);
  } catch (error) {
    if (
      isAxiosError(error) &&
      error.response &&
      error.response.status === 422
    ) {
      return rejectWithValue(error.response.data as ValidationError);
    }
    throw error;
  }
});
