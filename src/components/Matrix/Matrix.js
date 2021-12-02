import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import shortid from 'shortid';
import store from '../../store/reducers.js';
import { setMatrix } from '../../store/action.js';
import MatrixItem from '../MatrixItem/MatrixItem.js';
import RowSum from '../RowSum/RowSum.js';
import ColumnAverage from '../ColumnAverage/ColumnAverage.js';

import './Matrix.scss';

const randomGenerator = (item, i) => ({
  Amount: Math.floor(Math.random() * 1000),
  ID: i,
  isHiglight: false,
});

const Matrix = ({
  columnsNumber,
  matrix,
  rowsNumber,
}) => {
  useEffect(() => {
    const tmp = Array(columnsNumber * rowsNumber).fill(0).map(randomGenerator);
    store.dispatch(setMatrix(tmp));
  }, [columnsNumber, rowsNumber]);

  const gridShape = {
    gridTemplateColumns: `repeat(${columnsNumber + 1}, 1fr)`,
    gridTemplateRows: `repeat(${rowsNumber + 1}, 1fr)`,
  };

  const rowSums = Array(rowsNumber).fill(0).map((item, rowIndex) => matrix.reduce((acc, mat, i) => {
    if ((i >= rowIndex * columnsNumber) && (i < (rowIndex + 1) * columnsNumber)) {
      return acc + mat.Amount;
    }
    return acc;
  }, 0));

  let columnAverage = [];
  if (rowSums.length) {
    columnAverage = Array(columnsNumber).fill(0).map((item, columnIndex) => {
      let acc = 0;
      for (let i = columnIndex; i <= columnsNumber * rowsNumber - 1; i += columnsNumber) {
        acc += typeof matrix[i] === 'undefined' ? 0 : matrix[i].Amount;
      }
      return Math.floor(acc / rowsNumber);
    });
  }

  return (
    <div className="matrix" style={gridShape}>
      {matrix.map((item, index) => (
        ((index % columnsNumber) === (columnsNumber - 1))
          ? (
            <>
              <MatrixItem
                key={item.ID}
                matrixItem={item}
                percentage={item.Amount / rowSums[Math.floor(index / columnsNumber)]}
              />
              <RowSum
                key={shortid.generate()}
                amount={rowSums[Math.floor(index / columnsNumber)]}
              />
            </>
          )
          : (
            <MatrixItem
              key={item.ID}
              matrixItem={item}
              percentage={item.Amount / rowSums[Math.floor(index / columnsNumber)]}
            />
          )
      ))}
      {columnAverage.map((item) => (
        <ColumnAverage
          key={shortid.generate()}
          amount={item}
        />
      ))}
    </div>
  );
};

Matrix.propTypes = {
  columnsNumber: PropTypes.number.isRequired,
  matrix: PropTypes.arrayOf(PropTypes.object).isRequired,
  rowsNumber: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  columnsNumber: state.columnsNumber,
  matrix: state.matrix,
  rowsNumber: state.rowsNumber,
});

export default connect(mapStateToProps)(Matrix);
