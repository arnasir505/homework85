import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { RootState } from '../../app/store';
import { setDisabledBtn } from './adminSlice';

export const togglePublish = createAsyncThunk<
  void,
  { route: string; id: string },
  { state: RootState }
>('admin/togglePublish', async ({ route, id }, { dispatch }) => {
  try {
    dispatch(setDisabledBtn(id));
    await axiosApi.patch(`/${route}/${id}/togglePublished`);
    dispatch(setDisabledBtn(''));
  } catch (error) {
    throw error;
  }
});

export const deleteEntity = createAsyncThunk<
  void,
  { route: string; id: string },
  { state: RootState }
>('admin/deleteEntity', async ({ route, id }, { dispatch }) => {
  try {
    const confirmed = confirm('Delete this entity?');
    if (confirmed) {
      dispatch(setDisabledBtn(id));
      await axiosApi.delete(`/${route}/${id}`);
    }
  } catch (error) {
    throw error;
  }
});
