import { filterstation, Store } from "@/type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import axiosRetry from "axios-retry";

axiosRetry(axios, {
  retries: Infinity,
  retryDelay: axiosRetry.exponentialDelay,
});

const initialState: Store["userinfo"] = {
  loaded: false,
  showtop: false,
  filter: {
    BANK: false,
    COFFEE: false,
    SALES: false,
    PARKING: false,
    CANDY: false,
    ELEVATOR: false,
    BATTERY: false,
    FOOD: false,
    FLOWERS: false,
    CARRIER: false,
    VENDING: false,
    INVALID: false,
    TOILET: false,
    INFO: false,
    PRINT: false,
    OPTICS: false,
    THEATRE: false,
  },
  typenodes: 0,
  time: 0,
  favoritessave: [],
  routesave: [],
};

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (raw: string | undefined) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/profile`,
      {
        headers: { authorization: raw },
      }
    );

    return response.data.profile;
  }
);

export const setFilter = createAsyncThunk(
  "user/setFilter",
  async ({
    raw,
    filter,
  }: {
    raw: string | undefined;
    filter?: filterstation;
  }) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/setfilter`,
      { typefilter: filter },
      {
        headers: { authorization: raw },
      }
    );

    return response.data.filter;
  }
);

export const setTypeNodes = createAsyncThunk(
  "user/setTypeNodes",
  async ({
    raw,
    typenodes,
  }: {
    raw: string | undefined;
    typenodes: number;
  }) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/settypenodes`,
      { typenodes: typenodes },
      {
        headers: { authorization: raw },
      }
    );

    return response.data.typenodes;
  }
);

export const setUserShowTop = createAsyncThunk(
  "user/setUserShowTop",
  async (raw: string | undefined) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/showtop`,
      {
        headers: { authorization: raw },
      }
    );

    return response.data.showtop;
  }
);

export const Uptime = createAsyncThunk(
  "user/Uptime",
  async (raw: string | undefined) => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/time`, {
      headers: { authorization: raw },
    });

    return response.data.time;
  }
);

export const setFavoritesSave = createAsyncThunk(
  "user/setFavoritesSave",
  async ({
    raw,
    stationid,
  }: {
    raw: string | undefined;
    stationid: number;
  }) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/favoritessave`,
      { favoritesstationid: stationid },
      {
        headers: { authorization: raw },
      }
    );

    return response.data.favoritessave;
  }
);

export const clearRouteSave = createAsyncThunk(
  "user/clearRouteSave",
  async (raw: string | undefined) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/clearroutersave`,
      {},
      {
        headers: { authorization: raw },
      }
    );

    return response.data.routesave;
  }
);

const counterSlice = createSlice({
  name: "userinfo",
  initialState: initialState,
  reducers: {
    setuserinfotimeadd: (state) => {
      state.time += 1;
    },
    setuserroutesave: (state, action) => {
      state.routesave = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (_, action) => {
      return { ...action.payload, loaded: true };
    });
    builder.addCase(fetchUser.rejected, () => {
      return initialState;
    });
    builder.addCase(setFilter.fulfilled, (state, action) => {
      state.filter = action.payload;
    });
    builder.addCase(setFilter.rejected, () => {
      return initialState;
    });
    builder.addCase(setTypeNodes.fulfilled, (state, action) => {
      state.typenodes = action.payload;
    });
    builder.addCase(setTypeNodes.rejected, () => {
      return initialState;
    });
    builder.addCase(setUserShowTop.fulfilled, (state, action) => {
      state.showtop = action.payload;
    });
    builder.addCase(setUserShowTop.rejected, () => {
      return initialState;
    });
    builder.addCase(Uptime.fulfilled, (state, action) => {
      state.time = action.payload;
    });
    builder.addCase(Uptime.rejected, () => {
      return initialState;
    });
    builder.addCase(setFavoritesSave.fulfilled, (state, action) => {
      state.favoritessave = action.payload;
    });
    builder.addCase(setFavoritesSave.rejected, () => {
      return initialState;
    });
    builder.addCase(clearRouteSave.fulfilled, (state, action) => {
      state.routesave = action.payload;
    });
    builder.addCase(clearRouteSave.rejected, () => {
      return initialState;
    });
  },
});

export const { setuserinfotimeadd, setuserroutesave } = counterSlice.actions;

export default counterSlice.reducer;
