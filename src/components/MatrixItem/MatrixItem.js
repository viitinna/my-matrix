import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import store from '../../store/reducers.js';
import { setMatrix } from '../../store/action.js';

import './MatrixItem.scss';

const MatrixItem = ({
  matrix,
  Amount,
  highlightCellsNumber,
  ID,
  isHiglight,
  percentage,
}) => {
  const [isPercentageShow, setPercentageShow] = useState(false);

  const percentageToSrt = (percent) => `${Number(percent * 100).toFixed(1)}%`;

  const percentageStyle = {
    backgroundImage: `linear-gradient(to right, orange 0% ${percentageToSrt(percentage)}, lemonchiffon ${percentageToSrt(percentage)} 100%)`,
  };

  const onClickMatrixItem = (id) => {
    const incrementItemAmount = (item) => (
      item.ID === id
        ? { ...item, Amount: item.Amount + 1 }
        : item
    );

    store.dispatch(setMatrix(matrix.map(incrementItemAmount)));
  };

  const onMouseEnterHandler = () => {
    setPercentageShow(true);

    const hashAmountDelta = matrix
      .map((item) => ({
        ...item,
        amountDelta: Math.abs(item.Amount - Amount),
      }))
      .sort((a, b) => {
        if (a.amountDelta < b.amountDelta) {
          return -1;
        }
        if (a.amountDelta > b.amountDelta) {
          return 1;
        }
        return 0;
      })
      .slice(1, highlightCellsNumber);

    store.dispatch(setMatrix(matrix
      .map((item) => (
        hashAmountDelta.some((hashItem) => (hashItem.ID === item.ID))
          ? { ...item, isHiglight: true }
          : { ...item, isHiglight: false }
      ))));
  };

  const onMouseLeaveHandler = () => {
    setPercentageShow(false);

    store.dispatch(setMatrix(matrix.map((item) => ({
      ...item,
      isHiglight: false,
    }))));
  };

  return (
    <button
      type="button"
      className={`matrix__item ${isHiglight ? 'matrix__item_higlight' : ''}`}
      style={isPercentageShow ? percentageStyle : {}}
      onClick={() => onClickMatrixItem(ID)}
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
    >
      {isPercentageShow
        ? (
          <span className="matrix__button-text">
            {percentageToSrt(percentage)}
          </span>
        )
        : (
          <span className="matrix__button-text">
            {Amount}
          </span>
        )}
    </button>
  );
};

MatrixItem.propTypes = {
  Amount: PropTypes.number.isRequired,
  ID: PropTypes.number.isRequired,
  highlightCellsNumber: PropTypes.number.isRequired,
  isHiglight: PropTypes.bool.isRequired,
  matrix: PropTypes.arrayOf(PropTypes.object).isRequired,
  percentage: PropTypes.number.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  Amount: ownProps.matrixItem.Amount,
  ID: ownProps.matrixItem.ID,
  highlightCellsNumber: state.highlightCellsNumber + 1,
  isHiglight: ownProps.matrixItem.isHiglight,
  matrix: state.matrix,
  percentage: ownProps.percentage,
});

export default connect(mapStateToProps)(MatrixItem);
