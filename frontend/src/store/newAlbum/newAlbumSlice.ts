import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ValidationError } from '../../types';
import { RootState } from '../../app/store';
import { addNewAlbum } from './newAlbumThunks';

interface NewAlbumState {
  data: {
    title: string;
    artist: string;
    year: string;
    image: string | null;
  };
  filename: string;
  loading: boolean;
  error: ValidationError | null;
}

const initialState: NewAlbumState = {
  data: {
    title: '',
    artist: '',
    year: '',
    image: null,
  },
  filename: '',
  loading: false,
  error: null,
};

const newAlbumSlice = createSlice({
  name: 'newAlbum',
  initialState,
  reducers: {
    updateTitle: (state, { payload: title }: PayloadAction<string>) => {
      state.data.title = title;
    },
    updateArtist: (state, { payload: artist }: PayloadAction<string>) => {
      state.data.artist = artist;
    },
    updateYear: (state, { payload: year }: PayloadAction<string>) => {
      state.data.year = year;
    },
    updateImage: (state, { payload: image }: PayloadAction<string>) => {
      state.data.image = image;
    },
    updateFilename: (state, { payload: filename }: PayloadAction<string>) => {
      state.filename = filename;
    },
    clearImage: (state) => {
      state.data.image = '';
    },
    clearForm: (state) => {
      state.data = {
        title: '',
        artist: '',
        year: '',
        image: null,
      };
      state.filename = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNewAlbum.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewAlbum.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addNewAlbum.rejected, (state, { payload: error }) => {
        state.loading = false;
        state.error = error || null;
      });
  },
});

export const newAlbumReducer = newAlbumSlice.reducer;
export const {
  updateTitle,
  updateArtist,
  updateImage,
  updateYear,
  updateFilename,
  clearImage,
  clearForm,
} = newAlbumSlice.actions;

export const selectNewAlbum = (state: RootState) => state.newAlbum.data;
export const selectNewAlbumImageFilename = (state: RootState) =>
  state.newAlbum.filename;
export const selectNewAlbumAddLoading = (state: RootState) =>
  state.newAlbum.loading;
export const selectNewAlbumAddError = (state: RootState) =>
  state.newAlbum.error;
