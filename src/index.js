/**
 * ES6/ES2015 syntax
 */
import { createStore, applyMiddleware } from 'redux';
import actionTransformMiddleware from 'redux-action-transform-middleware';
import camelize from 'camelize';

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
        data: action.res.data,
        fetching: false
      };
    case 'CLEAR_DATA':
      return {
        ...state,
        data: {}
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
      res: {
        data: responseData
      }
    });
  }, 700);
};

const camelizeMiddleware = actionTransformMiddleware(
  'res.data',
  camelize
);

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(responseMiddleware, camelizeMiddleware)
);

const dataElement = document.getElementById('data');
dataElement.innerHTML = JSON.stringify(store.getState().data);

store.subscribe(() => {
  const state = store.getState();
  if (state.fetching) {
    dataElement.innerHTML = '<i>Fetching...</i>';
  } else {
    dataElement.innerHTML = JSON.stringify(state.data);
  }
});

document.getElementById('fetch').addEventListener('click', () => {
  store.dispatch({
    type: 'DATA_REQUEST'
  });
});

document.getElementById('clear').addEventListener('click', () => {
  store.dispatch({
    type: 'CLEAR_DATA'
  });
});
