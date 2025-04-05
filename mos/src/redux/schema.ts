import { Store } from "@/type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import axiosRetry from "axios-retry";

axiosRetry(axios, {
  retries: Infinity,
  retryDelay: axiosRetry.exponentialDelay,
});

const initialState: Store["schema"] = null;

export const getSchema = createAsyncThunk(
  "schema/getSchema",
  async (raw: string | undefined) => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/schema`, {
      headers: { authorization: raw },
    });

    return response.data.schema;
  }
);

const counterSlice = createSlice({
  name: "schema",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSchema.fulfilled, (_, action) => {
      return action.payload;
    });
    builder.addCase(getSchema.rejected, () => {
      return initialState;
    });
  },
});

export default counterSlice.reducer;
