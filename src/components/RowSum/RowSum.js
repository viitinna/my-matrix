import React from 'react';
import PropTypes from 'prop-types';

import './RowSum.scss';

const RowSum = ({ amount }) => (
  <div className="matrix__row-sum">{amount}</div>
);

RowSum.propTypes = {
  amount: PropTypes.number,
};

RowSum.defaultProps = {
  amount: 0,
};

export default RowSum;
