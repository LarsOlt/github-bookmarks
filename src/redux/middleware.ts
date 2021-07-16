import { Middleware } from "redux";

export const error: Middleware = (store) => (next) => (action) => {
  if (action.error) {
    console.error(`An error occured in action ${action.type}!`, {
      error: action.payload,
      action,
    });

    throw action.payload;
  } else {
    return next(action);
  }
};