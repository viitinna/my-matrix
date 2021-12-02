import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

import {
  ACTION_TYPES,
  setColumnsNumber,
} from './action';

const isInputInteger = (value) => Math.abs(Math.floor(Number(value)));

function reducer(state, action) {
  const {
    SET_COLUMNS_NUMBER,
    SET_ROWS_NUMBER,
    SET_HIGLIGHT_CELLS_NNUMBER,
    SET_MATRIX,
  } = ACTION_TYPES;

  switch (action.type) {
    case SET_MATRIX: {
      return {
        ...state,
        matrix: action.payload,
      };
    }

    case SET_COLUMNS_NUMBER: {
      return {
        ...state,
        columnsNumber: isInputInteger(action.payload),
      };
    }

    case SET_ROWS_NUMBER: {
      return {
        ...state,
        rowsNumber: isInputInteger(action.payload),
      };
    }

    case SET_HIGLIGHT_CELLS_NNUMBER: {
      return {
        ...state,
        highlightCellsNumber: isInputInteger(action.payload) > state.columnsNumber * state.rowsNumber
          ? state.columnsNumber * state.rowsNumber
          : isInputInteger(action.payload),
      };
    }

    default:
      return state;
  }
}

const store = createStore(
  reducer,
  {
    columnsNumber: 0,
    highlightCellsNumber: 0,
    matrix: [],
    rowsNumber: 0,
  },
  devToolsEnhancer(
    setColumnsNumber(),
  ),
);

export default store;
