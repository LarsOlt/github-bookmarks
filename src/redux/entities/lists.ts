import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState: {
  title: string;
  id: string;
}[] = [];

const lists = createSlice({
  name: "lists",
  initialState,
  reducers: {
    rename: (state, action) => {
      const index = state.findIndex((state) => state.id === action.payload.id);
      state[index].title = action.payload.title;
    },
    add: (state, action) => {
      state.push({
        id: uuidv4(),
        title: action.payload.title,
      });
    },
    delete: (state, action) => {
      const index = state.findIndex((state) => state.id === action.payload.id);
      state.splice(index, 1);
    },
  },
});

export const listsActions = lists.actions;
export const listsReducer = lists.reducer;
