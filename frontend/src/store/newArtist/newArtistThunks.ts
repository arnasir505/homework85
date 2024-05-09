import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { ValidationError } from '../../types';
import { blobUrlToFile } from '../../utils';
import axiosApi from '../../axiosApi';
import { isAxiosError } from 'axios';

export const addNewArtist = createAsyncThunk<
  void,
  undefined,
  { state: RootState; rejectValue: ValidationError}
>('newArtist/add', async (_, { getState, rejectWithValue }) => {
  try {
    const name = getState().newArtist.data.name;
    const information = getState().newArtist.data.information;
    const image = getState().newArtist.data.image;

    const formData = new FormData();

    formData.append('name', name);
    formData.append('information', information);

    if (image) {
      const imageAsFile = await blobUrlToFile(image);
      formData.append('image', imageAsFile);
    }

    await axiosApi.post('/artists', formData);
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
