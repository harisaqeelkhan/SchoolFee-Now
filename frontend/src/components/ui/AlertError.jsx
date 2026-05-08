import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

const AlertError = ({ message }) => (
  <div className="alert-error">
    <FaExclamationTriangle />
    <span>{message}</span>
  </div>
);

export default AlertError;
