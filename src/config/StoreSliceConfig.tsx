import { createSlice } from "@reduxjs/toolkit";

export type globalInitialStateType = {
  global: globalInitialStatePayloadType;
};
export interface globalInitialStatePayloadType {
  themeMode: "dark" | "light" | "media";
}

export const globalInitialState: globalInitialStatePayloadType = {
  themeMode: "dark", // 'dark'| 'light' | 'media'
};

const slice = createSlice({
  name: "global",
  initialState: globalInitialState,
  reducers: {},
});

export default slice;

