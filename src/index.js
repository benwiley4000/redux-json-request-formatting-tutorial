/**
 * ES6/ES2015 syntax
 */
import { createStore } from 'redux';

const initialState = {
  data: {},
  fetching: false
};

const reducer = (state, action) => {
  state = state || {};
  switch(action.type) {
    case 'DATA_REQUEST':
      return {
        ...state,
        fetching: true
      };
    case 'DATA_RESPONSE':
      return {
        ...state,
        data: action.req.data,
        fetching: false
      };
    default:
      return state;
  }
};

const store = createStore(reducer, initialState);

const appElement = document.getElementById('app');

store.subscribe(() => {
  const state = store.getState();
  if (state.fetching) {
    appElement.innerHTML = '<i>Fetching...</i>';
  } else {
    appElement.innerHTML = JSON.stringify(state.data);
  }
});

store.dispatch({
  type: 'DATA_REQUEST'
});
