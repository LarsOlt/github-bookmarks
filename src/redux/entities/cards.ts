import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { GithubRepository } from "../../utils/github-api";

/*
  State Structure

  cards: {
    byId: {
      "card1": {
        id: "card1",
        githubData: {...},
        listIds: ["list1"...]
      },
      "card2": {...}
    },
    allIds: ["card1", "card2"]
  }
*/

type State = {
  byId: {
    [key: string]: {
      id: string;
      listIds: string[]; //FK
      githubData: GithubRepository;
    };
  };
  allIds: string[];
};

const initialState: State = {
  byId: {},
  allIds: [],
};

const cards = createSlice({
  name: "cards",
  initialState,
  reducers: {
    create: (
      state,
      action: PayloadAction<{
        githubData: GithubRepository;
        //listIds: string[]; // FK
      }>
    ) => {
      const { githubData } = action.payload;

      const newId = githubData.id.toString();

      state.byId[newId] = {
        id: newId,
        githubData,
        listIds: [],
      };

      state.allIds.push(newId);
    },
    assignToList: (
      state,
      action: PayloadAction<{
        id: string;
        listId: string;
      }>
    ) => {
      const { id, listId } = action.payload;

      state.byId[id].listIds.push(listId);
    },
    removeFromList: (
      state,
      action: PayloadAction<{
        id: string;
        listId: string;
      }>
    ) => {
      const { id, listId } = action.payload;

      const card = state.byId[id];

      card.listIds.splice(card.listIds.indexOf(listId), 1);
    },
    delete: (state, action: PayloadAction<{ id: string; listIds: string[] }>) => {
      const { id } = action.payload;

      // delete key
      delete state.byId[id];

      // remove from allIds array
      state.allIds.splice(state.allIds.indexOf(id), 1);
    },
    deleteMany: (state, action: PayloadAction<{ ids: string[] }>) => {
      const { ids } = action.payload;

      ids.forEach((id) => {
        // delete key
        delete state.byId[id];

        // remove from allIds array
        state.allIds.splice(state.allIds.indexOf(id), 1);
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase("lists/delete", (state, action:any) => {
      const { id } = action.payload;

      state.allIds.forEach((cardId) => {
        const card = state.byId[cardId];

        card.listIds.splice(card.listIds.indexOf(id), 1);
      });
    });
  },
});

export const createCard = cards.actions.create;
export const deleteCard = cards.actions.delete;
export const deleteManyCards = cards.actions.deleteMany;
export const assignToList = cards.actions.assignToList;
export const removeFromList = cards.actions.removeFromList;
export const cardsReducer = cards.reducer;
