import { Store } from "@/type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import axiosRetry from "axios-retry";

axiosRetry(axios, {
  retries: Infinity,
  retryDelay: axiosRetry.exponentialDelay,
});

const initialState: Store["schemaimg"] = {
  schemadark: null,
  schemalight: null,
};

export const getSchemaDark = createAsyncThunk(
  "schema/getSchemaimgdark",
  async (raw: string | undefined) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/schemadark`,
      {
        headers: { authorization: raw },
        responseType: "blob",
      }
    );

    return URL.createObjectURL(response.data);
  }
);

export const getSchemaLight = createAsyncThunk(
  "schema/getSchemaimglight",
  async (raw: string | undefined) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/schemalight`,
      {
        headers: { authorization: raw },
        responseType: "blob",
      }
    );

    return URL.createObjectURL(response.data);
  }
);

const counterSlice = createSlice({
  name: "schemaimg",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSchemaDark.fulfilled, (state, action) => {
      state.schemadark = action.payload;
    });
    builder.addCase(getSchemaDark.rejected, () => {
      return initialState;
    });
    builder.addCase(getSchemaLight.fulfilled, (state, action) => {
      state.schemalight = action.payload;
    });
    builder.addCase(getSchemaLight.rejected, () => {
      return initialState;
    });
  },
});

export default counterSlice.reducer;
