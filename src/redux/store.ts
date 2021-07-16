import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import { error } from "./middleware";
import { listsReducer } from "./entities/lists"
import { cardsReducer } from "./entities/cards";

const rootReducer = combineReducers({
  entities: combineReducers({
    lists: listsReducer,
    cards: cardsReducer
  })
})


export const store = configureStore({
  reducer: rootReducer,
  middleware: [
    ...getDefaultMiddleware(),
    error
  ]
})