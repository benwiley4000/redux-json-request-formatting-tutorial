/**
 * ES6/ES2015 syntax
 */
import { createStore, applyMiddleware } from 'redux';

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

const responseData = {
  data_root: {
    some_prop: {
      prop_a: 1,
      prop_b: 2
    },
    some_other_prop: [
      {
        item_a: 'x'
      },
      {
        item_b: 'y'
      }
    ]
  }
};

const responseMiddleware = store => next => action => {
  const { type, ...rest } = action;

  if (type !== 'DATA_REQUEST') return next(action);

  next(action);
  setTimeout(() => {
    next({
      ...rest,
      type: 'DATA_RESPONSE',
      req: {
        data: responseData
      }
    });
  }, 1500);
};

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(responseMiddleware)
);

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
