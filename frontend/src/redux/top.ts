import { Store } from "@/type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const initialState: Store["top"] = null;

export const fetchTop = createAsyncThunk(
  "top/fetchTop",
  async (_, { getState }) => {
    const state = getState() as Store;

    const response = await axios.get(`${import.meta.env.VITE_API_URL}/top`, {
      headers: {
        authorization: state.platform.raw,
        platform: state.platform.TypePlatform,
        refid: state.platform.ref,
      },
    });

    return response.data.top;
  }
);

const counterSlice = createSlice({
  name: "top",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTop.fulfilled, (_, action) => {
      return action.payload;
    });
    builder.addCase(fetchTop.rejected, () => {
      return initialState;
    });
  },
});

export default counterSlice.reducer;
