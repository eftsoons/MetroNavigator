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
    const schema = localStorage.getItem("schema");

    const date = Date.now();

    const update = localStorage.getItem("update");

    if (!schema || !update || date - Number(update) >= 86400000) {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/schema`,
        {
          headers: { authorization: raw },
        }
      );

      localStorage.setItem("update", String(date));
      localStorage.setItem("schema", JSON.stringify(response.data.schema));

      return response.data.schema;
    } else {
      return JSON.parse(schema);
    }
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
