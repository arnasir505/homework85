import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ValidationError } from '../../types';
import { RootState } from '../../app/store';
import { addNewArtist } from './newArtistThunks';

interface NewArtistState {
  data: {
    name: string;
    information: string;
    image: string | null;
  };
  filename: string;
  loading: boolean;
  error: ValidationError | null;
}

const initialState: NewArtistState = {
  data: {
    name: '',
    information: '',
    image: null,
  },
  filename: '',
  loading: false,
  error: null,
};

const newArtistSlice = createSlice({
  name: 'newArtist',
  initialState,
  reducers: {
    updateName: (state, { payload: name }: PayloadAction<string>) => {
      state.data.name = name;
    },
    updateInformation: (
      state,
      { payload: information }: PayloadAction<string>
    ) => {
      state.data.information = information;
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
        name: '',
        information: '',
        image: null,
      };
      state.filename = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNewArtist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewArtist.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addNewArtist.rejected, (state, { payload: error }) => {
        state.loading = false;
        state.error = error || null;
      });
  },
});

export const newArtistReducer = newArtistSlice.reducer;
export const {
  updateName,
  updateInformation,
  updateImage,
  updateFilename,
  clearImage,
  clearForm,
} = newArtistSlice.actions;

export const selectNewArtist = (state: RootState) => state.newArtist.data;
export const selectNewArtistImageFilename = (state: RootState) =>
  state.newArtist.filename;
export const selectNewArtistAddLoading = (state: RootState) =>
  state.newArtist.loading;
export const selectNewArtistAddError = (state: RootState) =>
  state.newArtist.error;
