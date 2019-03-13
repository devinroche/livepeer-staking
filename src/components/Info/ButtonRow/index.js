import React from 'react';
import './Button.css';

const ButtonRow = ({ buttonClick, active }) => {
  return (
    <div className="row">
      <button
        type="button"
        className={active === 1 ? 'active' : 'btn'}
        onClick={() => buttonClick(1)}
      >
        1D
      </button>
      <button
        type="button"
        className={active === 2 ? 'active' : 'btn'}
        onClick={() => buttonClick(2)}
      >
        1W
      </button>
      <button
        type="button"
        className={active === 3 ? 'active' : 'btn'}
        onClick={() => buttonClick(3)}
      >
        1M
      </button>
      <button
        type="button"
        className={active === 4 ? 'active' : 'btn'}
        onClick={() => buttonClick(4)}
      >
        3M
      </button>
      <button
        type="button"
        className={active === 5 ? 'active' : 'btn'}
        onClick={() => buttonClick(5)}
      >
        1Y
      </button>
      <button
        type="button"
        className={active === 6 ? 'active' : 'btn'}
        onClick={() => buttonClick(6)}
      >
        ALL
      </button>
    </div>
  );
};

export default ButtonRow;
