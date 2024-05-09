import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { Album } from '../../types';

export const fetchAlbums = createAsyncThunk<Album[]>(
  'albums/fetchAll',
  async () => {
    try {
      const response = await axiosApi.get<Album[]>(`/albums${location.search}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
