import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ValidationError } from '../../types';
import { RootState } from '../../app/store';
import { addNewTrack } from './newTrackThunks';

interface NewTrackState {
  data: {
    title: string;
    artist: string;
    album: string;
    duration: string;
  };
  loading: boolean;
  error: ValidationError | null;
}

const initialState: NewTrackState = {
  data: {
    title: '',
    artist: '',
    album: '',
    duration: '',
  },
  loading: false,
  error: null,
};

const newTrackSlice = createSlice({
  name: 'newTrack',
  initialState,
  reducers: {
    updateTitle: (state, { payload: title }: PayloadAction<string>) => {
      state.data.title = title;
    },
    updateArtist: (state, { payload: artist }: PayloadAction<string>) => {
      state.data.artist = artist;
    },
    updateAlbum: (state, { payload: album }: PayloadAction<string>) => {
      state.data.album = album;
    },
    updateDuration: (state, { payload: duration }: PayloadAction<string>) => {
      state.data.duration = duration;
    },
    clearForm: (state) => {
      state.data = {
        title: '',
        artist: '',
        album: '',
        duration: '',
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNewTrack.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewTrack.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addNewTrack.rejected, (state, { payload: error }) => {
        state.loading = false;
        state.error = error || null;
      });
  },
});

export const newTrackReducer = newTrackSlice.reducer;
export const {
  updateTitle,
  updateArtist,
  updateAlbum,
  updateDuration,
  clearForm,
} = newTrackSlice.actions;

export const selectNewTrack = (state: RootState) => state.newTrack.data;
export const selectNewTrackAddLoading = (state: RootState) =>
  state.newTrack.loading;
export const selectNewTrackAddError = (state: RootState) =>
  state.newTrack.error;
