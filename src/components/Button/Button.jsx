import React from 'react';
import css from './Button.module.css';
import PropTypes from 'prop-types';

const Button = ({ onClick, children }) => {
  return (
    <button onClick={onClick} className={css.Button} type="button">
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
export default Button;
