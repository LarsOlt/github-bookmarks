import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { deleteCard, assignToList, removeFromList } from "./cards";

/*
  State Structure

  lists: {
    byId: {
      "list1": {
        id: "list1",
        cardIds: ["card1", "card2", ...]
      },
      "list2": {...}
    },
    allIds: ["list1", "list2"]
  }
*/

type State = {
  byId: {
    [key: string]: {
      id: string;
      title: string;
      cardIds: string[];
    };
  };
  allIds: string[];
};

const initialState: State = {
  byId: {
  },
  allIds: [],
};

const lists = createSlice({
  name: "lists",
  initialState,
  reducers: {
    rename: (state, action: PayloadAction<{ id: string; title: string }>) => {
      const { id, title } = action.payload;
      state.byId[id].title = title;
    },
    create: (state, action: PayloadAction<{ title: string }>) => {
      const newId = uuidv4();
      const { title } = action.payload;

      state.byId[newId] = {
        id: newId,
        title,
        cardIds: [],
      };

      state.allIds.push(newId);
    },
    delete: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;

      // delete key
      delete state.byId[id];

      // remove from allIds array
      state.allIds.splice(state.allIds.indexOf(id), 1);
    },
    changeCardsOrder: (state, action: PayloadAction<{ cardIds: string[]; listId: string }>) => {
      const { cardIds, listId } = action.payload;

      state.byId[listId].cardIds = cardIds;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(assignToList, (state, action) => {
        const { id, listId } = action.payload;

        state.byId[listId].cardIds.push(id);
      })

      .addCase(deleteCard, (state, action) => {
        const { id, listIds } = action.payload;

        listIds.forEach((listId) => {
          const list = state.byId[listId];
          const cardIndex = list.cardIds.indexOf(id);

          list.cardIds.splice(cardIndex, 1);
        });
      })

      .addCase(removeFromList, (state, action) => {
        console.log(action.payload);
        const { id, listId } = action.payload;

        const list = state.byId[listId];

        list.cardIds.splice(list.cardIds.indexOf(id), 1);
      });
  },
});

export const createList = lists.actions.create;
export const renameList = lists.actions.rename;
export const deleteList = lists.actions.delete;
export const changeListCardsOrder = lists.actions.changeCardsOrder;

//export const listsActions = lists.actions;
export const listsReducer = lists.reducer;
