import { Store } from "@/type";
import { createSlice, isRejected } from "@reduxjs/toolkit";

const initialState: Store["info"] = {
  coordmap: { iscenter: true },
  saveroutes: {},
  swiperindex: 0,
  Astation: null,
  Bstation: null,
  timeouterror: false,
  snackbar: null,
  region: null,
  infostation: null,
  infoselectstation: 0,
  searchstation: null,
  nodes: [],
  selectnode: 0,
  activestation: [],
  openmenucity: false,
};

const counterSlice = createSlice({
  name: "info",
  initialState: initialState,
  reducers: {
    setcoord: (state, action) => {
      state.coordmap = action.payload;
    },
    setswiperindex: (state, action) => {
      state.swiperindex = action.payload;
    },
    setAstation: (state, action) => {
      state.Astation = action.payload;
    },
    setBstation: (state, action) => {
      state.Bstation = action.payload;
    },
    setsaveroutes: (state, action) => {
      state.saveroutes[action.payload.name] = action.payload.nodes;
    },
    setRegion: (state, action) => {
      state.region = action.payload;
    },
    setsnackbar: (state, action) => {
      state.snackbar = action.payload;
    },
    setinfostation: (state, action) => {
      state.infostation = action.payload;
    },
    setinfoselectstation: (state, action) => {
      state.infoselectstation = action.payload;
    },
    setsearchstation: (state, action) => {
      state.searchstation = action.payload;
    },
    setnodes: (state, action) => {
      state.nodes = action.payload;
    },
    setselectnode: (state, action) => {
      state.selectnode = action.payload;
    },
    setactivestation: (state, action) => {
      state.activestation = action.payload;
    },
    setopenmenucity: (state, action) => {
      state.openmenucity = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(isRejected, (state, action) => {
      const error = action.error.message;
      if (error == "Request failed with status code 408") {
        state.timeouterror = true;
      } else {
        state.timeouterror = false;
      }
    });
  },
});

export const {
  setcoord,
  setswiperindex,
  setAstation,
  setBstation,
  setsaveroutes,
  setsnackbar,
  setRegion,
  setinfostation,
  setinfoselectstation,
  setsearchstation,
  setnodes,
  setselectnode,
  setactivestation,
  setopenmenucity,
} = counterSlice.actions;

export default counterSlice.reducer;
