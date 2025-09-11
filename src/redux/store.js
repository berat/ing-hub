import {createStore} from 'redux';
import {reducer} from './reducer.js';
import {loadState, saveState} from '../helpers/localStorage';

const persistedState = loadState();

export const store = createStore(
  reducer,
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
  saveState(store.getState());
});
