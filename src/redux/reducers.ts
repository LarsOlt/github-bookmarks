// @flow
import { Reducer } from 'redux'
import { combineReducers } from 'redux-immutable'

const counterReducer: Reducer = (state, action) => {
  switch (action.type) {
    case "counter/incremented":
      return { value: state.value + 1 };
    case "counter/decremented":
      return { value: state.value - 1 };
    default:
      return state;
  }
}

export const rootReducer = combineReducers({
  counter: counterReducer
})
