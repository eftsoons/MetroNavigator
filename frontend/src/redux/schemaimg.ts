import { Store } from "@/type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const initialState: Store["schemaimg"] = { img: null };

export const getSchemaImg = createAsyncThunk(
  "schema/getSchemaImg",
  async (_, { getState }) => {
    const state = getState() as Store;

    const cache = await caches.open("schemaimg");
    const schemaimg = await cache.match(`/schemaimg/${state.info.region}`);
    const update = localStorage.getItem("update");

    const date = Date.now();

    // while (!state.info.region) {
    //   await new Promise((resolve) =>
    //     setTimeout(() => {
    //       resolve(true);
    //     }, 250)
    //   );
    // }

    if (!schemaimg || !update || date - Number(update) >= 86400000) {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/schemaimg`,
        {
          headers: {
            authorization: state.platform.raw,
            platform: state.platform.TypePlatform,
            region: state.info.region,
            refid: state.platform.ref,
          },
          responseType: "blob",
        }
      );

      const cache = await caches.open("schemaimg");
      const responseput = new Response(response.data, {
        headers: { "Content-Type": "image/webp" },
      });
      await cache.put(`/schemaimg/${state.info.region}`, responseput);

      return URL.createObjectURL(response.data);
    } else {
      return URL.createObjectURL(await schemaimg.blob());
    }
  }
);

const counterSlice = createSlice({
  name: "schemaimg",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSchemaImg.fulfilled, (state, action) => {
      state.img = action.payload;
    });
    builder.addCase(getSchemaImg.rejected, () => {
      return initialState;
    });
  },
});

export default counterSlice.reducer;
