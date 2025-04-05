import { Store } from "@/type";
import { createSlice, isRejected } from "@reduxjs/toolkit";

import { backButton } from "@telegram-apps/sdk-react";

const initialState: Store["info"] = {
  coordmap: { iscenter: true },
  saveroutes: {},
  swiperindex: 0,
  date: new Date().toString(),
  Astation: null,
  Bstation: null,
  timeouterror: false,
};

const savefunbackbutton = [] as Array<() => void>;

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
    setinfodate: (state, action) => {
      state.date = action.payload;
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
    backfunctionpush: (state, action) => {
      //гавнокодом пахнет, но самое главное, что работает
      if (!savefunbackbutton.includes(action.payload)) {
        savefunbackbutton.push(action.payload);
      }

      if (state.offbackfunction) {
        state.offbackfunction();
      }

      if (savefunbackbutton.length != 0) {
        backButton.show();
      } else {
        backButton.hide();
      }

      state.offbackfunction = backButton.onClick(() => {
        if (savefunbackbutton[savefunbackbutton.length - 1]) {
          savefunbackbutton[savefunbackbutton.length - 1]();
        }

        if (savefunbackbutton.length == 0) {
          backButton.hide();
        }
      });
    },
    backfunctiondeleted: () => {
      savefunbackbutton.pop();

      if (savefunbackbutton.length == 0) {
        backButton.hide();
      }
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
  setinfodate,
  setAstation,
  setBstation,
  setsaveroutes,
  backfunctionpush,
  backfunctiondeleted,
} = counterSlice.actions;

export default counterSlice.reducer;
