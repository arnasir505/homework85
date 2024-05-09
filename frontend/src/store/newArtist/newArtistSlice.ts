import { createSlice } from "@reduxjs/toolkit";

const initialState = {}

const newArtistSlice = createSlice({
  name: 'newArtist',
  initialState,
  reducers: {}
})

export const newArtistReducer = newArtistSlice.reducer;