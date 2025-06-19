import { Store } from "@/type";
import { createSlice } from "@reduxjs/toolkit";

import { backButton } from "@telegram-apps/sdk-react";

const initialState: Store["platform"] = {
  TypePlatform: null,
  AppPlatform: "",
  raw: null,
  user: null,
  startParam: null,
  isDark: false,
  ref: null,
};

const savefunbackbutton = [] as Array<() => void>;

const counterSlice = createSlice({
  name: "platfrom",
  initialState: initialState,
  reducers: {
    setPlatform: (state, action) => {
      state.TypePlatform = action.payload;
    },
    setAppPlatform: (state, action) => {
      state.AppPlatform = action.payload;
    },
    setAppRaw: (state, action) => {
      state.raw = action.payload;
    },
    setInfoUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    setstartParam: (state, action) => {
      state.startParam = action.payload;
    },
    setisDark: (state, action) => {
      state.isDark = action.payload;
    },
    backfunctionpush: (state, action) => {
      //гавнокодом пахнет, но самое главное, что работает
      if (!savefunbackbutton.includes(action.payload)) {
        savefunbackbutton.push(action.payload);
      }

      if (state.offbackfunction) {
        state.offbackfunction();
      }

      if (state.TypePlatform == "tg") {
        if (savefunbackbutton.length != 0) {
          backButton.show();
        } else {
          backButton.hide();
        }
      }

      if (state.TypePlatform == "tg") {
        state.offbackfunction = backButton.onClick(() => {
          if (savefunbackbutton[savefunbackbutton.length - 1]) {
            savefunbackbutton[savefunbackbutton.length - 1]();
          }

          if (savefunbackbutton.length == 0) {
            backButton.hide();
          }
        });
      }
    },
    backfunctiondeleted: (state) => {
      savefunbackbutton.pop();

      if (state.TypePlatform == "tg") {
        if (savefunbackbutton.length == 0) {
          backButton.hide();
        }
      }
    },
    backfunctiondeletedall: (state) => {
      savefunbackbutton.splice(0, savefunbackbutton.length);

      if (state.TypePlatform == "tg") {
        backButton.hide();
      }
    },
    setRef: (state, action) => {
      state.ref = action.payload;
    },
  },
});

export const {
  setAppPlatform,
  setPlatform,
  setAppRaw,
  setInfoUser,
  setstartParam,
  setisDark,
  backfunctionpush,
  backfunctiondeleted,
  backfunctiondeletedall,
  setRef,
} = counterSlice.actions;

export default counterSlice.reducer;
