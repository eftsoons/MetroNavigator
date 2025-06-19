import { notifications, Store } from "@/type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const initialState: notifications = null;

export const getNotifications = createAsyncThunk(
  "notifications/getNotifications",
  async (_, { getState }) => {
    const state = getState() as Store;

    // while (!state.info.region) {
    //   await new Promise((resolve) =>
    //     setTimeout(() => {
    //       resolve(true);
    //     }, 250)
    //   );
    // }

    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/notifications`,
      {
        headers: {
          authorization: state.platform.raw,
          platform: state.platform.TypePlatform,
          region: state.info.region,
          refid: state.platform.ref,
        },
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
