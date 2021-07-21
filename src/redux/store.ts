import {
  AnyAction,
  combineReducers,
  configureStore,
  getDefaultMiddleware,
  ThunkAction,
} from "@reduxjs/toolkit";

import { error } from "./middleware";
import logger from "redux-logger";
import { listsReducer } from "./entities/lists";
import { cardsReducer } from "./entities/cards";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  entities: combineReducers({
    lists: listsReducer,
    cards: cardsReducer,
  }),
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedRootReducer = persistReducer(persistConfig, rootReducer);

const middleware = [...getDefaultMiddleware({
  serializableCheck: false
}), error, logger];

export const store = configureStore({
  reducer: persistedRootReducer,
  middleware,
});

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, AnyAction>;
