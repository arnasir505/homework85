import { createSlice } from "@reduxjs/toolkit";
import { Track } from "../types";

interface TrackHistoryState {
  tracks: Track[];
  loading: boolean;
  error: boolean;
}

const initialState: TrackHistoryState = {
  tracks: [],
  loading: false,
  error: false
}

const trackHistory = createSlice({
  name: 'trackHistory',
  initialState,
  reducers: {}
})

