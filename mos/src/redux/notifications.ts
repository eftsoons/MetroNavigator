import { notifications } from "@/type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import axiosRetry from "axios-retry";

axiosRetry(axios, {
  retries: Infinity,
  retryDelay: axiosRetry.exponentialDelay,
});

const initialState: notifications = null;

export const getNotifications = createAsyncThunk(
  "notifications/getNotifications",
  async (raw: string | undefined) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/notifications`,
      {
        headers: { authorization: raw },
      }
    );

    return response.data.notifications;
  }
);

const counterSlice = createSlice({
  name: "notifications",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNotifications.fulfilled, (_, action) => {
      return action.payload;
    });
    builder.addCase(getNotifications.rejected, () => {
      return initialState;
    });
  },
});

export default counterSlice.reducer;
