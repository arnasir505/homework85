import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { ValidationError } from '../../types';
import { blobUrlToFile } from '../../utils';
import axiosApi from '../../axiosApi';
import { isAxiosError } from 'axios';

export const addNewAlbum = createAsyncThunk<
  void,
  undefined,
  { state: RootState; rejectValue: ValidationError }
>('newAlbum/add', async (_, { getState, rejectWithValue }) => {
  try {
    const title = getState().newAlbum.data.title;
    const artist = getState().newAlbum.data.artist;
    const year = getState().newAlbum.data.year;
    const image = getState().newAlbum.data.image;

    const formData = new FormData();

    formData.append('title', title);
    formData.append('artist', artist);
    formData.append('year', year);

    if (image) {
      const imageAsFile = await blobUrlToFile(image);
      formData.append('image', imageAsFile);
    }

    await axiosApi.post('/albums', formData);
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
