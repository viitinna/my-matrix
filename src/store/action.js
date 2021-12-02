export const ACTION_TYPES = {
    SET_COLUMNS_NUMBER: 'SET::COLUMNS::NUMBER',
    SET_HIGLIGHT_CELLS_NNUMBER: 'SET::HIGLIGHT::CELLS::NNUMBER',
    SET_MATRIX: 'SET::MATRIX',
    SET_ROWS_NUMBER: 'SET::ROWS::NUMBER',
  };
  
  export const setColumnsNumber = (param) => ({
    payload: param,
    type: ACTION_TYPES.SET_COLUMNS_NUMBER,
  });
  
  export const setRowsNumber = (param) => ({
    payload: param,
    type: ACTION_TYPES.SET_ROWS_NUMBER,
  });
  
  export const setHiglightCellsNumber = (param) => ({
    payload: param,
    type: ACTION_TYPES.SET_HIGLIGHT_CELLS_NNUMBER,
  });
  
  export const setMatrix = (param) => ({
    payload: param,
    type: ACTION_TYPES.SET_MATRIX,
  });
  