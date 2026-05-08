import React from 'react';

const EmptyState = ({ message = 'No data found' }) => (
  <div className="empty-state">
    <p>{message}</p>
  </div>
);

export default EmptyState;
