import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { Track, TracksByAlbum } from '../../types';

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

export const fetchTracksAdmin = createAsyncThunk<Track[]>(
  'tracks/fetchAllAdmin',
  async () => {
    try {
      const response = await axiosApi.get<Track[]>(`/tracks/admin`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
