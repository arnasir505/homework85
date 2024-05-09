import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { TracksByAlbum } from '../../types';

export const fetchTracks = createAsyncThunk<TracksByAlbum>(
  'tracks/fetchAll',
  async () => {
    try {
      const response = await axiosApi.get<TracksByAlbum>(
        `/tracks${location.search}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
