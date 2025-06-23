import { filterstation, Store } from "@/type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const initialState: Store["userinfo"] = {
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
  ref: [],
  countroutes: 0,
  refcount: 0,
  info: null,
};

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, { getState }) => {
    const state = getState() as Store;

    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/profile`,
      {
        headers: {
          authorization: state.platform.raw,
          platform: state.platform.TypePlatform,
          region: state.info.region,
          refid: state.platform.ref,
        },
      }
    );

    return response.data.profile;
  }
);

export const setFilter = createAsyncThunk(
  "user/setFilter",
  async (
    {
      filter,
    }: {
      filter?: filterstation;
    },
    { getState }
  ) => {
    const state = getState() as Store;

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/setfilter`,
      { typefilter: filter },
      {
        headers: {
          authorization: state.platform.raw,
          platform: state.platform.TypePlatform,
          region: state.info.region,
          refid: state.platform.ref,
        },
      }
    );

    return response.data.filter;
  }
);

export const setTypeNodes = createAsyncThunk(
  "user/setTypeNodes",
  async (
    {
      typenodes,
    }: {
      typenodes: number;
    },
    { getState }
  ) => {
    const state = getState() as Store;

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/settypenodes`,
      { typenodes: typenodes },
      {
        headers: {
          authorization: state.platform.raw,
          platform: state.platform.TypePlatform,
          region: state.info.region,
          refid: state.platform.ref,
        },
      }
    );

    return response.data.typenodes;
  }
);

export const setUserShowTop = createAsyncThunk(
  "user/setUserShowTop",
  async (_, { getState }) => {
    const state = getState() as Store;

    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/showtop`,
      {
        headers: {
          authorization: state.platform.raw,
          platform: state.platform.TypePlatform,
          region: state.info.region,
          refid: state.platform.ref,
        },
      }
    );

    return response.data.showtop;
  }
);

export const Uptime = createAsyncThunk(
  "user/Uptime",
  async (_, { getState }) => {
    const state = getState() as Store;

    const response = await axios.get(`${import.meta.env.VITE_API_URL}/time`, {
      headers: {
        authorization: state.platform.raw,
        platform: state.platform.TypePlatform,
        region: state.info.region,
        refid: state.platform.ref,
      },
    });

    return response.data.time;
  }
);

export const setFavoritesSave = createAsyncThunk(
  "user/setFavoritesSave",
  async (
    {
      stationid,
    }: {
      stationid: number;
    },
    { getState }
  ) => {
    const state = getState() as Store;

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/favoritessave`,
      { favoritesstationid: stationid },
      {
        headers: {
          authorization: state.platform.raw,
          platform: state.platform.TypePlatform,
          region: state.info.region,
          refid: state.platform.ref,
        },
      }
    );

    return response.data.favoritessave;
  }
);

export const clearRouteSave = createAsyncThunk(
  "user/clearRouteSave",
  async (_, { getState }) => {
    const state = getState() as Store;

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/clearroutersave`,
      {},
      {
        headers: {
          authorization: state.platform.raw,
          platform: state.platform.TypePlatform,
          region: state.info.region,
        },
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
    setInfoUser: (state, action) => {
      state.info = { ...state.info, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      return { ...action.payload, info: state.info };
    });
    builder.addCase(fetchUser.rejected, (state) => {
      return { ...initialState, info: state.info };
    });
    builder.addCase(setFilter.fulfilled, (state, action) => {
      state.filter = action.payload;
    });
    builder.addCase(setFilter.rejected, (state) => {
      return { ...state, filter: initialState.filter };
    });
    builder.addCase(setTypeNodes.fulfilled, (state, action) => {
      state.typenodes = action.payload;
    });
    builder.addCase(setTypeNodes.rejected, (state) => {
      return { ...state, typenodes: initialState.typenodes };
    });
    builder.addCase(setUserShowTop.fulfilled, (state, action) => {
      state.showtop = action.payload;
    });
    builder.addCase(setUserShowTop.rejected, (state) => {
      return { ...state, showtop: initialState.showtop };
    });
    builder.addCase(Uptime.fulfilled, (state, action) => {
      state.time = action.payload;
    });
    builder.addCase(Uptime.rejected, (state) => {
      return { ...state, time: initialState.time };
    });
    builder.addCase(setFavoritesSave.fulfilled, (state, action) => {
      state.favoritessave = action.payload;
    });
    builder.addCase(setFavoritesSave.rejected, (state) => {
      return { ...state, favoritessave: initialState.favoritessave };
    });
    builder.addCase(clearRouteSave.fulfilled, (state, action) => {
      state.routesave = action.payload;
    });
    builder.addCase(clearRouteSave.rejected, (state) => {
      return { ...state, routesave: initialState.routesave };
    });
  },
});

export const { setuserinfotimeadd, setuserroutesave, setInfoUser } =
  counterSlice.actions;

export default counterSlice.reducer;
