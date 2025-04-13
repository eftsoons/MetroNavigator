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
    const cache = await caches.open("schemaimg");
    const schemadarkimg = await cache.match("/schemaimg/schemadarkimg");
    const update = localStorage.getItem("update");

    const date = Date.now();

    if (!schemadarkimg || !update || date - Number(update) >= 86400000) {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/schemadark`,
        {
          headers: { authorization: raw },
          responseType: "blob",
        }
      );

      const cache = await caches.open("schemaimg");
      const responseput = new Response(response.data, {
        headers: { "Content-Type": "image/webp" },
      });
      await cache.put("/schemaimg/schemadarkimg", responseput);

      return URL.createObjectURL(response.data);
    } else {
      return URL.createObjectURL(await schemadarkimg.blob());
    }
  }
);

export const getSchemaLight = createAsyncThunk(
  "schema/getSchemaimglight",
  async (raw: string | undefined) => {
    const cache = await caches.open("schemaimg");
    const schemalightimg = await cache.match("/schemaimg/schemalightimg");

    const update = localStorage.getItem("update");

    const date = Date.now();

    if (!schemalightimg || !update || date - Number(update) >= 86400000) {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/schemalight`,
        {
          headers: { authorization: raw },
          responseType: "blob",
        }
      );

      const cache = await caches.open("schemaimg");
      const responseput = new Response(response.data, {
        headers: { "Content-Type": "image/webp" },
      });
      await cache.put("/schemaimg/schemalightimg", responseput);

      return URL.createObjectURL(response.data);
    } else {
      return URL.createObjectURL(await schemalightimg.blob());
    }
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
