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
        data: action.req.data,
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
      req: {
        data: responseData
      }
    });
  }, 1000);
};

const camelizeMiddleware = actionTransformMiddleware(
  'req.data',
  camelize,
  ['DATA_RESPONSE']
);

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(responseMiddleware, camelizeMiddleware)
);

const appElement = document.getElementById('app');
appElement.innerHTML = JSON.stringify(store.getState().data);

store.subscribe(() => {
  const state = store.getState();
  if (state.fetching) {
    appElement.innerHTML = '<i>Fetching...</i>';
  } else {
    appElement.innerHTML = JSON.stringify(state.data);
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
