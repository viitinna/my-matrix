import React from 'react';
import PropTypes from 'prop-types';
import store from '../../store/reducers.js';

import './Input.scss';

const Input = ({ inputLabel, inputHandler, val }) => {
  const setValueHandler = (param) => store.dispatch(inputHandler(param));

  const inputId = inputLabel.split(' ').join('-').toLowerCase();

  return (
    <label
      htmlFor={inputId}
      className="main-form__label"
    >
      {inputLabel}
      <input
        id={inputId}
        className="main-form__input"
        type="number"
        onChange={(e) => setValueHandler(e.target.value)}
        value={val}
      />
    </label>
  );
};

Input.propTypes = {
  inputHandler: PropTypes.func.isRequired,
  inputLabel: PropTypes.string.isRequired,
  val: PropTypes.number.isRequired,
};

export default Input;
