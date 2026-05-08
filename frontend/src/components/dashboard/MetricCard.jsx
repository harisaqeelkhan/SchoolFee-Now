import React from 'react';

const MetricCard = ({ title, value, isHighlighted = false, valueColor = 'inherit' }) => {
  return (
    <div className={`card metric-card ${isHighlighted ? 'black-bg' : ''}`} style={{ flex: '1 1 200px' }}>
      <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
        {title}
      </h3>
      <p style={{ fontSize: '2.25rem', fontWeight: '600', color: valueColor, letterSpacing: '-0.03em', lineHeight: 1 }}>
        {value}
      </p>
    </div>
  );
};

export default MetricCard;
