import { createStore, compose, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import Reducer from './reducers';


/* eslint-disable no-underscore-dangle */
const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
/* eslint-enable */


const configureStore = (preloadedState) => (
  createStore(
    Reducer,
    preloadedState,
    composeEnhancers(
      applyMiddleware(ReduxThunk)
    )
  )
);


const store = configureStore({});


export default store;
