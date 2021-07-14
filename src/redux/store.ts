// @flow
import { createStore } from 'redux'
import { middleware } from './middleware'
import { rootReducer } from './reducers'

export const store = createStore(rootReducer, middleware)

window.store = store