// configure aqui sua store
import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);

// createStore(rootReducer, composeWithDevTools());

if (window.Cypress) {
  window.store = store;
}

export default store;