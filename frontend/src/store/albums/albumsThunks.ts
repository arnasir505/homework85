import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { Album } from '../../types';

export const fetchAlbums = createAsyncThunk<Album[], string | undefined>(
  'albums/fetchAll',
  async (artistId) => {
    try {
      const response = await axiosApi.get<Album[]>(
        artistId ? `/albums?artist=${artistId}` : `/albums${location.search}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
