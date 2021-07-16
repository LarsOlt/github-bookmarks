import { createSlice } from "@reduxjs/toolkit";
const initialState: {
  githubData: { [key: string]: any };
  listId: string; // FK
}[] = [];

const cards = createSlice({
  name: "cards",
  initialState,
  reducers: {
    create: (state, action) => {
      state.push({
        githubData: action.payload.githubData,
        listId: action.payload.listId,
      });
    },
    assignToList: (state, action) => {
      const index = state.findIndex(
        (state) => state.githubData.id === action.payload.githubData.id
      );
      state[index].listId = action.payload.listId;
    },
    delete: (state, action) => {
      const index = state.findIndex(
        (state) => state.githubData.id === action.payload.githubData.id
      );
      state.splice(index, 1);
    },
  },
});

export const cardsActions = cards.actions;
export const cardsReducer = cards.reducer;
