import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Input from '../Input/Input.js';
import { setColumnsNumber, setRowsNumber, setHiglightCellsNumber } from '../../store/action.js';

import './Form.scss';

const inputsArray = [
  {
    action: setRowsNumber,
    text: 'Row Number',
  },
  {
    action: setColumnsNumber,
    text: 'Column Number',
  },
  {
    action: setHiglightCellsNumber,
    text: 'Higlight Cell Number',
  },
];

const mapStateToProps = (state) => ({
  columnsNumber: state.columnsNumber,
  highlightCellsNumber: state.highlightCellsNumber,
  rowsNumber: state.rowsNumber,
});

const inputField = (label) => (
  <Input
    key={label.text.split(' ').join('')}
    inputLabel={label.text}
    inputHandler={label.action}
    val={label.value}
  />
);

const Form = ({ columnsNumber, highlightCellsNumber, rowsNumber }) => {
  inputsArray[0].value = rowsNumber;
  inputsArray[1].value = columnsNumber;
  inputsArray[2].value = highlightCellsNumber;

  return (
    <form className="main-form">
      {inputsArray.map(inputField)}
    </form>
  );
};

Form.propTypes = {
  columnsNumber: PropTypes.number.isRequired,
  highlightCellsNumber: PropTypes.number.isRequired,
  rowsNumber: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Form);
