// src/components/Card.jsx
import React from 'react';

export const Card = ({ children, className }) => {
  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className || ''}`}>
      {children}
    </div>
  );
};

export default Card;