import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { togglePublish } from './adminThunks';

interface AdminState {
  disabledBtn: string;
  loading: boolean;
  error: boolean;
}

const initialState: AdminState = {
  disabledBtn: '',
  loading: false,
  error: false,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setDisabledBtn: (state, { payload: id }: PayloadAction<string>) => {
      state.disabledBtn = id;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(togglePublish.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(togglePublish.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(togglePublish.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const adminReducer = adminSlice.reducer;
export const { setDisabledBtn } = adminSlice.actions;

export const selectAdminPageDisabledBtn = (state: RootState) =>
  state.admin.disabledBtn;
