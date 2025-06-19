import { Store } from "@/type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const initialState: Store["schema"] = null;

export const getSchema = createAsyncThunk(
  "schema/getSchema",
  async (_, { getState }) => {
    const state = getState() as Store;

    // while (!state.info.region) {
    //   await new Promise((resolve) =>
    //     setTimeout(() => {
    //       resolve(true);
    //     }, 250)
    //   );
    // }

    const schema = localStorage.getItem(`schema/${state.info.region}`);

    const date = Date.now();

    const update = localStorage.getItem("update");

    if (!schema || !update || date - Number(update) >= 86400000) {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/schema`,
        {
          headers: {
            authorization: state.platform.raw,
            platform: state.platform.TypePlatform,
            region: state.info.region,
            refid: state.platform.ref,
          },
        }
      );

      localStorage.setItem("update", String(date));
      localStorage.setItem(
        `schema/${state.info.region}`,
        JSON.stringify(response.data.schema)
      );

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
