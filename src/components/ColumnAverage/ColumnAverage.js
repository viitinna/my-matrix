import React from 'react';
import PropTypes from 'prop-types';

import './ColumnAverage.scss';

const ColumnAverage = ({ amount }) => (
  <div className="matrix__column-average">{amount}</div>
);


ColumnAverage.propTypes = {
  amount: PropTypes.number.isRequired,
};

export default ColumnAverage;
