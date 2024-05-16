import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { Artist } from '../../types';

export const fetchArtists = createAsyncThunk<Artist[]>(
  'artists/fetchAll',
  async () => {
    try {
      const response = await axiosApi.get<Artist[]>('/artists');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchArtistsAdmin = createAsyncThunk<Artist[]>(
  'artists/fetchAllAdmin',
  async () => {
    try {
      const response = await axiosApi.get<Artist[]>('/artists/admin');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
